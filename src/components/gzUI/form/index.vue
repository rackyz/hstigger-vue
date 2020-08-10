



<template>
<div class='l-form'>
    <div ref="formlay" class="l-form-layout">
    </div>
    <slot></slot>
    <div class="l-form-errorbox" v-if="formError">
        <Icon type="ios-close-circle" style="margin-right:5px" color="red" />表格填写有误，请检查
        <template v-for="(e,i) in Object.keys(errors)">
             <div :key="i" class="l-form-error-item">  [{{i+1}}] <span style="font-weight:bold">{{def[e].label}}</span> — {{errors[e]}} </div>
        </template>
       
    </div>
    <div class='l-form-action' v-if='!option.hideAction && editable'>
        <div class='g-button l-button l-button-primay' v-if="!option.hideSubmit" @click='handleSubmit'>
            {{option.submitText || '提交'}}
        </div>
         <div class='g-button l-button' style='margin-left:0.5rem' v-if="!option.hideReset && !data.id" @click='reset()'>
            {{option.resetText || '重设' }}
        </div>
    </div>
</div>
</template>
<script>
import Controls from './controls'
import Events from './events'
export default {
    data(){
        return {
            formControl:null,
            checkors:[],
            errors:{}
        }
    },
    
    props:{
        /** defination
         *  form definition - form items array
         */
        form:{
            type:Object,
            default:()=>({})
        },
        /** data
         *  form data object
         */
        data:{
            type:Object,
            default:()=>({})
        },
        editable:{
            type:Boolean
        },
        /**
         * data for initialization
         * if(model[key] is empty) use data[key]
         * if(data[key] is empty) use initData and set it
         */
        initData:{
            type:Object,
            default:()=>({})
        },
        static_mode:{
            type:Boolean
        },
        /*
            vuex store name data set for remote options or other animation 
            data items.
        */
        store:{
            type:String,
            default:"kernel"
        }

    },
    mounted(){
        this.$nextTick(()=>{
            this.renderForm(this.form)
              this.$forceUpdate()
        })
    },
    watch:{
        data:{
            handler(v){
                if(v)
                    this.reset(v)
            },
            immediate:true,
            deep:true
        },
        initData:{
            handler(v){
                 if(this.formControl)
                        this.formControl.setInitData(v)
            },
            immediate:true,
            deep:true
        }
        
    },
    computed:{
        formError(){
            return Object.keys(this.errors).length > 0
        },
        layout(){
            return this.form.layout || ""
        },
        option(){
            return this.form.option || {}
        },
        def(){
            return this.form.def || {}
        }
    },
    methods:{
        Init(initData){
            this.$nextTick(()=>{
                Object.keys(initData).forEach(key=>{
                    this.formControl.set(key,initData[key])
                })
            })
        },
        mapControl(e){
            let control = null
            switch(e){
                case 'input':
                    control = 'gyInput'
                    break 
                case 'select':
                    control = 'gySelect'
                    break
                case 'image':
                    control = 'gyImage'
                    break
                case 'color':
                    control = 'gyColor'
                    break
                case 'time':
                    control = 'gyTime'
                    break
                case 'files':
                    control  = 'gyFile'
                    break
            }

            return control
        },
        setError(key,error){
            this.errors[key] = error
            this.formControl.setErrors(this.errors)
        },
        handleSubmit(){
            let model = this.submit()
            if(model){
                console.log('$emit:',model)
                if(this.data)
                    model.id = this.data.id
                this.$emit("submit",model)
                 this.$emit("on-submit",model)
            }
        },
        submit(){
            var that = this
            let model = this.formControl.model
            let errors = {}
            let failed = false
            let remote = false
            if(!this.data || this.data.id === undefined){
                // create
                 this.checkors.forEach(v=>{
                    if(v.remote){
                        remote = true
                        console.log("REMOTE:start")
                        errors[v.key] == 'loading'
                        v.check(model[v.key]).then(res=>{
                            if(!res){
                                errors[v.key] = v.msg
                            }else{
                                delete errors[v.key]
                            }
                        }).finally(()=>{
                            if(errors[v.key] == 'loading'){
                                delete errors[v.key]
                            }
                        }) 
                        return
                    }

                    if(v.check(model[v.key]) == false)
                    {
                        errors[v.key] = v.msg || "必填项不可为空" 
                        failed = true
                    }
                    })
            }else{
                this.checkors.forEach(v=>{
                    if(model[v.key] !== undefined && v.check(model[v.key]) == false)
                    {
                        errors[v.key] = v.msg || "必填项不可为空" 
                        failed = true
                    }
                    })
            }

            if(failed){
                this.$set(this,"errors",errors)
                this.formControl.setErrors(errors)
            }
            else{
                return model
            }
        },
        reset(formData){
            console.log('reset:',formData,this.formControl)
            if(this.formControl){
                this.formControl.reset(formData || this.data)
            }
            this.errors = {}
            this.$emit('on-reset')
            this.$forceUpdate()
        },
        renderForm(form){
            // save old data
            // load cached data
            var that = this
            if(!form.def)
                return
            let template = form.layout
            let formItems = form.def
            let option = {}
            let formData = JSON.parse(JSON.stringify(this.data))
            let model = {}
            let keys = []
            this.checkors = []
            let errors = this.errors
            const type_rules = {

                name:{
                    reg:/^[a-zA-Z0-9]{4,16}$/,
                    msg:"名称必须为4-16位字母和数值的组合"
                },
                phone:{
                    reg:/^(13\\d{9})|(15[0-35-9]\\d{8})|(18[05-9]\\d{8})$/,
                    msg:'电话号码格式有误'
                }
            }

            // create form layout template
            try{
                if(!template){
                    // default template
                }
                keys = template.match(/\{\{.+?\}\}/g)
                keys.forEach((v,index)=>{
                    let key = v.slice(2,v.length-2)
                    let formItem = formItems[key]
                    let replaced = ''
                    if(formItem){
                        let control = this.mapControl(formItem.control)
                        option[key] = formItem.option
                        if(formItem.option){
                            if(formItem.option.defaultValue !== undefined){
                                if(this.initData[key] == undefined){
                                    this.initData[key] = formItem.option.defaultValue
                                }
                            }                            
                        }

                        if(formItem.option && that.store){
                         option[key].store = that.$store.getters
                        }
                        let label = formItem.label?formItem.label:""
                        let editable = ((formItem.editable==undefined || formItem.editable) && this.editable) ? 'true':'false'
                        if(this.option.editable !=undefined && this.option.editable == false)
                            editable = false
                        if(option[key] && option[key].required){
                            this.checkors.push({key,check:v=>v !== undefined && v !== ""})

                            if(option[key].rules){
                                option[key].rules.forEach(v=>{
                                    if(v && v.remote){
                                        this.checkors.push({key,remote:true,check:val=>{
                                            return that.$store.dispatch(v.remote,val)
                                        },msg:v.msg})
                                    }else if(v && v.type && type_rules[v.type]){
                                        let r = type_rules[v.type]
                                        
                                        this.checkors.push({key,msg:(v.msg || r.msg),check:x=>r.reg.test(x)})
                                    }
                                    
                                })
                            }
                        }
                        if(!control){
                            console.error(`[renderForm]: control (${formItem.control}) has not mapeed ControlItem`)
                        }else{
                            replaced = `<${control} :class="errors.${key}?'gz-form-item-error':''" :index='0' :value='model.${key}==undefined?formData.${key}:model.${key}' label='${label}' :editable='${editable}' :error="errors.${key}" :parent='formData' :option='option.${key}' :ref="ref" @change='handleChange("${key}",$event)'></${control}>`
                        }
                    }else{
                        console.error(`[renderForm]:key (${key}) has not been defined`)
                    }

                    template = template.replace(v,replaced)
                })
            }
            catch(e){
                console.error(e)
                throw(e)
            }

          

            // create vue-component form instance
            var that = this
            let data = {
                    test:'',
                    formData,
                    errors,
                    ref:this.ref,
                    model,
                    initData:this.initData || {},
                    option
                }
            
            if(this.formControl){
                this.$destroy(this.formControl)
                this.formControl = null
            }

            Object.assign(data,this.form.controller)
            that.formControl = new Vue({
                parent:that,
                el:this.$refs.formlay,
                template,
                data,
                store:this.$store,
                components:Controls,
                mounted(){
                    this.init()
                    
                },
                methods:{
                    init(){
                        this.errors = {}
                        this.model = {}
                        if(!this.formData.id)
                           console.log("init",this.formData.parent_id)
                            this.$nextTick(()=>{
                                keys.map(v=>v.slice(2,v.length-2)).forEach(k=>{
                            
                                if(this.initData[k] !== undefined && this.formData[k] == undefined && this.model[k] == undefined){
                                 
                                console.log("set",k,)
                                 this.set(k,this.initData[k])
                                }
                                })
                            })
                            
                    },
                    setErrors(errors){
                        this.errors = that.errors = {...errors}
                        that.$emit('error-submit',this.errors)
                    },
                    set(key,value){
                        this.$set(this.model,key,value)
                        that.$emit('change',this.model)
                    },
                    setInitData(data){
                        this.initData = data
                    },
                    reset(oldData){
                         this.formData = oldData
                         this.init()
                         that.$emit('change',this.model)
                    },
                    handleChange(key,newVal){
                        Vue.delete(this.errors,key) 
                        this.set(key,newVal)
                        that.$emit('error-submit',that.errors)
                        that.$emit('change',this.model)
                    }
            }})

        },
       
    }
}

</script>
