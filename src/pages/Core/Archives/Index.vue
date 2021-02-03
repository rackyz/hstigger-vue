<template>
  <Layout style='flex-wrap'>
    {{files[0].url}}
    <Sider style='width:420px;color:#fff;'>
      <template v-for="f in files">
        <div class="text-btn" :class="{'text-btn-active':current_url==f[1]}" style="padding:10px;background:#333;" :key="f.name" @click="current_url=f[1]">{{f[0]}}</div>
      </template>
    </Sider>
    <BasePreview style="width:calc(100% - 420px);position:relative;" :url="current_url" />
  </Layout>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data(){
    return {
      loading:false,
      files:[],
      current_url:null
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
        this.current_url = files[0][1]
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

.text-btn-active{
  background:rgb(207, 164, 45) !important;
  color:#fff;
}
</style>