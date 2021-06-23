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
    <div class="activity">{{data.saysth || '没有动态描述'}}</div>
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
      let t = types.find(v=>v.value == this.data.status || 1)
      if(t)
        return t.name
      else
        return '无'
    },
    state_color(){
      let types = this.getTypes('PersonalState')
      let t = types.find(v=>v.value == this.data.status || 1)
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
      let role = '组员'
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
      this.RouteTo('/core/users/'+this.data.id)
    }
  }
}
</script>
<style lang="less" scoped>
.le-employee-wrapper{
  width:245px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 1px 1px 2px #aaa;
  border:1px solid #333;
  padding:5px;
  border-radius: 10px;
  background:#345;

  .info{
    margin-right:2px;
    height:100%;
    font-size:12px;
    text-align: right;
    max-width:120px;
  }

  .role{
    color:#3ef;
  }

  .dep{
    font-size:14px;
    font-weight: bold;
    text-overflow: ellipsis;
    overflow:hidden;
    text-shadow:1px 1px 1px #000;
    width:120px;
    position: relative;
    height:20px;
    color:#ddd;
  }

  .nodep{
    color:#ddd;
  }

  .status{
    background:#246606aa;
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
    width:160px;
    margin-left:0px;
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: left;
    color:#333;
    background:#33333333;
    color:#aaa;
    padding:5px;
  }
}
.le-employee{
  border-radius: 10px;
  overflow: hidden;
   width:85px;height:120px;
   background:#dddddd33;
   
   position: relative;
   filter:brightness(1.1);
   border:2px solid rgba(253, 253, 253, 0.152);
   img{
     height:100%;
     width:100%;
     background:#33333333;
     
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
  border-color:#3ef;
}
.le-employee-wrapper-tmpl:active{
  transition:all 0.3s;
  position: relative;
  right:-1px;
  bottom:-1px;
}
</style>