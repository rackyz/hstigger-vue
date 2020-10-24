<template>
  <div class="project-item" @click.stop='onClick' style='background:#444 url(http://zzlatm.gicp.net:10000/public/upload/20200227/20200227_5e57200164ee7.png)'>
  <div class='pi-code'>{{data.code}} </div>
  <div class='pi-name'>{{data.name}}</div>
  <div style='font-size:10px;'><span class='pi-type'>市政监理</span> <span class='pi-type'>慈城</span> <span class='pi-type'>CBD</span></div>
    
   
    <div class='pi-progress'>
      34 %
      <div class='pi-position'>{{data.myposition || '项目经理'}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props:['data'],
  methods:{
    onClick(e){
      this.RouteTo('/core/projects/'+this.data.id+'/dashboard')
    }
  }
}
</script>
<style lang="less" scoped>
.project-item{
  width:100%;
  height:100px;
  background-position:0% 50%;
   background-blend-mode:multiply;
   color:#ddd;
  padding:20px;
  display: flex;
  flex-direction:column;

  .pi-code{
    font-size:10px;
    color:#ff3;
    position:absolute;
    top:5px;
    left:20px;
  }

  .pi-name{
    margin-top:5px;
    font-size:20px;
  }

  .pi-type{
     font-size:10px;
    color:rgb(62, 236, 255);
    border:1px solid rgb(62, 236, 255);
    padding:0 5px;
    border-radius:5px;
  }

  .pi-position{
    font-size:10px;
    color:#af3;
  }

  .pi-progress{
    font-family:"Impact";
    font-size:30px;
    line-height:30px;

    position:absolute;
  right:16px;
  color:#ff6;
  }
}

.project-item:hover{
  transition:all 0s;
  background-blend-mode:color-dodge;
  color:#333;

  .pi-name{
    font-weight:bold;
  }
  .pi-progress{
    color:#660;
  }
}

</style>