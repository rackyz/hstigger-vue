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
    
     
      </Col>

      <Col
        :span='15'
        :xs="24"
        :md='12'
        :lg="15"
      >
     
       <Card
        class="panel"
        style="width:100%;border:none;margin-top:10px;position:relative;border-bottom-left-radius:0;border-bottom-right-radius:0;border:1px solid #dfdfdf;"
        padding='0'
      >
        

        <div class='card-title'>
          <Icon
            custom='gzicon gzi-Building-'
            size='19'
          /> 项目关注 <span style='float:right;'><a
              href='#'
              style='font-size:12px;'
            ></a><a href='#'></a></span>
        </div>
        <BaseProjectDashboard />
      </Card>

      </Col>

      </Col>
      <Col
        :span='4'
        :xs="24"
        :md='24'
        :lg="4"
      >
 <div class="flex-wrap" style="margin-top:10px;">
        <Card
              padding='0'
              style='height:90px;margin-right:10px;width:90px;border-radius:5px;border:1px solid #ddd;overflow:hidden;'
            >
              <div @click.stop="RouteTo('/core/archivemanagement')" class="g-hover-lightness" style="width:90px;text-align:center;height:90px;position:relative;color:#fff;padding:0;font-size:15px;cursor:pointer;background:linear-gradient(to bottom right,#23334c,#334562);">
              <span style='font-size:40px;color:#3af;'><Icon type="md-add" /></span> <br />
              项目立项 
              
            
              </div>


            </Card>
               <Card
              padding='0'
              style='height:90px;margin-right:10px;width:90px;border-radius:5px;border:1px solid #ddd;overflow:hidden;'
            >
              <div @click.stop="RouteTo('/core/archivemanagement')" class="g-hover-lightness" style="width:90px;text-align:center;height:90px;position:relative;color:#fff;padding:0;font-size:15px;cursor:pointer;background:linear-gradient(to bottom right,#23334c,#334562);">
              <span style='font-size:40px;color:#3af;'><Icon type="md-add" /></span> <br />
              项目立项 
              
            
              </div>


            </Card>
     </div>
      <Card
              padding='0'
              style='height:90px;margin-bottom:10px;border-radius:5px;border:1px solid #ddd;overflow:hidden;margin-top:10px;'
            >
              <div @click.stop="RouteTo('/core/archivemanagement')" class="g-hover-lightness" style="width:100%;height:90px;position:relative;color:#fff;padding:10px 20px;font-size:18px;cursor:pointer;background:linear-gradient(to bottom right,#23334c,#334562);">
              <span style='font-size:25px;color:#3af;'>档案库</span> <br />
              资料查询与归档 <Icon type="md-arrow-forward" />
              
              <Icon type="md-ice-cream" color="#3af" size="100" style="position:absolute;right:130px;top:-13px;opacity:0.3;"></Icon>
              <Icon type="md-pizza" color="#fff" size="140" style="position:absolute;right:10px;top:10px;opacity:0.3;"></Icon>
              </div>


            </Card>
     
   

      </Col>
    </Row>


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
    ...mapGetters('core', ['session', 'my_rss', 'user_rss', 'rss','my_tasks','getTypeByValue','getTypes','getTypesByKey','get_project','getDep','projects']),
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