<template>
  <div class="project-item" @click.stop='onClick' :style='`background:#444 url(${data.avatar||"http://zzlatm.gicp.net:10000/public/upload/20200227/20200227_5e57200164ee7.png"})`'>
  <div class='pi-code'>{{type_name}} </div>
  <div class='pi-name'>{{data.name}}</div>
  <div style='font-size:10px;'><span class='pi-type'>{{started_at}} - {{finished_at}}</span> <span class='pi-type' style="color:#aaa;margin-left:10px;">{{from_now}}</span></div>
    
   
    <div class='pi-progress'>
      进行中
      <div class='pi-position'> {{charger.name}}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props:['data'],
  computed:{
    ...mapGetters('core',['getUser']),
    type_name(){
      if(this.data.type == 'class'){
        return "培训"
      }else{
        return "旅游"
      }
    },
    charger(){
      return this.getUser(this.data.charger) || {}
    },
    started_at(){
      return moment(this.data.started_at).format("L")
    },


    from_now(){
      return moment(this.data.started_at).fromNow()
    },
    finished_at(){
      return moment(this.data.started_at).add('min',this.data.duration).format("L")
    }
  },
  methods:{
    onClick(e){
      if(this.data.type == 'class')
        this.RouteTo('/core/classes/'+this.data.id+'/dashboard')
      else
        this.RouteTo('/core/activities/'+this.data.id+'/dashboard')
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
    top:13px;
    left:20px;
  }

  .pi-name{
    margin-top:10px;
    font-size:20px;
    text-overflow: ellipsis;
    max-width:260px;
    overflow:hidden;
    height:35px;
    white-space: nowrap;
  }

  .pi-type{
     font-size:10px;
    color:rgb(62, 236, 255);
  }

  .pi-position{
    font-size:10px;
    color:#aaa;
  }

  .pi-progress{
    font-size:20px;

    position:absolute;
  right:16px;
  text-align: right;
  color:#ff6;
  }
}

.project-item:hover{
  transition:all 0s;
 filter:brightness(1.2);

}

</style>