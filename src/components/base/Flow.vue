<style lang="less">
.glass-panel-wrapper{
  bottom:60px !important;
}
</style>
<template>
   <Modal v-model='value' footer-hide fullscreen @on-visible-change='handleClose'>
    <div slot='header'><Icon custom='gzicon gzi-lianjieliu' style='margin-right:5px;'></Icon> {{'创建流程实例 '+(id ? ('/ '+get_flow(id).name):'')}} - {{session.id}}</div>
      <!-- <BaseFlow :key="current" /> -->
      <Spin fix v-if="loading">
                <div class="loader">
                    <svg class="circular" viewBox="25 25 50 50">
                        <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10"></circle>
                    </svg>
                </div>
            </Spin>
      <template v-if='!loading && flowDef && flowDef.nodes'>
        
      <workflow  :flow='flowDef' :history='history' @patch='Patch' @recall='Recall' @save='Save' :option='option' :user="session.id" @refresh='getData()'/>
      </template>
    </Modal>
</template>

<script>
import workflow from '../flow/instance.vue'
import { mapGetters } from 'vuex'
export default {
  props:["id","value",'inst_id'],
  data(){
    return {
      instId:null,
      loading:true,
      flowDef:{},
      history:[],
    }
  },
  components:{
    workflow
  },
  mounted(){
    this.getData()
    this.getInst()
  },
  computed:{
    ...mapGetters('core',['flows','session']),
    ...mapGetters('file',['makeURL','uploadingFiles']),
    option(){
      return {
        executor_getters:"core/users",uploader:this.upload,user_id:this.session.id
      }
    }
  },
  watch:{
    id:{
      handler(v){
        this.getData(v)
      },
      immediate:true
    },
    inst_id:{
      handler(v){
        this.getInst(v)
      }
    }
  },
  methods:{
    
    upload(e,u){
      let t = null
      let that = this
      return new Promise((resolve,reject)=>{
        if(!t){
          clearInterval(t)
          t = null
        }
        t = setInterval(()=>{
          let i = 0
          if(i< 100){
            u({loaded:i})
            i+= 3
          }
        },500)

         that.$store.dispatch('file/upload',{files:[e]}).then(res=>{
           console.log(res)
            resolve(that.COS.baseURL +'files/'+ res.url)
          
          

        }).catch(e=>{reject(e)
        }).finally(e=>{
          clearInterval(t)
        })
      })
     
    },
    get_flow(e){
      return this.flows.find(v=>v.id == e)
    },
    handleClose(){
      this.$emit('input',this.value)
    },
    getInst(e){
      if(!e){
        return
      }
      this.instId = e
      this.loading = true
      this.ENT.GET_WORKFLOW({param:{id:e}}).then(res=>{
        console.log("history:",res.data.data)
        let {instance,history,data} = res.data.data
        history.forEach(v=>{
          v.node = v.key
          v.executors = JSON.parse(v.executors)
          v.data = {}
        })
        data.forEach(v=>{
          let node = history.find(n=>n.id == v.history_node_id)
          node.data[v.def_key] = JSON.parse(v.value)
        })
        this.history = history
        this.value = true
      }).finally(e=>{
        this.loading = false
    
      })
    },
    getData(){
      if(!this.id){
        this.value = false
        return
      }

      this.loading = true
      this.CORE.GET_FLOW({param:{id:this.id}}).then(res=>{
        this.flowDef = res.data.data
        if(this.flowDef.inst_id){
          this.getInst(this.flowDef.inst_id)
        }
        console.log('GETDATA:',this.flowDef)
        this.value = true
      }).finally(e=>{
        this.loading = false
    
      })
    },
    Patch(e){
    //  this.loading = true
      console.log('patching:',e)
      if(!this.instId){
        e.flow = {

         flow_id :this.flowDef.id,
          desc : e.data.name +'-2020年终考核'
        }
          this.ENT.POST_WORKFLOW(e).then(res=>{
            
            this.Success("提交完成")
            console.log(res.data.data)
            let {instance} = res.data.data
            
            this.getInst(instance.id)
          }).catch(e=>{
         //   this.Error(e)  
          }).finally(e=>{
         //   this.loading = false
          })
      }else{
        this.ENT.PATCH_WORKFLOW(e,{param:{id:this.instId}}).then(res=>{
          console.log(res)
          this.Success("提交完成")
           this.getInst(this.instId)
        }).catch(e=>{
          this.Error(e)  
        }).finally(e=>{
          this.loading = false
        })
      }
      
    },
    Recall(e){
      this.Confirm('确定要撤回?',()=>{
         this.ENT.RECALL_WORKFLOW(e,{param:{id:this.instId}}).then(res=>{
          console.log(res)
          this.Success("提交完成")
           this.getInst(this.instId)
        }).catch(e=>{
          this.Error(e)  
        }).finally(e=>{
          this.loading = false
        })
      })
      
    },
    Save(e){

    }
  }
}
</script>

<style>

</style>