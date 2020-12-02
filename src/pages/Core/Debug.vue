<template>
        <div style="padding:10px;padding-left:120px;">
        账号: <Select style='display:inline-block;width:200px;' transfer :value="session.user_id"  @on-select='Debug_changeUser'  > <Option :key="d.id" :name="d.id" v-for="d in session.users" :value="d.id">
              {{d.user}}
        </Option>
        </Select><br />
        级别: <Select ref='debug_deps' style='display:inline-block;width:300px;margin-top:5px;' transfer :value="session.type"  @on-select="Debug_ChangeLevel"> <Option :key="d.id" :name="d.id" v-for="d in getTypes('AccountType')" :value="d.value" :style='`color:${d.color}`'>
                    {{d.name}}
            </Option> </Select><br />
            企业: <Select ref='debug_deps' style='display:inline-block;width:300px;margin-top:5px;' transfer :value="session.current_enterprise"  @on-clear="Debug_ClearEnt"  @on-select="Debug_ChangeEnterprise" clearable><Option :key="d.id" :name="d.id" v-for="d in my_enterprises" :value="d.id">
                    {{d.name}}
            </Option> </Select><br />
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

        <hs-avatar :userinfo="session" :size="80" style="position:absolute;left:20px;top:5px;" />
        <br />
        
        <pre ref='pre' style='position:absolute;left:500px;top:10px;bottom:10px;right:10px;background:#000 !important;color:#dfdfdf !important;border:1px solid #aaa;padding:10px;padding-left:45px;'><pre ref='order' style='position:absolute;left:0px;top:0px;width:40px;background:#dfdfdf !important;color:#000 !important;padding:10px;text-align:right;overflow:hidden !important;'>{{linesOrder}}
        </pre>{{this[target]}}
            </pre>
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
      target:'session'
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
