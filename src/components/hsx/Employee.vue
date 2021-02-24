<template>
<div class="le-employee-wrapper" @click="handleClick">
<div class="le-employee" >
  <img v-lazy="avatar" />
  <div class="le-name">
     {{name}}
  </div>
 
  </div>
  <div class="info">
    
    <div class="dep">
      {{getDep(data.deps)}}
    </div>
    <div class="role">
      {{getRole(data.roles)}}
    </div>
   
    <div class="status">{{data.personal_status || '空闲'}}</div>
    <div class="activity">{{data.personal_focus || '没有动态描述'}}</div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props:['data'],
  computed:{
    ...mapGetters('core',['deps','roles']),
    avatar(){
      return this.data.photo || "https://nbgz-pmis-1257839135.cos.ap-shanghai.myqcloud.com/icon/employee.png"
    },
    name(){
      return this.data.name
    },
  },
  methods:{
    getDep(deps){
      let dep = '暂无部门'
      if(Array.isArray(deps)){
        dep = deps.map(v=>{
          let d = this.deps.find(d=d.id == v)
          if(d)
            return d.name
          else
            return null
        }).filter(v=>v).join(',') || dep
      }
      return dep
      
    },
    getRole(roles){
      let role = '暂无职务'
      if(Array.isArray(roles)){
        role = roles.map(v=>{
          let d = this.roles.find(d=d.id == v)
          if(d)
            return d
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
  width:230px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 1px 1px 2px #aaa;
  padding:5px;
  border-radius: 10px;

  .info{
    margin-right:10px;
    height:100%;
    font-size:12px;
    text-align: right;
  }

  .dep{
    font-size:15px;
    font-weight: bold;
  }

  .status{
    color:red;
   
  }

  .activity{
    font-size:12px;
    height:50px;
    
    width:100px;
    text-align: right;
    color:#aaa;
  }
}
.le-employee{
  border-radius: 10px;
  overflow: hidden;
   width:85px;height:120px;
   background:#ddd;
   position: relative;
   img{
     margin:0 auto;
     height:100%;
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

.le-employee-wrapper:hover{
  transition:all 0.3s;
  border:1px solid #3af;
}
.le-employee-wrapper:active{
  transition:all 0.3s;
  position: relative;
  right:-1px;
  bottom:-1px;
}
</style>