<template>
  <Layout style='width:100%;overflow:hidden;position:relative;height:calc(100% - 40px);overflow-y:auto;'>

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
        style='width:100%;border:none;background:#23334c;color:#fff;border-radius:0;filter:drop-shadow(1px 1px 1px 2px #333);'
        padding='5'
      >
        <BaseWeather />

      </Card>
      <Card
        class="panel"
        style='width:100%;border:none;border-radius:0'
        padding="5"
      >
        <BaseMyStatus />
        <div style='height:25px;width:100%;padding:0 10px;'>
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
        style="width:100%;border:none;margin-top:10px;position:relative;border-bottom-left-radius:0;border-bottom-right-radius:0;"
        padding='0'
      >
        <div class='card-title'>
          <Icon
            custom='gzicon gzi-pm2'
            size='19'
          /> 我的项目 <span style='float:right;'><a
              href='#'
              style='font-size:12px;'
            >MORE</a><a href='#'></a></span>
        </div>
        <BaseProjectList />
      </Card>
      <BaseFilePanel />
      <BaseLinkPanel />
      <BaseDownloadPanel />
      </Col>

      <Col
        :span='13'
        :xs="24"
        :md='12'
        :lg="13"
      >
      <div
        class="flex-wrap"
        style="justify-content:space-between;height:20px;margin-bottom:10px;"
      >
        <div class="flex-wrap">
          <div class="flex-wrap">
            <div
              class='text-btn'
              style='background:#fff;border:1px solid #aaa;color:#aaa;padding:2px 10px;'
              href='#'
              @click='modalRSS=true'
            >新闻</div>
            <div
              class='text-btn'
              :class="`text-btn-active`"
              style='background:rgb(35, 51, 76);padding:2px 10px;'
              href='#'
              @click='modalRSS=true'
            >企业</div>
            <div
              class='text-btn'
              style='background:#fff;border:1px solid #aaa;color:#aaa;padding:2px 10px;'
              href='#'
              @click='modalRSS=true'
            >未命名</div>
          </div>
          <div
            class='text-btn text-icon-btn'
            style='background:rgb(35, 51, 76);margin-left:5px;height:22px;margin-right:5px;width:22px;display:flex;align-items:center;justify-content:center;'
            href='#'
            @click='modalRSS=true'
          >
            <Icon
              type='md-add'
              size="16"
            />
          </div>
          <div
            class='text-btn text-icon-btn'
            style='background:rgb(35, 51, 76);height:22px;margin-right:5px;width:22px;display:flex;align-items:center;justify-content:center'
            href='#'
            @click='modalRSS=true'
          >
            <Icon
              type='ios-settings'
              size="16"
            />
          </div>
        </div>
        <div class="flex-wrap">
          <Input
            placeholder="搜索内容 ..."
            size="small"
            style='width:300px;min-width:100px;max-width:300px;border-radius:0;'
            search
            clearable
          />
          <div
            class='text-btn'
            style='background:#fff;border:1px solid #aaa;color:#aaa;padding:2px 10px;margin-left:5px;'
            href='#'
            @click='modalRSS=true'
          >全站搜索</div>
          <div
            class='text-btn'
            style='background:#fff;border:1px solid #aaa;color:#aaa;padding:2px 10px;margin-left:5px;'
            href='#'
            @click='modalRSS=true'
          >百度一下</div>
        </div>
      </div>
      <template v-if='my_rss && my_rss.length != 0'>
        <Row :gutter="10">

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
              style='height:300px;margin-bottom:10px;border-radius:0;border:none;overflow:hidden;'
            >
              <div
                class="flex-wrap flex-between"
                style='padding:3px 8px;background:#23334c;color:#fff;'
                v-if="r.media_type != 1"
              ><span>
                  <Icon type="logo-rss" /> {{r.name}}
                </span>
                <span
                  class='card-more'
                  style='float:right'
                  @click="RouteTo(r.link,true)"
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
      <Card
        style='width:100%;border:none;border-radius:0'
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
        <BaseCalender style='border-bottom:1px solid #dfdfdf' />

      </Card>
      <Card
        class="panel"
        style='width:100%;border:none;border-radius:0;margin-top:10px;'
        padding="0"
      >
        <div class='card-title'>
          <Icon
            custom='gzicon gzi-lianjieliu'
            size='19'
          /> 快捷操作 <span style='float:right;font-size:12px;'>MORE</span>
        </div>
        <BaseUserFlowPanel />
      </Card>
      <Card
        class="panel"
        style='width:100%;border:none;border-radius:0;margin-top:10px;'
        padding="0"
      >

        <div class='card-title'>
          <span class='tab tab-actived'>
          <Icon
            custom='gzicon gzi-event'
            size='17'
          /> 待处理 {{my_tasks.length?`(${my_tasks.length})`:''}}</span> <span class='seperator' style='border-color:#dfdfdf;border-left:none;margin:0 5px;margin-right:10px;' /> <span class='tab'> <Icon
            custom='gzicon gzi-event'
            size='17'
          /> 关注中</span> <span class='seperator' style='border-color:#dfdfdf;border-left:none;margin:0 5px;margin-right:10px;' /> <span class='tab'> <Icon
            custom='gzicon gzi-event'
            size='17'
          /> 已处理</span> <span style='float:right;font-size:12px;'>MORE</span>
        </div>
        
        <template v-for="(fi,i) in my_tasks">
          <div
            class='ti-item'
            :key='fi.id'
          >
            <div class='ti-icon'>{{getTypesByKey("TASK_TYPE")[fi.base_type].name}}</div>
            <div class='ti-info'>
              <div class='ti-flowinfo'>
                {{fi.root}} {{fi.project_id}} {{fi.dep_id}} 
              </div>
              <div class='ti-desc'>
                {{fi.desc}}
              </div>
            </div>
            <div class='ti-date'>
              <div class='ti-deadline'>{{getTimeString(fi.date,fi.deadline)}}</div>
              <div class='ti-executor'>{{fi.state}}</div>
            </div>
          </div>
        </template>

        </div>

        <template v-for="(fi,i) in flowInstances">
          <div
            class='fi-item'
            :key='fi.id'
            @click='OpenWorkflow(fi)'
          >
            <Icon
              :custom='`gzicon gzi-${fi.icon}`'
              size='25'
            />
            <div class='fi-info'>
              <div class='fi-flowinfo'>
                [{{fi.name}}]<span style='color:#333;margin-left:2px;font-weight:bold;'>{{fi.node_name}}</span>
              </div>
              <div class='fi-desc'>
                {{fi.desc}}
              </div>
            </div>
            <div class='fi-date'>
              <div class='fi-deadline'>{{getTimeString(fi.date,fi.deadline)}}</div>
              <div class='fi-executor'>{{fi.executor}}</div>
            </div>
          </div>
        </template>
        

      </Card>

      </Col>
    </Row>

    <BaseFlow
      :id='current_flow.flow_id'
      :inst_id="current_flow.id"
      v-model="showFlow"
      @update='getWorkflows'
    />

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
      //examples
      flowInstances: [],
      flowPassed: [],
      showFlow: false,
      current_flow: {},
      isLoadingActived: false,
      isLoadingPassed: false
    }
  },
  computed: {
    ...mapGetters('core', ['session', 'my_rss', 'user_rss', 'rss','my_tasks','getTypesByKey']),
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
    getTimeString(date, deadline) {
      let now = moment()
      if (deadline) {
        return '截止:' + moment(deadline).fromNow()
      } else if (date)
        return moment(date).fromNow()
      else
        return '-'
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

.tab-actived{
  color:#3af;
}
</style>