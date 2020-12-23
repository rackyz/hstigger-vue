
<style lang="less">
.glass-thread{
  .gz-tool:first-child{
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  .gz-tool:last-child{
     border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .gz-tool-checked{
    cursor: inherit;
  }
}
</style>
<template>
  <div
    class="hs-contaner-full"
    style='padding:0;position:relative;height:100%;padding-right:10px;'
  >
    <template v-if="loading">
        <div class='view-wrapper' style='display:flex;justify-content:center;flex-direction:column;font-size:30px;color:#aaa;flex-direciton:column;'>
           <div style='margin:0px auto!important;margin-bottom:20px;width:200px;height:200px;border-radius:50%;overflow:hidden;color:#fff;'>
        <img src='https://file-1301671707.cos.ap-chengdu.myqcloud.com/static/loading02.jpg' style='opacity:0.3;filter:drop-shadow(1px 1px 1px #aaa);width:600px;height:500px;position:relative;left:-200px;top:-150px;'  />
        
        </div>
        
          流程加载中... <br />
          <span style='font-family:consolas'>loading</span>

      </div>
    </template>
    <template v-else>
        <div class='view-wrapper' v-if='canView'>
        <transition name='fade'>
      <div
        class='view'
        ref='view'
        v-if="currentNodeObject && currentNodeObject.view && canView"
      >
        <div class='paper-view'>

          <hs-form
            :form='MakeView(flow.def,currentNodeObject)'
            :data='formData'
          />
        </div>
      </div>
       </transition>
        <transition name='fade'>
      <div
        class='view'
        ref='view2'
        v-if='currentNodeObject && currentNodeObject.layout && canEdit && canView'
      >
        <div class='paper-view'>

          <hs-form
            ref='form'
            :form='MakeForm(flow.def,currentNodeObject)'
            :editable="canEdit"
            :data='formData'
            :env='option'
           
            @submit="model=$event"
          />
        </div>
      </div>
      </transition>
    </div>
   
    <div class='view-wrapper' v-else style='display:flex;justify-content:center;flex-direction:column;'>
       <div style='padding:10px;width:800px;height:500px;position:relative;'>
        <hs-dagre
          ref='dagre'
          :nodes='flow.nodes'
          :actions='flow.actions'
        />
        
      </div>
      您无权查看此阶段数据
    </div>
    <div class='view-wrapper' v-if='currentNode == undefined || !currentNodeObject' style='display:flex;justify-content:center;flex-direction:column;font-size:30px;color:#aaa;'>
       
      请选择对应操作节点
    </div>
    
    <div class='glass-panel-wrapper'>
      
     
      <div class='glass-panel' style='height:70px;'>
        <hs-toolbar
        style='max-height:70px;'
          :data="tools"
          :disabled="toolDisabled"
          @event="onToolEvent"
        />
      </div>
      <div
        class='glass-panel glass-thread'
        style='margin-left:10px;width:auto;height:70px;padding:0 5px;'
        v-if="threads.length > 0 "
      >
        <hs-toolbar
        
          :data="threads_tools"
          :checked="checked"
          @event="onChangeThread"
          :option="{getters:option.executor_getters}"
          :disabled="nodeAuthDisabled"
        />
      </div>
      <div
        class='g-button glass-tool-button'
        style='margin-left:10px;flex-direction:column;'
        :class="canRecall?'':'g-button-disabled'"
        @click="Recall()"
        v-if="canRecall"
      >
        撤回
      </div>
      <div
        class='g-button glass-tool-button'
        v-if="history.length == 0 || (history.length == 1 && history[0] && history[0].state == 0)"
        style='margin-left:10px;flex-direction:column;background:orange;color:#fff;'
        :class="canRecall?'':'g-button-disabled'"
        @click="Save()"
      >
        暂存<span style='color:#aaa;font-size:12px;color:#fff;position:relative;top:-3px;'>本地</span>
      </div>
      <template v-for='a in actions'>
        <div
          :key='a.id'
          v-if="ShowAction(a) && canEdit"
          class='g-button glass-tool-button'
          style='margin-left:10px;color:#fff;'
          :style='`background:${mapActionColor(a.type)};color:#fff;`'
          @click='Submit(a)'
        >
          {{a.name}}
        </div>

      </template>

    </div>
    </template>
        
    
    <Modal
      v-model="showInfo"
      footer-hide
      title="流程信息"
      width="600"
      draggable="true"
    >
      <div style='height:600px;overflow-y:auto;padding:20px;'>
        {{flow.name}}
      </div>
    </Modal>
    <Modal
      v-model='showDagre'
      footer-hide
      title="创建流程"
      width='800'
      @on-visible-change='onOpenDagre'
      draggable="true"
    >
      <div style='padding:10px;width:800px;height:500px;position:relative;'>
        <hs-dagre
          ref='dagre'
          :nodes='flow.nodes'
          :actions='flow.actions'
        />
      </div>
    </Modal>
    <Modal
      v-model="showHistory"
      footer-hide
      title="历史记录"
      width="800"
      draggable="true"
    >
      <div style='height:600px;overflow-y:auto;padding:20px;position:relative;'>
        <pre>{{history}}</pre>
        <div style='position:absolute;right:10px;top:10px;width:300px;'>
          currentNode:{{currentNode}}
        </div>
      </div>

    </Modal>

    <Modal
      v-model="showDocument"
      footer-hide
      title="参考文件"
      width="800"
      draggable="true"
    >
      <div style='height:600px;overflow-y:auto;padding:20px;position:relative;'>

      </div>
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
const NodeStateTypes = [{
  id: 0,
  key: "initing",
  name: "初始化",
  color: "skyblue"
}, {
  id: 1,
  key: "active",
  name: "等待处理",
  color: "#aaa"
}, {
  id: 2,
  key: "submitted",
  name: "已提交",
  color: "orange"
}, {
  id: 3,
  key: "rejected",
  name: "已拒绝",
  color: "darkred"
}, {
  id: 4,
  key: "accepted",
  name: "已接受",
  color: "yellowgreen"
}, {
  id: 5,
  key: "retrying",
  name: "修改中",
  color: "oranged"
}, {
  id: 6,
  key: "processing",
  name: "处理中",
  color: "yellow"
}, {
  id: 7,
  key: "process_ok",
  name: "处理完毕",
  color: 'yellowgreen'
}, {
  id: 8,
  key: "process_failed",
  name: "处理失败",
  color: "red"
}, {
  id: 9,
  key: "freezed",
  name: "已冻结",
  color: "skyblue"
}, {
  id: 10,
  key: "closed",
  name: "已关闭",
  color: "skyblue"
}]

const ActionTypes = [{
  id: 0,
  key: "init",
  name: "初始化",
  color: 'red'
}, {
  id: 1,
  key: "submit",
  name: "提交",
  color: "yellowgreen"
}, {
  id: 2,
  key: "reject",
  name: "拒绝",
  color: "darkred"
}, {
  id: 3,
  key: "accept",
  name: "接收",
  color: "yellowgreen"
}, {
  id: 4,
  key: "process",
  name: "处理",
  color: "orange"
}, {
  id: 5,
  key: "retry",
  name: "重试",
  color: "orange"

}, {
  id: 6,
  key: "close",
  name: "关闭(支线)"
}, {
  id: 7,
  key: "pass",
  name: "跳过"
}]


const MapKey = (types) => {
  let o = {}
  types.forEach(v => {
    o[v.key] = v.id
  })
  return o
}

const GetType = (types, id) => {
  return types.find(v => v.id == id)
}

const GetActionType = t=>GetType(ActionTypes,t)
const GetNodeType = t=>GetType(NodeStateTypes,t)

const NODE_STATES = MapKey(NodeStateTypes)
const ACTION_TYPES = MapKey(ActionTypes)

export default {
  data() {
    return {
      initing: true,
      showDagre: false,
      currentNode: null,
      showHistory: false,
      showData: true,
      showDocument: false,
      showInfo: false,
      model: {},
      formData: {},
      state: 1,
      db:{

      },
      initData: {
      },
    }

  },
  props: {
    flow: {
      type: Object,
      default: () => { }
    },
    initdata: {
      type: Object,
      default: () => { }
    },
    loading:{
      type:Boolean
    },
    history: {
      type: Object,
      default: () => []
    },
    option: {
      type: Object,
      default: () => { }
    },
    user: {
      type: [String, Number]
    }
  },
  mounted() {
     
    

    if(!this.inst_id){
      let draft = localStorage.getItem('draft_flow_'+this.flow.id)
      if(draft){
        this.Confirm("您有一篇保存本地的草稿，是否继续编辑?",()=>{
          this.formData = JSON.parse(draft)
  
           this.Compile()
           
        },()=>{
          localStorage.removeItem('draft_flow_'+this.flow.id)
          this.Compile()
        },{cancelText:"丢弃",okText:"打开"})
      }
    }

  
  },
  watch: {
    initdata: {
      handler(v) {
        if (this.history.length == 0)
          this.Compile()
      },
      immediate: true,
      deep: true
    },
    history: {
      handler(v, oldv) {
         this.currentNode =null

        this.Compile()
      },
      immediate: true,
      deep: true
    }

  },
  computed: {
    checked(){
      return {
        [this.currentNode]:true
      }
    },
    nodeAuthDisabled() {
      let o = {}
      this.threads.forEach(v => {
        if (v.executors && !v.executors.includes(this.user))
          o[v.key] = true
      })
      return o
    },
    handleChange(e){
      this.db = Object.assign(this.formData,e)
    },
    threads_tools(){
      return this.threads.map(v=>({...v,state:v.stateText}))
    },
    currentNodeObject() {
      
      if(this.currentNode == undefined)
        this.currentNode = 0
      let hnode = this.history.find(v=>v.id == this.currentNode)
      if(!hnode)
        return null
      let node = this.nodes.find(v=>v.key == hnode.node)
      return {...node,...hnode}
    },
    tools() {
      let historyCount = this.history.count
      return [
        {
          key: "info",
          name: "流程信息",
          custom: 'jiludanzilishijilu'
        },
        {
          key: "graph",
          name: "流程图",
          custom: "liujisuan",
        },
        {
          key: "history",
          name: "历史记录",
          custom: "date",
          count: this.history.length
        },

        {
          key: "document",
          name: "资料集",
          custom: "xiangmu2",
          count: 1
        },
        {
          key: "db",
          name: "数据",
          custom: "Filelocked",
          type: 'checked'
        },
        {
          key: "contact",
          name: "联系人",
          custom: "contact",
          count: 4
        },

        {
          key: "refresh",
          name: "刷新",
          icon: "md-refresh",
        },
      ]
    },
    actions() {
      if(this.currentNodeObject){
       return this.currentNodeObject.actions.filter(v=>!v.with)
     
      }else{
        return []
      }
    },
    canView(){
     
      if (!this.currentNodeObject)
        return false
       if(this.currentNodeObject.state == 0)
        return true
      if(Array.isArray(this.currentNodeObject.executors) && this.currentNodeObject.executors.includes(this.user)) //and executor
        return true
      else{
        let prev = this.history.find(v=>v.id == this.currentNodeObject.from)
        console.log('prev:',prev)
        if(prev && Array.isArray(prev.executors) && prev.executors.includes(this.user) || (prev && prev.op == this.user))
          return true
      }
    },
    canEdit(){
      if (!this.currentNodeObject)
        return false
         if(this.currentNodeObject.state == 0)
        return true
       if (this.currentNodeObject && Array.isArray(this.currentNodeObject.executors) && this.currentNodeObject.executors.includes(this.user) && this.actions.filter(v=>this.ShowAction(v)).length > 0) //and executor
        return true
    },
    canRecall() {
      if(!this.currentNodeObject)
        return false
      let prev = this.history.find(v=>v.id == this.currentNodeObject.from)
      
      if((prev && prev.op == this.user )|| ( this.currentNodeObject.state != NODE_STATES.initing && this.currentNodeObject.state != NODE_STATES.active && this.currentNodeObject.op == this.user))
        return true
    },
    toolDisabled() {
      return {
        contact: true,
        history:true,
        graph:true,
        document:true,
        db:true
      }
    },
    nodes() {
      return this.flow.nodes.map(n => {
        let o = { ...n }
        o.actions = this.flow.actions.filter(v => v.from == o.key)
        o.in_actions = this.flow.actions.filter(v => v.to == o.key)
        return o
      })
    },
    editable() {
      return true
    },
    
    threads() {
      let t = []
      this.history.forEach(v => {
        if (v.from == undefined)
          t.push(v)
        else {
          let index = t.findIndex(n => n.id == v.from)
         
          if (index != -1) {
            t[index] = v
          } else {
            t.push(v)
          }
        }
      })

      return t.map(v => ({
        key: v.id,
        node: v.node,
        type:"checked",
        stateText:GetNodeType(v.state).name,
        state:v.state,
        name: this.GetNode(v.node).name,
        color: "yellowgreen",
        uid: v.executors,
      }))
    },
    toolOption() {
      return {
        getters: this.option.executor_getters
      }
    }
  },
  methods: {
   ShowAction(a){
     if(this.currentNodeObject && a)
     {
      return this.Action(this.currentNodeObject.state,a.type) != NODE_STATES.error
     }
    
    },
     Action(state, action) {
       console.log(NODE_STATES,ACTION_TYPES,state,action)
      if(state == NODE_STATES.initing || state == NODE_STATES.active || state == NODE_STATES.retrying || state == NODE_STATES.rejected){
        if(action == ACTION_TYPES.submit){
          return NODE_STATES.submitted
        }else if(action == ACTION_TYPES.accept){
          return NODE_STATES.accepted
        }else if(action == ACTION_TYPES.process){
          return NODE_STATES.processing
        }else if(action == ACTION_TYPES.reject){
          return NODE_STATES.rejected
        }else{
          return NODE_STATES.error
        }
      }else if(state == NODE_STATES.submitted){
        if(action == ACTION_TYPES.reject){
          return NODE_STATES.rejected
        }
      }
      
      if(action == ACTION_TYPES.close){
        return NODE_STATES.closed
      }else if(action == ACTION_TYPES.freeze){
        return NODE_STATES.freezed
      }

      return NODE_STATES.error
    },
    Init() {
      if (Array.isArray(this.history) && this.history.length == 0) {
        let o = {
          id: 0,
          node: this.nodes[0].key,
          executors:[this.user],
          state: NODE_STATES.initing
        }
        this.history.push(o)
        this.currentNode = o.id
        let option = this.option || {}
        
        return o
      }
    },
    Compile() {
      this.$nextTick(() => {
         if(this.flow && this.flow.def){
       let option = this.option || {}
      this.flow.def.executors = {
              control: 'node',
              label: '流程配置',
              option: {
                nodes: this.flow.nodes,
                getters: option.executor_getters,
                idKey: option.exe_idKey || 'id',
                labelKey: option.exe_labelKey || 'name'
              }
            }
      }
        if(this.history.length == 0){
          this.currentNode = this.Init()
        }

        let node = this.currentNodeObject
        if (!node)
        {
          if (this.threads.length == 0)
           this.currentNode = this.history[this.history.length - 1].id
          else
            this.currentNode = this.threads[0].key
             node = this.currentNodeObject
          }
        let seq = [node]
        while (node && node.from) {
          node = this.history.find(v => v.id == node.from)
          if (node)
            seq.push(node)
        }

        seq.reverse()
        let data = this.formData
        seq.forEach(v => {
          if(v.data)
            data = Object.assign(data, v.data)
        })
        console.log('data:',data)


        if(Array.isArray(data.executors))
          for(let x in data.executors){
            let e =data.executors[x]
            if(Array.isArray(e))
              this.nodes[i].executors = e
            else
              this.nodes[i].executors = [e]
          }
        this.formData = data

      if(!this.currentNode)
        this.currentNode = this.threads[0].key

        if (this.$refs.view1)
          this.$refs.view1.scrollTop = 0
        if (this.$refs.view2)
          this.$refs.view2.scrollTop = 0
        this.$forceUpdate()
      })

    },

   
    mapActionColor(t) {
      let at = GetActionType(t)
      if (at)
        return at.color
    },
    GetNode(key) {
      return this.nodes.find(v => v.key == key)
    },
    Save() {
      localStorage.setItem("draft_flow_"+this.flow.id,JSON.stringify(this.$refs.form.formControl.model))
      this.Success("本地草稿保存成功")
    },
    Submit(a) {
     
      // parse action
      let actions = [a.key]
      actions = actions.concat(this.currentNodeObject.actions.filter(v => v.with == a.key).map(a=>a.key))
      // check
      // state++
      if (this.$refs.form) {
        let model = this.$refs.form.submit()
        console.log('model:', model)
        if (!model) {
          this.Error("请检查以下错误<br /><div style='padding:5px;border:1px solid #aaa;margin-top:5px;'>" + this.$refs.form.getErrors() + "</div>")
          return
        }

        //check model.executors
        if(this.currentNodeObject.state == NODE_STATES.initing){
          let executorErrors = []
          this.flow.nodes.forEach((node, i) => {
            if ((!model.executors || !model.executors[node.key]) && !node.optional)
              executorErrors.push({ node: node.name, error: '未选择负责人' })
          })
       
        if (executorErrors.length > 0) {
          this.Error("表单配置错误,以下节点需要选择负责人<br /><div style='padding:5px;border:1px solid #aaa;margin-top:5px;'>" + executorErrors.map(v => v.node).join('<br />') + "</div>")
          return
        }
         }

        this.$emit('patch', { actions, node: this.currentNodeObject.id, data: model })
      } else {
        this.$emit('patch', { actions, node: this.currentNodeObject.id })
      }
     
      




    },
    Recall() {

      
      this.$emit('recall',{node:this.currentNodeObject.id})
    },
    MakeView(def, node) {
      if (!def || !node)
        return {}
      return {
        layout: node.view,
        def,
        option: {
          hideAction: true
        }
      }
    },
    MakeForm(def, node) {
      if (!def || !node)
        return {}
      return {
        layout: node.layout,
        def,
        option: {
          hideAction: true
        }
      }
    },
    onOpenDagre(e) {
      if (e)
        this.$refs.dagre.render()
    },
    onChangeThread(e){
      this.currentNode = e
      this.Compile()
    }
    , onToolEvent(e) {
      if (e == 'info') {
        this.showInfo = !this.showInfo
      } else if (e == 'graph') {
        this.showDagre = !this.showDagre
      } else if (e == 'history') {
        this.showHistory = !this.showHistory
      } else if (e == 'document') {
        this.showData = !this.showData
      } else if (e == 'db') {
        this.showData = !this.showData
      } else if (e == 'refresh') {
        this.$emit('refresh')
      } 
    },
  }
}
</script>

<style lang="less" scoped>
.view-wrapper {
  position: absolute;
  left: 0px;
  width: 100%;
  right: 0px;
  top: 0;
  bottom: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;

  z-index: 1;
  .view {
    position: relative;
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
}

.glass-panel-wrapper {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  height: 60px;

  display: flex;
  justify-content: center;

  .glass-panel {
    z-index: 10;
    bottom: 0;

    background: #ffffff77;
    border: 1px solid #dfdfdf;
    border-radius: 5px;
    filter: drop-shadow(1px 1px 5px #ddd);
    display: flex;
    align-items: center;
  }

  .glass-tool-button {
    height: 70px;
    width: 100px;
    background: #ffffff77;
    border-radius: 5px;
    position: relative;
    z-index: 10;
    border: 1px solid #dfdfdf;
    font-size: 23px;
    display: flex;
    align-items: center;
    justify-content: center;
    filter: drop-shadow(1px 1px 5px #ddd);
    color: #333;
  }

  .glass-node-button {
    height: 70px;
    width: 70px;
    background: #ffffff77;
    border-radius: 5px;
    position: relative;
    z-index: 10;
    border: 1px solid #dfdfdf;
    font-size: 23px;
    display: flex;
    align-items: center;
    justify-content: center;
    filter: drop-shadow(1px 1px 5px #ddd);
    color: #333;
  }

  .glass-tool-button:hover {
    filter: brightness(1.1);
  }
}
.paper-view {
  border: 1px solid #ccc;
  width: 570pt;
  margin: 20px auto;
  min-height: 1000px;
  background: #fff;
  margin-bottom: 120px;
  filter: drop-shadow(1px 1px 5px #ddd);
  padding: 60px 60px 40px 60px;
}

.side-wrapper {
  position: absolute;
  top: 0px;
  width: 300px;
  min-height: 1000px;
  background: #333;
  border-right: 1px solid #aaa;
  border-left: 1px solid #aaa;
  z-index: 2;
}
.box-caption {
  height: 30px;
  background: #333;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 5px;
  border-bottom: 1px solid #555;
  z-index: 2;
}
.history {
  margin-right: 5px;
  background: #aaa;
  min-height: 1000px;
}

.graph-wrap {
  height: 160px;
  background: #000;
}


</style>