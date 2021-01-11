<template>
        <div class="hs-page">
          <Card style="position:absolute;left:10px;top:10px;width:480px;" padding='5'>
            <div class="flex-wrap" style="position:relative;height:90px;padding:0 5px;">
              <hs-avatar :userinfo="session" :size="80" />
              <div class='info' style='height:calc(100% - 10px);padding:0 10px;'>
                <div style='font-size:20px;'>{{session.name}}({{session.user}})</div>
                <div>上次登录 {{moment(session.lastlogin_at).fromNow()}}</div>
                <div>绑定手机 {{session.phone}}</div>
              </div>
            </div>
          </Card>
          <Card style="position:absolute;left:10px;top:120px;width:480px;" padding='10'>
            账号: <Select style='display:inline-block;width:200px;' transfer :value="session.user_id"  @on-select='Debug_changeUser'  > <Option :key="d.id" :name="d.id" v-for="d in session.users" :value="d.id">
              {{d.user}}
        </Option>
        </Select><br />
            <template v-if="current_enterprise">
            部门: <Select ref='debug_deps' style='display:inline-block;width:300px;margin-top:5px;' multiple transfer :value="session.deps"  @on-select="Debug_ChangeDep"> <Option :key="d.id" :name="d.id" v-for="d in deps" :value="d.id">
                    {{d.name}}
            </Option>
        </Select><br />
            角色: <Select  ref='debug_roles' style='display:inline-block;width:300px;margin-top:5px;' multiple transfer :value="session.roles"  @on-select="Debug_ChangeRole"> <Option :key="d.id" :name="d.id" v-for="d in roles" :value="d.id">
                    {{d.name}}
        </Option>
        </Select></template>
        <div style='margin-top:10px;width:350px;'>
          <template v-for='k in getters'>
             <Button style='margin-right:5px;margin-bottom:5px;' :key='k' :type="target==k?'info':''" @click='target=k;CalcLine()'>{{k}}</Button>
          </template>

         
          </div>
          <div>
             <Button style='margin-right:5px;margin-bottom:5px;' :key='k' :type="target=='appCount'?'info':''" @click="target='appCount';CalcLine()">APPCount</Button>
          </div>
          </Card>
        

        
        <Card style='position:absolute;left:500px;top:10px;bottom:10px;right:10px;overflow:hidden;' class='full-card' padding ='10'>
          <div class="flex-wrap" style="align-items:flex-start;position:relative;height:100%;">
           <div> <Input search v-model="search_text_attr" size="small" style='margin-bottom:10px' />
            <HsxAttribute :data="this[target]" :selected="selected" @select="selected=$event"></HSXAttribute>
           </div>
            
              <div style="height:calc(100%);position:relative;width:calc(100% - 600px);overflow:hidden;overflow-y:auto;margin-left:10px;">
                值
                <pre ref='order' style='position:absolute;left:0px;top:35px;width:40px;background:#dfdfdf !important;color:#000 !important;padding:10px;text-align:right;overflow:hidden !important;padding-bottom:20px;'>{{linesOrder}}</pre>
            <pre ref='pre' style='position:relative;color:#333 !important;padding:10px;margin-left:45px;padding-left:10px;overflow-y:hidden;'>{{selected?(selected.value || ""):""}}
            </pre>
            </div>
          </div>
           
           
        </Card>
        
      
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
const getters = ['session','enterprises','users','deps','roles','types','keys','rss','apps','my_rss','my_enterprises','current_enterprise','flows','my_flows','acc_list','settings']
export default {
  data(){
    return {
      linesCount:0,
      getters,
      linesOrderText:"",
      target:'session',
      selected:null
    }
  },
  computed:{
    ...mapGetters('core',getters),
    ...mapGetters('core',['getTypes']),
    appCount(){
      return {
        message:this.session.unread_msg_count
      }
    }
  },
  watch:{
    selected:{
      handler(v){
        this.CalcLine()
      }
    }
  },
  mounted(){
    var that = this
    setTimeout(() => {
      this.CalcLine()
    }, (1000));
  },
  methods:{
    CalcLine(){
      var that = this
      if(!that.$refs.order)
        return
      that.$refs.order.innerHTML = ""
      this.$nextTick(t=>{
        let l = this.$refs.pre.textContent.split(/\n/).length 

        let s = ""
        for(let i=0;i<l;i++)
          s += ((i+1).toString()+'\n')
        that.linesCount = l
         that.$set(this,'linesCount',l)
        that.$refs.order.innerHTML = s
      })
    },
    OnVisibleChange(e){
      this.$emit("input",e)
    },
    OnCancel(){
      this.$emit("input",false)
    },
    Debug_changeUser(e){
      this.$store.dispatch("core/debug_change_user",e.value)
    },
    Debug_ChangeEnterprise(e){
      this.$store.dispatch("core/SetCurrentEnterprise",e.value)
      this.$store.dispatch("core/whoami")
    },
    Debug_ClearEnt(e){
      this.$store.dispatch("core/SetCurrentEnterprise",null)
      this.$store.dispatch("core/whoami")
    }
  }
}
</script>
<style lang="less">
.full-card{
  .ivu-card-body{
    position:relative;height:100%;
  }
}
</style>