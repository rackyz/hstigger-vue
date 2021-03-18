<template>
  <div class="lb-file-list">
    <template v-for="f in fileObjects">
      <div class="lb-file-item" :key='f.name'>
        <img :src="`https://nbgzfiles-1257839135.cos.ap-shanghai.myqcloud.com/assets/filetype/${f.ext}.png`" /> <span @click="Download(f.url)" class='l-hover lb-file-name'>{{f.fullname}}</span>
      </div>
    </template>
    <span v-if="!fileObjects || fileObjects.length == 0">无</span>
  </div>
</template>

<script>
export default {
  props:{
    files:{
      type:String | Array
    }
  },
  computed:{
    fileObjects(){
      if(Array.isArray(this.files))
        return this.files
      else if(!this.files.includes(','))
        return []
      else{
        return this.files.split(';').map(v=>{
          let [name,url,ext] = v.split(',')
          return {
            
            name,
            ext,
            url,
            fullname:name+'.'+ext
          }
        })
      }
        
    }
  }
}
</script>
<style lang="less" scoped>
.lb-file-item{
  margin-top:10px;
}

.lb-file-name{
  cursor: pointer;
}
</style>