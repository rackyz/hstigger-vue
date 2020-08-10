<style lang="less">
.l-gz-color{
    height:58px;
    position: relative;
    .l-label{
        position: absolute;
        left:0.5rem;
        top:0.5rem;
        z-index: 100;
    }
    .ivu-color-picker,.ivu-color-picker-rel{
         height:58px !important;
         border:none;
         overflow: visible;
         width:100%;
         cursor:pointer;
    }

    .ivu-color-picker-input{
        height:58px !important;
        padding-top:2rem;
         border:none;
          background:none;
         overflow: visible;
    }
    .ivu-color-picker:focus,.ivu-color-picker-rel:focus{
        outline:none;
         background:none;
    }

    .ivu-input-icon{
        position: absolute;
        right:0rem;
        bottom:0rem;
       
    }

    .ivu-transfer-no-max-height{
        width:16rem;
    }
}
</style>
<template>
<div class='gz-form-item l-gz-color' :tabIndex='index' >
    <div class='l-label'>{{label}}</div>
     <ColorPicker transfer  :value='value || ""' @on-active-change='handleChange' @on-change='handleChange' />
    
</div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    props:{
        index:{
            type:[Number,String]
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
            type:Boolean
        },
        option:{
            type:Object,
            default:{}
        }
    },
    methods:{
        handleChange(e){
            this.$emit('change',e)
        }
    }
    
}
</script>
<style lang="less">

</style>
