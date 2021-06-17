<template>
  <div class="project-item" :class="data.state>2?'project-item-finished':''" @click.stop='onClick' :style='`background:#aaa url(${data.avatar||"http://zzlatm.gicp.net:10000/public/upload/20200227/20200227_5e57200164ee7.png"})`'>
  <div class="project-item-mask">
  <div class='pi-code'>{{data.code}} </div>
  <div class='pi-name'>{{data.name}}</div>
  <div style='font-size:10px;'>
      {{data.dep}} {{data.type}} <span style="color:#3af" v-if='data.amount'>{{hs.formatSalary(data.amount)}}</span>
  </div>
    
   
    <div class='pi-progress'>
      <span :style="{color:stateColor}">{{data.stateText || '进行中'}}</span>
      <div class='pi-position'>{{data.position || '项目经理'}}</div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  props:['data'],
  computed:{
    stateColor(){
      return ['#aaa','orange','yellowgreen','green','red','#aaa'][this.data.state || 0]
    }
  },
  methods:{
    onClick(e){
      if(this.data.type == '培训')
        this.RouteTo('/core/classes/'+this.data.id+'/dashboard')
      else if(this.data.id.indexOf("CT") == 0)
        this.RouteTo('/core/cm/'+this.data.id+'/dashboard')
      else
        this.RouteTo('/core/projects/'+this.data.id+'/dashboard')
    }
  }
}
</script>
<style lang="less" scoped>
.project-item{
  width:100%;
  height:100px;
  background-position:10% 30% !important;
   background-blend-mode:multiply;
   color:#ddd;
 
  display: flex;
  flex-direction:column;

  .project-item-mask{
    background:#00000055;
    height:100%;
    width:100%;
     padding:20px;
  }

  .pi-code{
    font-size:10px;
    color:#ff3;
    position:absolute;
    top:10px;
    left:20px;
  }

  .pi-name{
    font-size:20px;
    margin-top:8px;
    text-overflow: ellipsis;
    max-width:230px;
    overflow:hidden;
    height:35px;
    white-space: nowrap;
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
    color:#3af;
    text-align: right;
    line-height:16px;
    margin-top:5px;
  }

  .pi-progress{
    top:30px;
    font-size:20px;
    line-height:30px;
    text-align: right;
    position:absolute;
    text-shadow: 1px 1px 1px #000;
  right:16px;
  color:#ff6;
  }
}

.project-item:hover{
  transition:all 0s;
  filter:brightness(1.1);

  .pi-name{
    color:#3af;
  }
}

.project-item-finished{
  filter:grayscale(1);
}

.project-item-finished:hover{
  .pi-name{
    color:#379
  }
}

</style>