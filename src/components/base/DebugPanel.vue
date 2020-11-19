<template>
   <Modal title="调试" fullscreen footer-hide draggable v-model="value" v-show='session.id' width="100%" @on-visible-change='OnVisibleChange' @on-cancel="onCancel" >
        <div style="padding:10px;padding-left:120px;">
        用户: <Select style='display:inline-block;width:200px;' transfer :value="session.user_id"  > <Option :key="d.id" :name="d.id" v-for="d in session.users" :value="d.id">
              {{d.user}}
        </Option>
        </Select><br />
            企业: <Select ref='debug_deps' style='display:inline-block;width:300px;margin-top:5px;' multiple transfer :value="session.my_enterprises"  @on-select="Debug_ChangeDep"> <Option :key="d.id" :name="d.id" v-for="d in session.enterprises" :value="d.id">
                    {{d.name}}
            </Option> </Select><br />
            部门: <Select ref='debug_deps' style='display:inline-block;width:300px;margin-top:5px;' multiple transfer :value="session.deps"  @on-select="Debug_ChangeDep"> <Option :key="d.id" :name="d.id" v-for="d in deps" :value="d.id">
                    {{d.name}}
            </Option>
        </Select><br />
            角色: <Select  ref='debug_roles' style='display:inline-block;width:300px;margin-top:5px;' multiple transfer :value="session.roles"  @on-select="Debug_ChangeRole"> <Option :key="d.id" :name="d.id" v-for="d in roles" :value="d.id">
                    {{d.name}}
        </Option>
        </Select>
        <div style='margin-top:10px;width:400px;'>
          <template v-for='k in keys'>
             <Button style='margin-right:5px;margin-bottom:5px;' :key='k' :type="target==k?'info':''" @click='target=k;CalcLine()'>{{k}}</Button>
          </template>
          </div>

        <hs-avatar :userinfo="session" :size="80" style="position:absolute;left:20px;top:5px;" />
        <br />
        
        <pre ref='pre' style='position:absolute;left:500px;top:10px;bottom:10px;right:10px;background:#000 !important;color:#dfdfdf !important;border:1px solid #aaa;padding:10px;padding-left:45px;'><pre ref='order' style='position:absolute;left:0px;top:0px;width:40px;background:#dfdfdf !important;color:#000 !important;padding:10px;text-align:right;overflow:hidden !important;'>{{linesOrder}}
        </pre>{{this[target]}}
            </pre>
                </div>
    </Modal>
</template>

<script>
import { mapGetters } from 'vuex'
const keys = ['session','users','enterprises','types','apps','app_groups']
export default {
  data(){
    return {
      linesCount:0,
      keys,
      linesOrderText:"",
      target:'session'
    }
  },
  computed:{
    ...mapGetters('core',keys),
  },
  mounted(){
    var that = this
    setTimeout(() => {
      this.CalcLine()
    }, (1000));
  },
  props:{
    value:{
      type:Boolean
    }
  },
  methods:{
    CalcLine(){
      var that = this
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
    }
  }
}
</script>
