<template>
<DatePicker  :tabIndex='index'  :open="open" placement='bottom-start' @on-change='handleChange' :type="option.type || 'date'" transfer clearable :visible='open' trigger='click'  @focus='focused=true' @blur='focused=false' style='width:100%;' @on-clickoutside='open=false' >
    <div class='gz-form-item l-gz-select' :class="!editable?'gz-disabled-item':''" @click="handleClick">
        <div
            class='gz-label'
            :class="typeof value!='undefined'?'':'gz-label-empty'"
            v-if="label"
        >
            {{label}}
        </div>
        <div
            class='gz-select-content'
            :tabindex="index"
            
            @focus='handleInputFocus'
            @blur='handleInputBlur'
        >
           {{displayString}}
        </div>
       
    </div>
    
    </DatePicker>
</template>

<script>
export default {
    data() {
        return {
            open: false,
            focused: false
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
            type: String
        },
        parent: {
            type: Object
        },
        editable: {
            type: Boolean
        },
        option: {
            type: Object,
            default: {}
        }
    },
    computed: {
        isDisabled(){
            if(this.option && this.option.disabled)
                return true
                
            if(!this.option || !Array.isArray(this.option.options) || this.option.options.length == 0){
               
                return true
            }
        },
        displayString(){
            let str = ""
            if(this.option.type == "daterange" && this.value){
                
                let s = moment(this.value[0])
                let e = moment(this.value[1])
                let o = moment.duration(e-s).as("days")
                str = `${s.format("YYYY年MM月DD日")} — ${e.format("YYYY年MM月DD日")}, 共${o}天`
            }else if((this.option.type == 'date' || this.option.type==undefined) && this.value){
               let s = moment(this.value)
               str = s.format('YYYY年MM月DD日')
            
            }else{
                str = this.value
            }
            return str
        }
    },
    methods: {
        handleClick () {
            if(this.editable)
                this.open = !this.open;
        },
        handleChange(e) {
            console.log('change',e)
            if(this.option.type == 'date')
                e = moment(e,'YYYY-MM-DD').add(8,'h').toString()
            this.open = false
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
.gz-select-content{
            
            font-size:20px;
            line-height:30px;
}
</style>

