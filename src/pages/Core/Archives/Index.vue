<template>
  <Layout>
    {{files[0].url}}
    <BasePreview :url="files[0][1]" />
  </Layout>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data(){
    return {
      loading:false,
      files:[]
    }
  },
  metaInfo:{
    title:"档案",
    route:"/:id"
  },
  computed:{
    archive_id(){
      return this.$route.params.id
    },
    menus(){
      return this.files.map(v=>{
        v[0]
      })
    },
  },
  mounted(){
    this.getData()
  },
  methods:{
    
    getData(){
      this.loading = true
      let id =  this.archive_id
      this.api.enterprise.GET_ARCHIVES({param:{id}}).then(res=>{
        let data = res.data.data
        let files = data.files.split(';').map(v=>v.split(','))
        this.files = files
      }).catch(e=>{
        this.Error('打开资料失败:',e)
      }).finally(e=>{
        this.loading = false
      })

    }
  }
}
</script>
<style lang="less" scoped>
.seg-label{

  margin-right:10px;
  padding:0 10px;
  color:#37d;
  min-width:80px;
  text-align: center;
  border-bottom:2px solid #37d;
}

.group-title{
  margin:10px;
  font-size:16px;
  border-left:10px solid #666;
  background:#333;
  width:120px;
  color:#fff;
  padding-left:10px;
}
</style>