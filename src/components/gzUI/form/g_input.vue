<style lang="less">
.l-gz-input{
    position: relative;
 .ivu-input-number{
            width:100%;
            position:absolute;
            bottom:0;
            top:20px;
            overflow:hidden;
            font-size:1.2rem;
            border:none;
            border-radius:none;
            background:none;
            .ivu-input-number-input-wrap{
                background:none;
                border-color:rgba(0,0,0,0);
                 input{
                     border-color:rgba(0,0,0,0);
                     background:red;
                    width:100%;
                    height:100%;
                    position:absolute;
                    left:0;
                    right:0;
                    top:0;
                    bottom:0;
                    border:none;
                    font-size:1.2rem;
                    padding:0 1.2rem;
                    padding-top:1rem;
                    text-align: right;
                    background:none;
                      box-shadow: none;
                }


            }
           

            .ivu-input-number-handler-wrap{
                opacity: 0;

            }
        }
    .ivu-input-number:focus{
        outline:none;
        border:none;
        box-shadow: none !important;

        
                .input{
                      box-shadow: none !important;
                }
    }

    .ivu-input-number:focus-within{
         box-shadow: none !important;
    }

   .ivu-input-wrapper{
            width:100% !important;
            height:100% !important;
            position:absolute !important;
            
            left:0 !important;
            right:0 !important;
            top:0 !important;
            bottom:0 !important;
            border:none !important;
            font-size:1.2rem;
            padding:0 0.5rem !important;
            padding-right:1.2rem !important;
            padding-top:1rem !important;
             text-align: left;
             .ivu-input{
                   border-color:rgba(0,0,0,0);
                     background:red;
                    width:100%;
                    height:100%;
                    position:absolute;
                    left:0;
                    right:0;
                    top:0;
                    bottom:0;
                    border:none;
                    font-size:1.2rem;
                    padding:0 1.2rem;
                    padding-top:1rem;
                    background:none;
                      box-shadow: none;
             }
             .ivu-input:focus{
                 border:none;
                 
             }
        }

   
}

.ivu-input-wrapper:focus{
    border:none;   
    
        box-shadow: none;
    .ivu-input{
        border:none;
        box-shadow: none;
    } 
}

</style>
<template>
<gzBase class="l-gz-input"  :style='`height:${option.type=="md"?(option.height||400):option.height}px`' :required="option.required" :class='option.type=="textarea"?"gz-input-area":""' :index="index" :empty="value==undefined || value==''" :error="error"  :label="label" :editable="editable" :focused="focused" clearable @clear="handleClear">
<!-- <div class='gz-form-item l-gz-input' :class='option.type=="textarea"?"gz-input-area":""' >
     <span class='gz-label' :class="focused || value?'':'gz-label-empty'" v-if="label">
        {{label}}
    </span> -->

    <template v-if="static_mode">
        <div class="static">
        {{value}}
        </div>
    </template>
    <template v-else>
        <template v-if='option.type=="textarea"'>
        <div class='word'>{{value ? value.length : 0}} {{option.maxlen?'/ '+option.maxlen:''}} 字</div>
        <textarea :value='value' :rows="option.rows || 4" cols="100%" @input='handleChange' @change='handleChange' :tabindex="index" @focus='handleInputFocus' @blur='hanleInputBlur'  :maxlength="option.maxlen" :disabled="!editable" />
        </template>
        <template v-else-if='option.type=="md"'>
            <mdEditor :value='value || ""' @change='handleEditorChange' :disabled="!editable" />
        </template>
        <template v-else-if="option.type=='amount'">
            <div class="word" v-show="amountText">{{amountText}}</div>
            <InputNumber :max="1000000000000" :value='value || 0' @on-change='handleChangeNumber' :formatter="inputNumberFormater"
                :parser="inputNumberParser" :disabled="!editable" :tabindex="index" @on-focus='handleInputFocus' @on-blur='hanleInputBlur'  />
        </template>
        <template v-else>
            <div class='word' v-show="option.maxlen" >{{value ? value.length : 0}} {{option.maxlen?'/ '+option.maxlen:''}} 字</div>
            <Input :value='value' :type="option.type=='number' || option.type=='password'?option.type:'text'" @on-change='handleChange'  @on-focus='handleInputFocus' @on-blur='hanleInputBlur' :disabled="!editable" :maxlength="option.maxlen" @on-enter='handleEnter' />
    </template> 
    </template>
    
<!-- </div> -->
</gzBase>
</template>
<script>
import mdEditor from '../editor/md.vue'
import gzBase from './g_base'

const formatSalary = (salary) =>{
    if(salary === undefined)
        return

    let nagivate = false
    if(salary < 0){
        salary = -salary
        nagivate = true
    }

    let fraction = salary.toString().split('.')[1]
    if (fraction)
        fraction = "." + fraction.slice(0,2)
    else
        fraction = ""

     var num = salary ? Math.floor(salary) : 0
     var output = ""
     const units = [" "," 万", " 亿", " 兆"]
     let count = 0
     while (num >= 10000) {
         num = num / 10000
         count++
     }

     return (nagivate?'-':'') +  count==0 ?(num.toFixed(0) + fraction):num.toFixed(2) + units[count]
}

export default {
    data(){
        return {
            focused:false,
            static_mode:false
        }
    },
    computed:{
        amountText(){
            return formatSalary(this.value)
        }
    },
    components:{
        mdEditor,gzBase
    },
    props:{
        index:{
            type:Number
        },
        label:{
            type:String
        },
        value:{
            type:String
           
        },
        
        parent:{
            type:Object
        },
        editable:{
            type:Boolean,
            default:true
        },
        error:{
            type:String
        },
        option:{
            type:Object,
            default:{}
        }
    },
    methods:{
        handleClear(){
            this.$emit('change',"")
        },
        inputNumberFormater(v){
            if(v > 1000000000000){
                v = 99999999999
                this.value = 99999999999
            }
            if(v)
                return `¥ ${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            else
                return ""
        },
        inputNumberParser(v){
            if(!v)
                return ""
            if(v.includes("."))
                v = v.substr(0,v.indexOf('.')+3)
            return v.replace(/¥\s?|(,*)/g, '')
        },
        handleEditorChange(e){
             this.$emit('change',e)
        },
        handleChangeNumber(e){
              this.$emit('change',e)
        },
        handleChange(e){
            this.$emit('change',e.target.value)
        },
        handleInputFocus(){
            this.focused = true
        },
        hanleInputBlur(){
            this.focused = false
        },
        handleEnter(){
            console.log('ENTER')
            if(this.option.enter)
                this.$emit('enter')
        }
    }
    
}
</script>
<style lang="less" scoped>
    .l-gz-input{

        cursor:text;
        overflow: hidden;
        min-height:60px;

     

        textarea{
            width:100%;
            position:absolute;
            top:0;
            bottom:0;
            border:none;
            font-size:1.2rem;
            padding:0 1rem;
            padding-top:1.8rem;
            padding-bottom:0.25rem;
            line-height:20px;
            font-size:15px;
            resize:none;
            
        }

        textarea:focus,input:focus{
          outline:none;
          background:rgb(255, 255, 192);
            
        }  

        .word{
            position: absolute;
            left:0;
            text-align: right;
            padding:0.25rem 0.5rem;
            right:0rem;
            top:0;
            
            font-size:12px;
            color:#aaa;
            z-index:2;
        }
    }

    .l-number-prompt{
        position: absolute;
        color:#888;
        right:20px;
        top:10px;
        font-size:14px;
    }

</style>
