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
          <Row :gutter="12">
            <Col :span='12'>
              <Input search v-model="search_text_attr" size="small" style='margin-bottom:10px' />
            <HsxAttribute :data="this[target]" :selected="selected" @select="selected=$event"></HSXAttribute>
            </Col>
              <Col :span='12'>
               值 
                 <template v-if="selected">
                   <template v-if="typeof selected.value == 'object'">
                   {{selected.key}}
                 <HsxAttribute :data="selected.value"  @select="selected=$event"></HSXAttribute>
                 </template><template v-else>
                   <div>
                     {{selected.value}}
                   </div>
                   
                 </template>
                 </template>
            </Col>
          </Row>
           
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