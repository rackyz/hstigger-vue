<style lang="less" >
.ivu-select-prefix .ivu-icon,.g-select-icon{
    font-size:14px;
    padding:2px;
    background:#eee;
    border:1px solid #aaa;
    border-radius: 3px;
}
</style>
<template>


    <gzBase :required="option.required"  :index="index" :empty="isEmpty"  :label="label+(option.multiple?' (多选)':'')" :editable="editable" :focused="focused || open" :error="error" clearable @clear="handleClear">
    <Select :value="value" @on-change="handleChange" transfer transfer-class-name="select-option-wrap" placeholder="" :multiple="option.multiple" @on-create="handleCreate" @on-open-change="open = $event" :disabled="!editable" :prefix="value">
        <template v-if="!option.multiple && selected">
            <template v-if="option.type == 'icon'">
                <div  slot="prefix" >
                <Icon class='g-select-icon' :type='value' />
                </div>
            </template>
              <template v-else>
            <Avatar :src="selected.avatar" slot="prefix" size="small" >{{selected.label ? selected.label[0] : ""}}</Avatar>
            </template>
        </template>
        <template v-if="hasGroup">
            <template v-for="g in groups">
            <OptionGroup :label="g.label" :key="g.label">
                <Option v-for="o in g.options" :key="o.value" :value="o.value" :label="o.label">
                      <Avatar :src="o.avatar" shape='square' style='margin-right:10px;' :style="`background:${util.mapColor(o.label[0])};`">{{o.label ? o.label[0] : ""}}</Avatar>{{o.label}}
                </Option>
            </OptionGroup>
            </template>
        </template>
        <template v-else>
             <Option v-for="o in options" :key="o.value" :value="o.value" :label="o.label">
                  <template v-if="option.type == 'icon'">
                    <Icon class="g-select-icon" :type='o.value' />
                </template>

                <template v-else>
                      <Avatar :src="o.avatar" shape='square' style='margin-right:10px;' :style="`background:${util.mapColor(o.label ? o.label[0] : 'a')};`">{{o.label ? o.label : ""}}</Avatar>{{o.label}}
                      </template>
                </Option>
        </template>
    </Select>
    </gzBase>
</template>

<script>
import gzBase from './g_base'
export default {
    components:{
        gzBase
    },
    data() {
        return {
            open: false,
            focused: false,
            hasGroup:false
        }
    },
    props: {
        index: {
            type: [Number,String] 
        },
        label: {
            type: String
        },
        value: {
            type: [Number,String],
        },
        parent: {
            type: Object
        },
        editable: {
            type: Boolean
        },
        error:{
            type:String
        },
        option: {
            type: Object,
            default: {}
        }
    },
    computed: {
        isEmpty(){
            if(this.option.multiple){
                if(!this.value || this.value.length == 0)
                    return true
            }else{
                if(this.value == undefined)
                    return true
            }
        },
        isDisabled(){
            if(this.option && this.option.disabled)
                return true

            if(!this.option || !Array.isArray(this.option.options) || this.option.options.length == 0){
                return true
            }
        },
        selected(){
            let idKey = this.option.idKey || "value"
            if(!this.options)
                return null
            if(typeof this.value != "object"){
                if(this.option.text)
                    return this.options.find(v=>v==this.value)
                else
                    return this.options[this.value]
            }else{
                return this.options.find(v=>v==this.value[idKey])
            }
        },
        groups(){
            let groupmap = {}
            let groupKey = this.option.gruopKey || 'group'
            this.options.forEach(v=>{
                let group = v[groupKey]
                if(groupmap[group]){
                    groupmap[group].push(v)
                }else{
                    groupmap[group] = [v]
                }
            })

            return Object.entries(groupmap,v=>({label:v[0],options:v[1]}))
        },
        relValue(){
            if(this.option.relKey){
                return this.parent[this.option.relKey]
            }
        },
        options() {
            try{
            let options = this.option.options || []
            let labelKey = this.option.labelKey || "label"
            let idKey = this.option.idKey || "value"
            if(this.option.store){
                if(this.option.getters){
                    if(this.option.key){
                        options = this.option.store[this.option.getters](this.option.key)
                    }
                    else
                        options = this.option.store[this.option.getters] 
                 
                    if(options && options.length)
                        options = options.map(v=>({avatar:v.avatar,color:v.color,label:v.name || v.label,value:v.id ==undefined ?v.value:v.id,color:v.color||this.util.mapColor(v.name || v.label)}))

                }
                if(this.option.relKey && this.option.relativeGetter && this.relValue != undefined){
                    let getRelative = this.option.store[this.option.relativeGetter]
                    let relOptions = getRelative(this.relValue)
                    
                    if(this.option.relMode == 'replace'){
                        options = relOptions
                    }else{
                         options = relOptions.concat(options)
                    }

                    if(options && options.length > 0)
                         this.handleChange(options[0].value)
                }
            }

            if (Array.isArray(options)) {
                 options = options.map((v, i) =>{
                    let item = {}
                    if(typeof v == 'object'){
                        item = {
                            value:v[idKey],
                            avatar:v.avatar,
                            label:v[labelKey],
                            subs:v.subs
                        }
                    }else{
                        item =  {
                            value: this.option.text?v:i,
                            label:this.option.type=='icon'?'':v
                        }
                    }
                    return item
                 })
            }
            console.log("OPTIONS:",options)
            return options
            }
            catch(e){
                console.error(e)
                return []
            }
        },
    },
    methods: {
        handleClear(e){
            this.value = this.option.multiple?[]:undefined
            this.open =false
        },
        handleCreate(e){
            var that = this
            this.option.store.dispatch(this.option.allowcreate,e).then(res=>{
               that.handleChange(e)
            })
            
        },
        handleChange(e) {
            this.$emit('change', e)
        },
        handleInputFocus() {
            this.focused = true
        },
        handleInputBlur() {
            this.focused = false
        }
    }
}
</script>
<style lang="less">
.l-gz-select {
    overflow: visible;
    position: relative;
    height: 60px;
    z-index: 10;
    color:#333;


    .gz-select-content {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        border: none;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 1.2rem;
        padding: 0 1rem;
        padding-top: 1.5rem;
        cursor:pointer;

       
    }

    .gz-select-popup {
        max-height: 0;
        overflow: hidden;
        transition: all 0.3s;
        position: absolute;
        top: 70px;
        width: 100%;
        visibility: visible;
        z-index: 2000;

        filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
    }

    .gz-select-popup-show {
        max-height: 200px;
        height: 200px;
        border: 1px solid #ddd;
        background: white;
        transition: all 0.3s;
        overflow-y: scroll;
        z-index: 1000;
    }

    .gz-select-content:focus {
        background: rgb(255, 255, 192);
        outline: none;
        border-radius: 0.5rem;
    }

    .gz-select-item {
        height: 30px;
        line-height: 30px;
        padding-left: 10px;
        width: 100%;
        font-size: 1rem;
    }

    .gz-select-item-selected {
        background: rgb(248, 248, 176);
    }

    .gz-select-item:hover {
        background: rgb(248, 248, 176) !important;
    }
}
</style>

