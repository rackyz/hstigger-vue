<style lang="less">
.hs-table-plus{
  .ivu-table-header,.ivu-table-tip,.ivu-table-header{
    table{
       border:1px solid #eee !important;
    }
  }
  .ivu-table-header thead tr th{
    background:none;
   border:none !important;
    border-bottom:1px solid #eee;
  }

  .ivu-table-body{

  }
}
</style>
<template>
  <div style="padding:20px;height:100%;">
      
      <div class='l-title' style="height:40px;background:#fff;padding:10px;display:flex;align-items:center;">
        <Icon custom='gzicon gzi-mail' style='margin-right:5px;'></Icon> 
        <div>
           {{counts[filter_cat_index]}}条未读消息
        </div>
      </div>
      <div class="l-tool-wrap" style='margin:10px 0;'>
        <Button @click='showModalCreate=true;model={}'>发送</Button>
        <Button @click='getData();getCount()'>刷新</Button>
        <Button :disabled="selectedItems.length == 0" @click="handleDelete">删除</Button>
        <Button :disabled="selectedItems.length == 0" @click="readAll(selectedItems)">标记为已读</Button>
        <Button @click="readAll()">全部标记为已读</Button>
        <Input search  style="width:200px" />
        <ButtonGroup>
            <Button :type="-1 == msg_type?'primary':''"  @click="msg_type=-1;getData()">全部{{counts[0]?`(${counts[0]})`:""}}</Button>
          <template v-for="(t,i) in msg_types">
          
             <Button :type="t.value == msg_type?'primary':''" :key="t.id" @click="msg_type=t.value;getData()">{{t.name}}{{counts[i+1]?`(${counts[i]})`:""}}</Button>
          
          </template>
         
        </ButtonGroup>
      </div> 
      <div style="height:calc(100% - 110px);position:relative;">
       <hs-table class="hs-table-plus" full  selectable="multiple" :columns="columns" :data="items" @event="handleEvent" :loading="loading" style="height:100%" />  
      </div>
       <hs-modal-form v-model='showModalCreate' title="发送消息" :form="Form('message')" :data="model" @on-submit="handleSubmit" width="800" />
  </div>

  
</template>

<script>
export default {
  data(){
    return {
      loading:false,
      model:{},
      showModalCreate:false,
      items:[],
      selectedItems:[],
      msg_type:-1,
      counts:[],
      model:{},
      filter_cat_index:0,
      columns:[
      {
        title:"标题",
        type:'text',
        key:'title',
        option:{
          align:"left"
        },
        render:(h,param)=>{
          let type = this.$store.getters['core/getTypes']('MESSAGE_TYPE').find(v=>v.value == param.row.msg_type)
          let readed = param.row.readed_at?true:false
          let Icon = h('Icon',{props:{type:readed?"md-mail-open":"md-mail",size:"15"},style:{marginRight:"3px"}})
          let group = null
          let domGroup = null
          if(param.row.type == 2){
            group = this.$store.getters['core/deps'].find(v=>v.id == param.row.group_id)
            if(group)
              domGroup = group.name
          }
          else if(param.row.type == 3){
             group = this.$store.getters['core/projects'].find(v=>v.id == param.row.group_id)
              if(group)
              domGroup = group.name
          }
          return h('a',{style:{color:readed?"#aaa":"#3af",float:"left"},on:{
            click:e=>{
              this.RouteTo('/core/notices/'+param.row.id+'/detail')
              param.row.readed_at = moment().format()
            }
          }},[Icon,h('span',{style:{fontWeight:'bold'}},domGroup || type.name),' - '+param.row.title])
        }
      },
      {
        title:"接收时间",
        type:'time',
        width:500,
        key:'created_at',
        render:(h,param)=>{
          let time = param.row.created_at

          return h('span',this.moment(time).format("L HH:mm:ss"))
        }
      },{
        title:"消息类型",
        type:"type",
        width:200,
        key:'msg_type',
        option:{
          	getters:"core/getTypes",
						getters_key:"MESSAGE_TYPE",
							labelKey:"value"
        }
        
      }]
    }
  },
  watch:{
    "$route.path":{
      hanlder(v){
        this.getData()
        this.getCount()
      },
      immediate:true,
      deep:true
    }
  },
  computed:{
    msg_types(){
      return this.$store.getters['core/getTypes']("MESSAGE_TYPE")
    }
  },
  metaInfo:{
    title:'消息中心'
  },
  mounted(){
      this.getData()
        this.getCount()
  },
  methods:{
    handleEvent(e){
      if(e.type == 'select'){
        this.selectedItems = e.data
      }
    },
    getCount(){
      this.api.enterprise.LIST_MESSAGES({query:{q:'count'}}).then(res=>{
        this.counts = res.data.data
      })
    },
    getData(page = 0){
      let queryParam = {
          query:{q:'mine',page}
      }
      if(this.msg_type != -1){
        queryParam.query.msg_type = this.msg_type
      }
       this.loading = true
      this.api.enterprise.LIST_MESSAGES(queryParam).then(res=>{
        let items = res.data.data
        this.items = items
      }).catch(e=>{
        this.Error("数据加载错误:"+e)
      }).finally(e=>{
        this.loading = false
      })
    },
    handleSubmit(e){
      this.api.enterprise.POST_MESSAGES(e).then(res=>{
         this.Success("发送成功")
        this.showModalCreate = false
        this.getData()
      })
     
    },
    handleDelete(e){
      let deleteItems = this.selectedItems.map(v=>v.id)
      this.Confirm(`确定删除选定的<span style='color:red;margin:0 2px;font-weight:bold'>${this.selectedItems.length}条</span>通知?`,e=>{
        this.api.enterprise.POSTACTION_MESSAGES(deleteItems,{param:{action:"delete"}}).then(res=>{
          this.Success("删除成功")
          this.$set(this,'items',this.items.filter(v=>!this.deleteItems.includes(v.id)))
        })
        
      })
      
    },
    readAll(items=[]){
      this.Confirm(items.length != 0?"确认将选定消息标记为已读?":"确认将所有消息标记为已读?",e=>{
        this.api.enterprise.POSTACTION_MESSAGES(items.map(v=>v.id),{param:{action:'read'}}).then(res=>{
          this.Success('操作完成')
          this.getData()
          this.getCount()
        })
      })
    }
  }
}
</script>

<style lang="less">
.l-tool-wrap{
  >*{
    margin-right:5px;
  }
}
</style>