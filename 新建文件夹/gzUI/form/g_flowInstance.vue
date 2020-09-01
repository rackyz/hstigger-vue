<template>
<div class='gz-form-item l-gz-flowinst'>
    <div class="">
        {{option.flowId}}
    </div>
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
        handleUpload(e){
            let that = this
           let file = e.srcElement.files[0]
           if (window.FileReader) {    
                var reader = new FileReader();    
                reader.readAsDataURL(file);    
                //监听文件读取结束后事件    
                reader.onloadend = function (e) {
                 that.$emit('change',e.target.result)
             
                };    
            } 
          
        }
    }
}
</script>
<style lang="less">
.l-gz-image{
     position: relative;
    display: inline-block;
    background: #fff;
    height:60px;
    overflow: hidden;
    color: #ddd;
    text-decoration: none;
    display: flex;
    align-items:center;
    justify-content: center;

    input{
        position: absolute;
        font-size: 100px;
        right: 0;
        top: 0;
        opacity: 0;
    }

    i{
        font-size:40px;
        margin-top:0.5rem;
    }

    img{
        width:100%;
        height:100%;
    }
}

.gz-image:hover{
     background: rgb(246, 255, 208);
     color:#eee;
}
</style>
