<template>
<a class='gz-form-item l-gz-image'>
    <i class="iconfont icon-nbgz" v-if="!value"></i>
    <img :src='value'  v-if='value' />
    <input type='file' ref='file' @change='handleUpload' :index="index" />
     <span class='gz-label' :class="focused || value?'':'gz-label-empty'" v-if="label">
        {{label}}
    </span>
</a>    
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
                var img = new Image
                reader.onloadend = function (e) {
                var width = 128, //图像大小
                    quality = 0.8, //图像质量
                    canvas = document.createElement("canvas"),
                    drawer = canvas.getContext("2d");
                img.src = this.result;
                img.onload = function () {
                    canvas.width = width;
                    canvas.height = width * (img.height / img.width);
                    drawer.drawImage(img, 0, 0, canvas.width, canvas.height);
                    img.src = canvas.toDataURL("image/png", quality);
                }
                 that.$emit('change',img.src)
                document.removeChild(canvas)
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
