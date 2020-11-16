<style>
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .demo-spin-col{
        height: 100px;
        position: relative;
        border: 1px solid #eee;
    }
</style>
<template>
  
      <div style='width:100%;height:calc(100% - 85px);position:relative;overflow:hidden;'>
        <div  style="background:#fff;padding:10px;border:1px solid #dfdfdf;position:absolute;left:10px;top:10px;bottom:10px;width:300px;overflow:hidden;">
           <div class="h-title">
           <Icon type="ios-list" /> 日志列表
           </div>
          <div class='tree-wrap' style='position:absolute;top:40px;bottom:10px;left:10px;right:10px;'>
            <hs-tree v-model="selected" :data='hs.makeTree(list)' style="min-width:260px;border:1px solid #ddd;padding:5px;overflow-y:auto;height:100%;" @on-select="getLogData" :nodeRenderer="nodeRenderer" />
          </div>
          
        </div>
        <div  style="margin:10px;margin-left:320px !important;height:calc(100% - 20px);overflow:hidden;position:relative;border:1px solid #dfdfdf;background:#fffffa;padding:10px;" padding="10">
           <div class="h-title">
           <Icon type="ios-list" />  日志内容 <span style='color:darkred' v-if="selected && log &&log.data">[{{selected.name}}] [{{log.data.length}}条记录]</span>
            </div>
          <div class="l-content" style="padding:0 20px;height:100%;overflow:hidden;overflow-y:auto;">
               <Spin fix v-show="loading">
                    <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                <div>加载中</div>
               </Spin>
              
               <template v-if="log && log.data">
               <template v-for="l in log.data">
                   <Row type="flex" :key="l.id" class-name='log-item' align="top">
                       <Col :span="3" class="date">
                       [{{hs.moment(l.date).format('YYYY-MM-DD HH:mm:ss')}}]
                       </Col>
                        <Col :span='1' class="type">
                        {{mapType(l.type)}}
                        </col>
                        <Col :span='1' class="level" :class="'level-'+l.level">
                        {{mapLevel(l.level)}}
                        </col>
                       
                        <Col :span='19' class="message">
                        {{l.message}}
                        </Col>

                   </Row>
               </template>
               </template>
               </div>
          </div>
      </div>

</template>

<script>
export default {
    data(){
        return {
          list:[],
            loading:false,
            selected:null,
            logs:"",
            log:{}
        }
    },
    watch:{
        selected:{
            handler(v){
                this.getLogData(v)
            }
        }
    },
    mounted(){
        this.getData()
    },
    methods:{
        mapType(t){
            const mapper = {
                app:"服务器",
                user:"用户",
                req:"请求"
            }
            return mapper[t]
        },
        mapLevel(t){
            const mapper = {
                INFO:"记录",
                WARNING:"警告",
                ERROR:"错误"
            }

            return mapper[t]
        },
        nodeRenderer(h,node){
          return h('span',{style:{color:'dark'}},[h('Icon',{props:{custom:"gzicon gzi-rizhi"},style:{marginRight:"3px"}}),node.name]);
        },
        getData(){
            this.CORE.GET_LOGS().then(res=>{
              let list = res.data.data
             
               list.sort((a,b)=>a>b?1:-1)
              list.forEach(v=>{
                  if(['user.log','req.log','application.log'].includes(v.name)){
                      v.parent_id = 1
                  }else{
                      v.parent_id = 2
                  }
                  v.file = v.name
                  if(v.name){
                      let matches = v.name.match(/(.*)\.log-(.*)\.log/)
                      if(matches){
                          let [, type, date] = matches
                          v.name = type + '.' + date
                      }
                      
                  }
              })

              let count = list.filter(v => v.parent_id == 2).length
              list.forEach(v=>{
                v.hideCount = true
              })
              list =  [{
                  id: 1,
                  name: '当前日志',
                  count:3
              }, {
                  id: 2,
                  name: `历史日志`,
                  count,
                  fold: true
              }].concat(list)
              this.selected = list[0].id
              this.list = list
              this.getLogData(list[0].file)
            })
        },
        getLogData(node){
          this.selected = node
          if(node && node.id){
              this.CORE.GET_LOG({param:{id:node.id}}).then(res=>{
              this.log = {...this.list.find(v=>v.id == node.id),data:res.data.data}
            })
          }
           
        }
    }
}
</script>
<style lang="less" scoped>

    .h-title{
      font-weight: bold;
      color:rgb(8, 57, 100);
      margin:0;
      i{
        font-size:17px;
          font-weight: bold;
        color:rgb(8, 57, 100);
  
      }
      margin-bottom:10px;
    }

.l-content{
    position: relative;
    overflow-y:auto;
    

    .log-item{
        font-size:12px;
        margin-bottom:2px;
        align-items: flex-start;
        border-bottom:1px solid #dfdfdf;
        padding:2px 5px;
        .date{
            color:darkgreen;
        }

        .level{
            font-size:10px;
            font-weight: bold;
        }

        .level-ERROR{
            color:darkred;
           
        }

        .type{
            color:#555;
            font-weight: bold;
        }

        .level-INFO{
            color:rgb(14, 64, 126);
        }

        .message{
            color:#888;
        }
    }
}
</style>