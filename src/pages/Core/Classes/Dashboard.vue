<template>
  <div style="height:100%;overflow-y:auto;position:relative;padding-bottom:50px;">
    <Row :gutter="0" style="margin:20px 20px;">
      <Col :span='6'>
      <img :src="item.avatar || 'https://nbgzfiles-1257839135.cos.ap-shanghai.myqcloud.com/assets/misc/px.jpg'" style="width:100%;height:210px;border:1px solid #aaa;border-bottom:none;" />
      <div style="background:rgb(20, 35, 60);color:#fff;border:none;padding:5px;padding-left:10px;"> 
        <Icon type="md-easel" size="16" style="margin-right:5px;" />  {{item.name}}
      </div>
      <div style="margin-bottom:10px;background:rgb(40, 55, 80);color:#dfdfdf;border:none;padding:10px;font-size:12px;">
        <div style="color:#aaa;">{{item.desc || '无详细介绍'}}</div> 
        

        <div style="margin-top:5px">
          培训地点 
          <span style="color:yellow">{{item.address || '未指定'}}</span>
        </div>

        <div style="margin-top:5px">
          培训时间
          <span style="color:yellow">  {{item.started_at?moment(item.started_at).format("L"):"--"}} 至 {{item.deadline?moment(item.deadline).format("L"):"--"}}</span>
        </div>
      </div>
      <div class="l-caption" style="background:rgb(20, 35, 60);padding:5px 10px;color:#eee;font-weight:normal;padding-left:15px;">
             <Icon type="md-clock" size="16" style="margin-right:5px;" /> 课程安排
          </div>
      <div  style="border-left:1px solid #eee;border-right:1px solid #eee;width:100%;">
         <BaseEmpty v-if="!item.plans || item.plans.length == 0">
               <div style="">
                  讲师还没有安排课程
                  </div>
              </BaseEmpty>
        <template v-for="(p,i) in item.plans">
          <div class="flex-wrap flex-between" :key="i" style="background:#fff;border-bottom:1px solid #eee;display:flex;align-items:center;padding:0px 10px;">
            <div class="flex-wrap flex-between">
            <div style="width:30px;height:30px;display:flex;align-items:center;justify-content:center;border:1px solid #dfdfdf;border-radius:3px;color:#aaa;font-weight:bold;">
              {{i+1}} 
            </div>
           <div style="padding:10px">
             <div style="font-size:14px;font-weight:bold;"> {{p.name}}</div>
             <div style="font-size:10px;color:#aaa;">{{moment(p.started_at).format('LL')}}, {{p.duration}} h</div>
           </div>
           </div>
           <div class="flex-wrap" style="flex-direction:column;align-items:flex-end;">
              <div :style="`color:${p.stateColor}`">
              {{p.stateText}}
            </div>
           
              <template  v-if="current_video!=p.video_url">
                   <a v-if="p.video_url" @click="changePlayerView(p.video_url)" style="font-size:10px;color:#3af;">
              <Icon type="md-videocam" size="14" /> 观看回放
              </a>
              </template> 
              <template v-else>
                <span style="color:orange;font-size:10px;">
                <Icon type="md-play" size="14" /> 正在播放
                </span>
              </template>
               </a>
           </div>
           
        </div>
      </template>
      </div>
      
      <div class="l-caption" style="background:rgb(20, 35, 60);padding:5px 10px;padding-left:15px;color:#eee;font-weight:normal;margin-top:10px;">
            <Icon type="md-cloud-download" size="16" style="margin-right:5px;" /> 资料下载
          </div>
      <div  style="background:#fff;border:1px solid #eee;"> 
          <BaseEmpty v-if="!item.files || item.files.length == 0">
               <div style="">
                  讲师还没有没上传学习资料
                  </div>
              </BaseEmpty>
        <template v-for="(p,i) in item.files">
          <div class="flex-wrap flex-between" :key="i" style="background:#fff;border-bottom:1px solid #eee;display:flex;align-items:center;padding:0px 10px;">
            <div class="flex-wrap flex-between">
            <div style="width:30px;height:30px;display:flex;align-items:center;justify-content:center;border:1px solid #dfdfdf;border-radius:3px;color:#aaa;font-weight:bold;">
              {{i+1}} 
            </div>
           <div style="padding:10px">
             <div style="font-size:14px;font-weight:bold;"> {{p.name}}</div>
             <div style="font-size:10px;color:#aaa;" >含{{p.count}}个文件<span v-if="p.desc">, {{p.desc}}</span></div>
           </div>
           </div>
           <div :style="{color:getState(p.state).color}">
             <Button icon="md-cloud-download" size="small" type="primary" @click="handleDownload(p.id)" :disabled="!p.count">下载</Button>
           </div>
        </div>
      </template>
      </div>
      </Col>
      <Col :span='12' style="padding:0 22px;">
       <div id="id_test_video" style="width:100%; height:460px;background:#ddd;">
            
          </div>
      
      <div class="l-caption" style="background:rgb(20, 35, 60);padding:5px 10px;padding-left:15px;color:#eee;font-weight:normal;margin-top:10px;">
            <Icon type="ios-quote" /> 问题交流
          </div>
          
             <div style="margin-bottom:10px;background:#fff;color:#aaa;border:none;padding:15px;padding-top:0;min-height:350px;font-size:12px;"> 
               <BaseEmpty>
               <div style="margin-top:150px;">
                  还没有人发起讨论,
                  <Button size="small" icon="md-quote" style="margin-left:3px;" @click="handleCreateDiscuss">点击创建</Button> 
                  </div>
              </BaseEmpty>
      </div>

      
      </Col> 
      <Col :span='6'>
       <!-- <div class="l-caption" style="background:rgb(20, 35, 60);padding:5px 10px;padding-left:15px;color:#eee;font-weight:normal;margin:0;" >
            <Icon type="ios-notice" /> 
            通知
          </div>
          
             <div style="margin-bottom:10px;background:#fff;color:#aaa;border:none;padding:15px;padding-top:0;height:200px;font-size:12px;"> 
               下一节课
      </div> -->
        <div class="l-caption" style="background:rgb(20, 35, 60);padding:5px 10px;padding-left:15px;color:#eee;font-weight:normal;margin:0;">
            <Icon type="ios-photos" /> 
            培训风采
          </div>
          
             <div style="margin-bottom:10px;background:#fff;color:#aaa;border:none;padding-top:0;height:250px;font-size:12px;"> 
                <BaseEmpty msg="暂时没有新动态" v-if="!images || images.length == 0">
              
              </BaseEmpty>
              <Carousel v-model="carouselIndex" autoplay  loop>
              <template v-for="img in images">
                 <CarouselItem :key="img.name">
                   <div style="width:100%;height:250px;position:relative;">
                  <img :src="img.url" style="width:100%;height:100%" />
                  </div>
                </CarouselItem>
              </template>
             
             
          </Carousel>
      </div>
         <div class="l-caption" style="background:rgb(20, 35, 60);padding:5px 10px;padding-left:15px;color:#eee;font-weight:normal;margin:0;">
            <Icon type="ios-quote" /> 
            动态
          </div>
          
             <div style="margin-bottom:10px;background:#fff;color:#aaa;border:none;min-height:100px;font-size:12px;"> 
                <BaseEmpty msg="暂时没有新动态" v-if="!item.dynamics || item.dynamics.length == 0">
              
              </BaseEmpty>
              <template v-for="d in item.dynamics">
                <div :key="d.id" class="flex-wrap flex-between" style="font-size:12px;padding:5px 10px;border-bottom:1px solid #eee;width:100%;">
                 
                  <div><span style="color:#3af;">{{getUser(d.user_id).name}}</span> {{d.content}}</div>
                   <div style="min-width:60px;font-size:10px;color:green;text-align:right;">{{moment(d.created_at).fromNow()}}</div>
                
                </div>
              </template>
      </div>

     
      </Col>

    </Row>
   

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
let player = null
const SetTrainingStateFromDuratin = (item={})=>{
  let now = moment()
  if(item.started_at){
    if (now.isAfter(moment(item.started_at))) {
      if(item.duration){
        item.finished_at = moment().add('hours',item.duration).format()
      }
      if(item.finished_at){
        if (now.isAfter(moment(item.finished_at))){
          item.stateText = '已结束'
          item.stateColor = 'red'
          return
        }  
      }
      item.stateText = '疯狂进行中'
      item.stateColor = 'orange'
      
    }else{
      item.stateText = '积极筹备中'
      item.stateColor = 'green'
    }
  }else{
    item.stateText = '讲师未到'
    item.stateColor = '#333'
  }

  return item

}
export default {
  data(){
    return {
      item:{},
      carouselIndex:0,
      current_video:"https://nbgz-pmis-1257839135.cos.ap-shanghai.myqcloud.com/system/PexelsVideos1824697.mp4",
    }
  },
  mounted(){
    this.getData()
   
  },
  computed:{
    ...mapGetters("core",['getUser']),
    id(){
      return this.$route.params.id
    },
    images(){
      if(this.item.images && this.item.images.includes(','))
      return this.item.images.split(';').map(v=>{
        let [name,url] = v.split(',')
        return {name,url}
      })
    }
  },  
metaInfo:{
   title:"培训课程", 
    route:'/:id'
  },
methods:{
   handleDownload(id){
      this.get_archive(id,data=>{
        let files = data.files.split(';').map(v=>v.split(','))
        if(files.length > 5)
          this.Confirm('文件数量较多，确定继续?',()=>{
            files.forEach(([name,url,ext])=>{
             
              let filename = name.lastIndexOf('.'+ext) == name.length-4?name:name+'.'+ext
               this.DownloadWithName(url,filename)
            })
          })
        else{
             files.forEach(([name,url,ext])=>{
               let filename = name.lastIndexOf('.'+ext) == name.length-4?name:name+'.'+ext
                this.DownloadWithName(url,filename)
            })
        }
      })
    },
    get_archive(id, cb){
      this.api.enterprise.GET_ARCHIVES({param:{id}}).then(res=>{
        let model = res.data.data
        cb(model)
      }).catch(e=>{
        this.Error('打开资料失败:',e)
      })
    },
  changePlayerView(v){
     this.current_video = v
    player.load(v)
  },  
  initPlayer(){
    player =  new TcPlayer('id_test_video', {
"mp4": this.current_video,
"width":"100%",
"height":"100%",
"autoplay":true,
"poster" : {style:"cover","src":'https://nbgzfiles-1257839135.cos.ap-shanghai.myqcloud.com/assets/misc/px.jpg'}
});
  },
   getData(){
      this.api.enterprise.GET_TRAININGS({param:{id:this.id}}).then(res=>{
        let item = res.data.data
        if(item.plans){
          item.plans.forEach(v=>{
            SetTrainingStateFromDuratin(v)
          })
        }
        this.item = item
         this.initPlayer()
        this.api.enterprise.LIST_ARCHIVES({query:{project_id:this.id}}).then(res=>{
          this.$set(this.item,'files',res.data.data)
        })
        this.api.enterprise.LIST_DYNAMICS({query:{project_id:this.id}}).then(res=>{
          this.$set(this.item,'dynamics',res.data.data)
        })
      })

      
      
    
    }, getState(e){
      return this.$store.getters['core/getTypeByValue']("TASK_STATE",e) || {}
    }
}
}
</script>
<style lang="less">
.l-caption{
  margin:5px 0;
  font-weight: bold;
}

.l-panel{
  margin-bottom:10px;background:#fff;color:#aaa;border:none;padding:15px;padding-top:0;height:200px;font-size:12px;
}
</style>