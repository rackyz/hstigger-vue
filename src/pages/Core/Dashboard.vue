<template>
  <Layout style='width:100%;overflow:hidden;position:relative;height:calc(100% - 40px);overflow-y:auto;padding-bottom:10px;'>

    <Row
      :key='i'
      :gutter="10"
      style='margin:10px;'
    >

      <Col
        :span='5'
        :xs="24"
        :md='12'
        :lg="5"
      >
      <!-- <Card
        class="panel"
        style='width:100%;border:none;background:#23334c;color:#fff;border-radius:0;filter:drop-shadow(1px 1px 1px 2px #333);'
        padding='5'
      >
        <BaseWeather />

      </Card> -->
      <Card
        class="panel"
        style='width:100%;border:none;background:#235;'
        padding="0"
      >
      
        <BaseMyStatus  />
        <div style='height:25px;width:100%;padding:0 10px;background:#14233c;border-bottom-left-radius:5px;border-bottom-right-radius:5px;'>
          <a
            style='float:right;font-size:12px;color:#3af;'
            @click.stop="RouteTo('/core/self')"
          >个人中心
            <Icon type="ios-arrow-forward" />
          </a>
        </div>

      </Card>
          <Card
        class="panel"
        style="width:100%;border:none;margin-top:10px;position:relative;border-bottom-left-radius:0;border-bottom-right-radius:0;border:1px solid #dfdfdf;"
        padding='0'
      >
        <div class='card-title'>
          <Icon
            custom='gzicon gzi-depart'
            size='19'
          /> 我的部门 <span style='float:right;'><a
              href='#'
              style='font-size:12px;'
            ></a><a href='#'></a></span>
        </div>
        <BaseDepList />
      </Card>


      <Card
        class="panel"
        style="width:100%;border:none;margin-top:10px;position:relative;border-bottom-left-radius:0;border-bottom-right-radius:0;border:1px solid #dfdfdf;"
        padding='0'
      >
        <div class='card-title' style="background:#14233c;color:#fff;border-color:#000;">
          <Icon
            custom='gzicon gzi-pm2'
            size='15'
            style="line-height:15px;"
          /> 我的项目 <span style='float:right;'><a
              href='#'
              style="color:#3af;font-size:12px;" @click="RouteTo('/core/self/project')"
            >MORE</a></span>
        </div>
        <BaseProjectList />
      </Card> 
    
      <BaseLinkPanel />
      <BaseDownloadPanel />
        <BaseFilePanel />
      </Col>

      <Col
        :span='13'
        :xs="24"
        :md='12'
        :lg="13"
      >
      <template v-if='my_rss && my_rss.length != 0'>
        <Row :gutter="10">
             <Col
              :span='12'
              :xs="12"
              :md='12'
              :lg="6"
            >
            <Card
              padding='0'
              style='height:90px;margin-bottom:10px;border-radius:5px;border:1px solid #ddd;overflow:hidden;'
            >
              <div @click.stop="RouteTo('/core/training/dashboard')" class="g-hover-lightness" style="width:100%;height:90px;position:relative;color:#fff;padding:10px 20px;font-size:18px;cursor:pointer;background:linear-gradient(to bottom right,#23334c,#334562);">
              <span style='font-size:25px;color:#3af;'>培训中心</span> <br />
              培训报名入口 <Icon type="md-arrow-forward" />
              
              <Icon type="md-easel" color="yellowgreen" size="100" style="position:absolute;right:10px;top:-13px;opacity:0.3;"></Icon>
              <Icon type="md-film" color="#fff" size="220" style="position:absolute;right:100px;top:-10px;opacity:0.3;"></Icon>
              </div>


            </Card>
            </Col>
             <Col
              :span='6'
              :xs="12"
              :md='12'
              :lg="6"
            >
            <Card
              padding='0'
              style='height:90px;margin-bottom:10px;border-radius:5px;border:1px solid #ddd;overflow:hidden;'
            >
              <div @click.stop="RouteTo('/core/resturant')" class="g-hover-lightness" style="width:100%;height:90px;position:relative;color:#fff;padding:10px 20px;font-size:18px;cursor:pointer;background:linear-gradient(to bottom right,#23334c,#334562);">
              <span style='font-size:25px;color:#3af;'>餐厅</span> <br />
              预约 <Icon type="md-arrow-forward" />
              
              <Icon type="md-ice-cream" color="#3af" size="100" style="position:absolute;right:130px;top:-13px;opacity:0.3;"></Icon>
              <Icon type="md-pizza" color="#fff" size="140" style="position:absolute;right:10px;top:10px;opacity:0.3;"></Icon>
              </div>


            </Card>
            </Col>
             <Col
              :span='6'
              :xs="12"
              :md='12'
              :lg="6"
            >
            <Card
              padding='0'
              style='height:90px;margin-bottom:10px;border-radius:5px;border:1px solid #ddd;overflow:hidden;'
            >
            <div @click.stop="RouteTo('/core/resturant')" class="g-hover-lightness" style="width:100%;height:90px;position:relative;color:#fff;padding:10px 20px;font-size:18px;cursor:pointer;background:linear-gradient(to bottom right,#23334c,#334562);">
              <span style='font-size:25px;color:#3af;'>项目展示</span> <br />
              优秀项目 <Icon type="md-arrow-forward" />
              
              <Icon custom="gzicon gzi-supervisor" color="#3af" size="90" style="position:absolute;right:10px;top:-5px;opacity:0.3;"></Icon>
              <Icon type="md-bulb" color="#fff" size="140" style="position:absolute;right:130px;top:10px;opacity:0.3;"></Icon>
              </div>
            </Card>
            </Col>
             <Col
              :span='6'
              :xs="12"
              :md='12'
              :lg="6"
            ><Card
              padding='0'
              style='height:90px;margin-bottom:10px;border-radius:5px;border:1px solid #ddd;overflow:hidden;'
            >
             <div @click.stop="RouteTo('/core/resturant')" class="g-hover-lightness" style="width:100%;height:90px;position:relative;color:#fff;padding:10px 20px;font-size:18px;cursor:pointer;background:linear-gradient(to bottom right,#23334c,#334562);">
              <span style='font-size:25px;color:#3af;'>讨论区</span> <br />
              公司论坛 <Icon type="md-arrow-forward" />
              
              <Icon type="md-chatboxes" color="#3af" size="100" style="position:absolute;right:10px;top:-13px;opacity:0.3;"></Icon>
              <Icon type="md-microphone" color="#fff" size="140" style="position:absolute;right:130px;top:10px;opacity:0.3;"></Icon>
              </div>
            </Card>
            </Col>
          <template v-for="r in my_rss">
            <Col
              :span='12'
              :key='r.id'
              :xs="24"
              :md='24'
              :lg="12"
            >
            <Card
              padding='5'
              :key='r.id'
              style='height:300px;margin-bottom:10px;border-radius:0;border:none;overflow:hidden;border:1px solid #dfdfdf;'
            >
              <div
                class="flex-wrap flex-between"
                style='padding:3px 8px;background:#23334c;color:#fff;'
                v-if="r.media_type != 1"
              ><span>
                  <Icon :type="r.source_type==2?'md-list':'logo-rss'" /> {{r.name}}
                </span>
                <span
                  class='card-more'
                  style='float:right;'
                  @click="RouteTo(r.link)"
                >MORE</span>
              </div>
              <component
                style='height:260px;'
                :is="MapRssComponent(r.media_type)"
                :id="r.id"
              />

            </Card>
            </Col>

          </template>

         
        </Row>
      </template>

      </Col>

      </Col>
      <Col
        :span='6'
        :xs="24"
        :md='24'
        :lg="6"
      >

 <!-- <Card
        class="panel"
        style='width:100%;border:none;border-radius:0;margin-bottom:10px;'
        padding="0"
      >
        <div class='card-title'>
          <Icon
            custom='gzicon gzi-lianjieliu'
            size='19'
          /> 快捷操作 <span style='float:right;font-size:12px;'>MORE</span>
        </div>
        <BaseUserFlowPanel />
      </Card> -->

      <Card
        style='width:100%;border:none;border-radius:0;border:1px solid #dfdfdf;'
        padding="0"
      >
        <div class='card-title'>
          <Icon
            custom='gzicon gzi-date'
            size='19'
          /> 活动/计划 <span style='float:right;'><a
              href='#'
              style='font-size:12px;'
            >MORE</a></span>
        </div>
        <div class="flex-wrap flex-between">
          <BaseNow />
          <Icon
            class='l-add'
            type="md-add"
            size="30"
            style='margin-right:10px;'
          />
        </div>
        <BaseCalender />
         <div class='card-title' v-if="session.my_trainings && session.my_trainings.length > 0">
          <!-- <span class='tab' :class="taskStateFilter==1?'tab-actived':''" @click="taskStateFilter=1">
          <Icon
            custom='gzicon gzi-event'
            size='17'
          /> 会议 {{(state_categoried_tasks[1].length + categriedFlowInstances[1].length)?`(${(state_categoried_tasks[1].length + categriedFlowInstances[1].length)})`:''}}</span> <span class='seperator' style='border-color:#dfdfdf;border-left:none;margin:0 5px;margin-right:10px;' /> -->
          
           <span class='tab' :class="taskStateFilter==0?'tab-actived':''" @click="taskStateFilter=0"> 
            
            <Icon
            custom='gzicon gzi-event'
            size='17'
          /> 培训 {{(state_categoried_tasks[0].length + categriedFlowInstances[0].length)?`(${state_categoried_tasks[0].length + categriedFlowInstances[0].length})`:''}}</span> 
<!--           
          <span class='seperator' style='border-color:#dfdfdf;border-left:none;margin:0 5px;margin-right:10px;' /> 
          <span class='tab' :class="taskStateFilter==2?'tab-actived':''" @click="taskStateFilter=2"> <Icon
            custom='gzicon gzi-event'
            size='17'
          /> 旅游 {{(state_categoried_tasks[2].length + categriedFlowInstances[2].length)?`(${(state_categoried_tasks[2].length + categriedFlowInstances[2].length)})`:''}}</span> <span class='seperator' style='border-color:#dfdfdf;border-left:none;margin:0 5px;margin-right:10px;' /> <span class='tab' :class="taskStateFilter==2?'tab-actived':''" @click="taskStateFilter=2"> <Icon
            custom='gzicon gzi-event'
            size='17'
          /> 其他</span> -->
           <span style='float:right;font-size:12px;'>MORE</span>
        </div>
         <BaseActivityList  v-if="session.my_trainings && session.my_trainings.length > 0" />
      </Card>
     
      <Card
        class="panel"
        style='width:100%;border:none;border-radius:0;margin-top:10px;border:1px solid #dfdfdf;border-bottom:none;'
        padding="0"
      >

        <div class='card-title'>
          <span class='tab' :class="taskStateFilter==1?'tab-actived':''" @click="taskStateFilter=1">
          <Icon
            custom='gzicon gzi-event'
            size='17'
          /> 待处理 {{(state_categoried_tasks[1].length + categriedFlowInstances[1].length)?`(${(state_categoried_tasks[1].length + categriedFlowInstances[1].length)})`:''}}</span> <span class='seperator' style='border-color:#dfdfdf;border-left:none;margin:0 5px;margin-right:10px;' />
          
           <!-- <span class='tab' :class="taskStateFilter==0?'tab-actived':''" @click="taskStateFilter=0"> <Icon
            custom='gzicon gzi-event'
            size='17'
          /> 准备中 {{(state_categoried_tasks[0].length + categriedFlowInstances[0].length)?`(${state_categoried_tasks[0].length + categriedFlowInstances[0].length})`:''}}</span> 
          
          <span class='seperator' style='border-color:#dfdfdf;border-left:none;margin:0 5px;margin-right:10px;' />  -->
          
          <span class='tab' :class="taskStateFilter==2?'tab-actived':''" @click="taskStateFilter=2"> <Icon
            custom='gzicon gzi-event'
            size='17'
          /> 已处理 {{(state_categoried_tasks[2].length + categriedFlowInstances[2].length)?`(${(state_categoried_tasks[2].length + categriedFlowInstances[2].length)})`:''}}</span> <span style='float:right;font-size:12px;'>MORE</span>
        </div>
        
        <template v-for="(fi) in state_categoried_tasks[taskStateFilter].slice(0,10)">
          <div
            class='ti-item'
            :key='fi.id'
            @click="OpenTask(fi.id)"
          >
            <div class='ti-icon'>{{fi.base_type != undefined && getTypesByKey("TASK_TYPE")[fi.base_type]?getTypesByKey("TASK_TYPE")[fi.base_type].name:'任务'}}</div>
            <div class='ti-info'>
              <div class='ti-flowinfo'>
                {{fi.project_id != undefined?get_project(fi.project_id).name:''}} {{fi.dep_id != undefined?getDep(fi.dep_id).name:''}} {{fi.base_type!=undefined && getTypes("ARCHIVE_WORKTYPE").find(v=>v.value == fi.base_type)?getTypes("ARCHIVE_WORKTYPE").find(v=>v.value == fi.base_type).name:''}} {{fi.parent_id?'子任务':''}}
              </div>
              <div class='ti-desc'>
                {{fi.name}}
              </div>
            </div>
            <div class='ti-date'>
              <div class='ti-deadline'>{{fi.start_time ? getTimeString(fi.start_time,fi.plan_duration) : ('计划:'+(fi.plan_duration?(fi.plan_duration +'天'):'无'))}}</div>
              <div class='ti-executor'>{{getTypeByValue('TASK_STATE',fi.state || 0).name}}</div>
            </div>
          </div>
        </template>
        <BaseEmpty v-if='(!state_categoried_tasks[taskStateFilter] || state_categoried_tasks[taskStateFilter].length == 0) && (!categriedFlowInstances[taskStateFilter] || categriedFlowInstances[taskStateFilter].length == 0)' />
        </div>

       

      </Card>

      </Col>
    </Row>
<!-- 
    <BaseFlow
      :id='current_flow.flow_id'
      :inst_id="current_flow.id"
      v-model="showFlow"
      @update='getWorkflows'
    /> -->

    
    <ModalProcessTask v-model="modalProcessTask" :task="current_flow" @update="handleUpdateTask" />

    <Modal
      title="添加RSS信息源"
      footer-hide
      v-model='modalRSS'
      width='400'
    >
      <div style='padding:20px'>
        勾选您所需要的信息源
        <draggable
          v-model="ordered_rss"
          animation='500'
        >
          <template v-for="r in ordered_rss">
            <div
              :key='r.id'
              style='display:flex;justify-content:space-between;align-items:center;padding:2px 10px;'
            >{{r.name}}
              <i-switch
                :value='user_rss ? user_rss.includes(r.id):false'
                @on-change='handleToggleRss(r.id,$event)'
              />
            </div>
          </template>
        </draggable>
      </div>
    </Modal>
  </Layout>
</template>

<script>
import moment from 'moment'
import { mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      modalRSS: false,
      isConfiguring: false,
      modalProcessTask:false,
      //examples
      flowInstances: [],
      flowPassed: [],
      showFlow: false,
      current_flow: {},
      isLoadingActived: false,
      isLoadingPassed: false,
      taskStateFilter:1
    }
  },
  computed: {
    ...mapGetters('core', ['session', 'my_rss', 'user_rss', 'rss','my_tasks','getTypeByValue','getTypes','getTypesByKey','get_project','getDep']),
    categriedFlowInstances(){
      return [this.flowInstances.filter(v=>v.state == 0),this.flowInstances.filter(v=>v.state == 1 || v.state == 4),this.flowInstances.filter(v=>v.state == 2 || v.state == 3 || v.state == 5)]
    },
    draggableRss: {
      set(e) {
        if (e) {
          this.$store.commit('core/SetLocalRss', e.map(e => e.id))
        }

      },
      get() {
        return this.my_rss
      }
    },
    state_categoried_tasks(){
      return [this.my_tasks.filter(v=>v.state == 0),this.my_tasks.filter(v=>v.state == 1 || v.state == 4),this.my_tasks.filter(v=>v.state == 2 || v.state == 3 || v.state == 5)]
    },
    ordered_rss: {
      set(e) {
        if (e) {
          this.$store.commit('core/SetLocalRss', e)
        }
      },
      get() {
        return this.rss
      }
    }

  },
  metaInfo: {
    title: '工作台'
  },
  created() {
    this.$bus.$on('switch-ent', () => {

      this.flowInstances = []
      this.flowPassed = []
      this.getWorkflows()
    })

  },
  mounted() {
    this.getWorkflows()

  },
  methods: {
    ...mapMutations('core', ['toggleRss']),
    OpenTask(id){
      this.api.enterprise.GET_TASKS({param:{id}}).then(res=>{
        let model = res.data.data
         this.current_flow = model
     
         this.modalProcessTask = true
      }).catch(e=>{
        this.Error('错误:',e)
      })
    },
    getTimeString(date, deadline) {
      let now = moment()
      if (deadline) {
        return '截止:' + moment(deadline).fromNow()
      } else if (date)
        return moment(date).fromNow()
      else
        return '-'
    },
    handleUpdateTask(data){
      data.id = this.current_flow.id
      this.$store.dispatch('core/update_tasks',data)
    },
    MapRssComponent(media_type) {
      const MEDIA_TYPES = ['', 'BasePictureNews', 'BaseNewsList', 'BaseNoticeList', 'BaseArticles', 'BaseProjects']
      return MEDIA_TYPES[media_type]
    },
    handleToggleRss(rss_key) {
      this.toggleRss(rss_key)
    },
    getWorkflows() {
      if (this.session.current_enterprise != 'self') {
        this.isLoadingActived = true
        this.isLoadingPassed = true
        this.ENT.LIST_WORKFLOW({ timeout: 20000 }).then(res => {
          this.flowInstances = res.data.data
        }).finally(e => {
          this.isLoadingActived = false
        })

        this.ENT.LIST_WORKFLOW_PASSED({ timeout: 20000 }).then(res => {
          this.flowPassed = res.data.data
        }).finally(e => {
          this.isLoadingPassed = false
        })
      }

    },
    OpenWorkflow(fi) {
      this.current_flow = fi
      this.showFlow = true
    }

  }
}
</script>

<style lang="less" scoped>
.l-count-card {
  font-size: 15px;
  background: rgb(197, 89, 1);
  color: #ddd;
  line-height: 20px;

  i {
    position: absolute;
    font-size: 80px;
    left: 0px;
    top: 10px;
    color: rgba(255, 255, 255, 0.3);
  }
}

.l-count {
  font-size: 30px;
  text-align: right;
  width: 100%;
  color: #fff;
  text-shadow: 1px 1px 1px #333;
}

.card-title {
  margin: 0;
  padding: 5px 10px;
  border-bottom: 1px solid #eee;
  width: inherit !important;
  text-align: left;
}

.fi-item {
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 5px;
  padding-left: 45px;
  margin-bottom: 2px;
  border-bottom: 1px solid #dfdfdf;
  height: 45px;

  i {
    position: absolute;
    left: 0px;
    top: 0px;
    bottom: 0;
    color: #fff;
    text-shadow: 1px 1px 1px #333;
    font-size: 30px;
    width: 40px;
    line-height: 47px;
    border-right: 2px solid #fff;
    background: rgb(1, 134, 230);
  }

  .fi-flowinfo {
    font-size: 12px;
    font-family: "宋体";
    color: #aaa;
  }

  .fi-date {
    text-align: right;
    .fi-deadline {
      font-size: 10px;
      color: red;
    }
  }

  .fi-desc {
    font-size: 14px;
    font-family: "宋体";
  }

  .fi-executor {
    font-size: 12px;
    color: #3af;
  }
}

.fi-item:hover {
  filter: brightness(1.2);
  transition: all 0.5s;
  cursor: pointer;
  background: rgb(233, 236, 185);
}

.ti-item {
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 5px;
  padding-left: 45px;
  margin-bottom: 2px;
  border-bottom: 1px solid #dfdfdf;
  height: 45px;

  .ti-icon {
    position: absolute;
    left: 0px;
    top: 0px;
    bottom: 0;
    color: #fff;
    text-shadow: 1px 1px 1px #333;
    font-size: 13px;
    text-align: center;
    width: 40px;
    line-height: 47px;
    border-right: 2px solid #fff;
    background: rgb(1, 134, 230);
  }

  .ti-flowinfo {
    font-size: 12px;
    font-family: "宋体";
    color: #aaa;
  }

  .ti-date {
    text-align: right;
    .ti-deadline {
      font-size: 10px;
      color: red;
    }
  }

  .ti-desc {
    font-size: 14px;
    font-family: "宋体";
    overflow: hidden;
    text-overflow: ellipsis;
    height: 20px;
  }

  .ti-executor {
    font-size: 12px;
    color: #3af;
  }
}

.ti-item:hover {
  filter: brightness(1.2);
  transition: all 0.5s;
  cursor: pointer;
}

.l-add {
  cursor: pointer;
  padding: 5px;
}

.l-add:hover {
  border: 2px dashed #dfdfdf;
  border-radius: 5px;
}

.l-add:active {
  position: relative;
  bottom: -1px;
  right: -1px;
}

.text-btn-active:active {
  filter: none;
  position: relative;
  bottom: 0;
  right: 0;
}

.text-btn:hover {
  filter: contrast(1.1);
}

.text-btn-active:hover {
  filter: none;
  position: relative;
  bottom: 0;
  right: 0;
}

.text-icon-btn {
  border-radius: 2px;
  i {
    margin: 0;
  }
}

.tab{
  cursor: pointer;
}

.tab-actived{
  color:#3af;
}
</style>