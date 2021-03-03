<template>
<div class="le-employee-wrapper" :class="{'le-employee-wrapper-tmpl':!nohover}" @click="handleClick">
<div class="le-employee" >
  <img v-lazy="avatar" />
  <div class="le-name">
     {{name}}
  </div>
 
  </div>
  <div class="info">
    
    <div class="dep" :class="{nodep:data.deps.length == 0}">
      <Tooltip :content="getDeps(data.deps)" :max-width="400" transfer :disabled="data.deps.length == 0">
        {{getMainDep(data.deps)}}
      </Tooltip>
    </div>
    <div class="role"  :class="{nodep:data.roles.length == 0}">
      {{getRole(data.roles)}}
    </div>
   
    <div class="status" :style="`background:${state_color}`">{{state}}</div>
    <div class="activity">{{data.personal_focus || '没有动态描述'}}</div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props:['data','nohover'],
  computed:{
    ...mapGetters('core',['deps','roles','getTypes']),
    avatar(){
      return this.data.photo || "https://nbgz-pmis-1257839135.cos.ap-shanghai.myqcloud.com/icon/employee.png"
    },
    name(){
      return this.data.name
    },
    state(){
      let types = this.getTypes('PersonalState')
      let t = types.find(v=>v.value == this.data.personal_state)
      if(t)
        return t.name
      else
        return '无'
    },
    state_color(){
      let types = this.getTypes('PersonalState')
      let t = types.find(v=>v.value == this.data.personal_state)
      if(t)
        return t.color
      else
        return '#33333333'
    }
  },
  methods:{
    getDeps(dep_ids){
      let deps = '暂无部门'
      if(Array.isArray(dep_ids)){
        deps = dep_ids.map(v=>{
          let d = this.deps.find(d=>d.id == v)
          if(d)
            return d.name
          else
            return null
        }).filter(v=>v).join(', ')
      }
      return deps
    },
    getMainDep(dep_ids){
      if(Array.isArray(dep_ids) && dep_ids.length > 0)
      {
        let d = this.deps.find(v=>v.id == dep_ids[0])
        if(d)
          return d.name
      }

      return '暂无部门'
    },
    
    getRole(roles){
      let role = '暂无职务'
      if(Array.isArray(roles)){
        role = roles.map(v=>{
          let d = this.roles.find(d=>d.id == v)
          if(d)
            return d.name
          else
            return null
        }).filter(v=>v).join(',') || role
      }
      return role
    },
    handleClick(){
      this.$emit('event','open')
    }
  }
}
</script>
<style lang="less" scoped>
.le-employee-wrapper{
  width:225px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 1px 1px 2px #aaa;
  padding:5px;
  border-radius: 10px;

  .info{
    margin-right:2px;
    height:100%;
    font-size:12px;
    text-align: right;
    max-width:120px;
  }

  .dep{
    font-size:14px;
    font-weight: bold;
    text-overflow: ellipsis;
    overflow:hidden;
    width:120px;
    position: relative;
    height:20px;
    color:#333;
  }

  .nodep{
    color:#ddd;
  }

  .status{
    background:#24660655;
    padding:2px;
    margin:2px 0;
    min-width:40px;
    margin-left:80px;
    text-align: center;
    font-size:10px;
    font-family: "黑体";
    color:#fff;

  }

  .activity{
    font-size:10px;
    height:50px;
    line-height:16px;
    width:120px;
    margin-left:0px;
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: left;
    color:#333;
    background:#33333322;
    color:#dfdfdf;
    padding:5px;
  }
}
.le-employee{
  border-radius: 10px;
  overflow: hidden;
   width:85px;height:120px;
   background:#ddd;
   position: relative;
   filter:brightness(1.1);
   border:2px solid rgb(255, 255, 255);
   img{
     height:100%;
     width:100%;
     
   }
}
.le-name{
  position: absolute;
  bottom:0;
  left:0;
  right:0;
  text-align: center;
  background:#ffffffaa;
  color:#000;
  font-weight:bold;
}

.le-employee-wrapper-tmpl:hover{
  transition:all 0.3s;
  border:1px solid #3af;
}
.le-employee-wrapper-tmpl:active{
  transition:all 0.3s;
  position: relative;
  right:-1px;
  bottom:-1px;
}
</style>