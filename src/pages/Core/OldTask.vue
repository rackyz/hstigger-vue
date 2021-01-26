<style lang="less" >
.block-input {
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
  position: relative;
  height: 30px;
  input {
    border-radius: 0;
    background: #333;
    border: none;
    width: 100%;
    height: 29px;
    color: #fff;
    padding-left:10px;
    font-size:12px;
  }

  input:focus {
    filter: brightness(1.1);
    box-shadow: none;
    background:#fff;
    color:#333;
  }
  .ivu-input-icon {
    line-height: 30px;
  }
}
</style>
<template>
  <div
    class="page"
    style='position:relative;height:100%;'
  >
    <Drawer
      v-model='showSider'
      placement="left"
      :closable='false'
      :transfer="false"
      inner
      styles='background:#23334c;border-right:1px solid #000;border-top:1px solid #000'
    >
      <Input
        class='block-input'
        style='border:1px solid #000;height:32px;'
        placeholder="查询"
      />
    </Drawer>
    <div
      class="content"
      :class="{'content-on':showSider}"
    >

      <div
        class="flex-wrap"
        style="justify-content:space-between;"
      >
        <div
          class="block"
          style='width:60px;'
          @click='showSider=true'
        >
          <div class='label'>我的任务</div>
          <div class='count'>{{items.length}}</div>
        </div>
        <div class="block block-button">
          <Icon custom='gzicon gzi-backarrow' />
          上一级
        </div>
        <div
          class="block block-task"
          style="flex:1"
        >
          <hs-avatar
            :userinfo='session'
            size='40'
            class='avatar'
          />
          <div
            class="flex-wrap"
            style='font-size:12px;'
          >
            <div class='attr'>任务编号 <span class='value'>102314</span></div>
            <div class="attr">类型 <span class='value'>自由任务</span></div>
            <div class="attr">所属项目 <a class='value'>GI201901 - EIP企业信息平台</a></div>
            <div class="attr">创建时间 <span class='value'>3 小时前</span></div>
            <div class="attr">花费时间 <span class='value'>8.2 h</span></div>
            <div class="attr">负责人 <span class='value'>马骍</span></div>
          </div>
          <div class='title'>流程问题处理</div>
        </div>
        <div class="block">
          <div class='label'>工作量统计</div>
          <div class='count'>62.3%</div>
        </div>
        <div class="block">
          <div class='label'>花费时间</div>
          <div class='count'>2.87h</div>
        </div>
        <div class="block">
          <div class='label'>人力成本</div>
          <div class='count'>2.13 Ph</div>
        </div>
        <div class="block block-button">
          <Icon custom='gzicon gzi-config' />
          配置
        </div>
      </div>
      <div
        class="flex-wrap"
        style=""
      >
       <div class="block attr-block">
      <div
            class='label'
          
            style='flex:1;text-align:center;'
          
          >
            <Icon type="md-create" /> 任务处理
          </div>
          </div>
        <div class="block attr-block"   :class="showSubs>0?'block-actived':''"    @click='showSubs>0?showSubs=0:showSubs=1'>
          
          <div
            class='label'
          
            style='flex:1;text-align:center;'
          
          >
            <Icon type="md-add" /> 任务拆分 {{subs.length}}
          </div>
        </div>
        
         
        <div
          class="block attr-block"
          style="flex:1"
        >
        </div>

      </div>
      <div style='position:relative;height:calc(100% - 100px);overflow:hidden;'>
       
     

      <split-pane class='workspace-wrap' v-on:resize="resize" :min-percent='20' :default-percent='30' split="vertical">
        <div class='task-detail' slot="paneL">
          <div class='flex-wrap'>
            <div class='block attr-block' style='width:100%;background:#333;'>
              <div class='label'><Icon type='md-paper' /> 任务资料区</div>
              <Icon type='md-close' />
            </div>
          </div>
         
         <div class=""></div>
          <div class='flex-wrap'>
            <div class='block block-dropdown'  @click="showViewMenu=!showViewMenu" style='width:100%;background:#eee;border-bottom-color:#aaa;'>
              <div class='label' style='color:#333;'><Icon type='md-paper' /> 任务动态</div>
              <div class='count' style='color:#555;float:left;'>任务动态</div>
            </div>
          </div>
           <div  style='position:absolute;top:0;left:0;right:0;z-index:100;bottom:0;background:#fff;overflow-y:auto;' v-show="showViewMenu" >
          <template v-for="d in [1,2,3]">
             <div :key='d' class='block block-dropdown' style='width:100%;background:#eee;border-bottom-color:#aaa;'>
              <div class='label' style='color:#333;'><Icon type='md-paper' /> 任务动态</div>
              <div class='count' style='color:#555;float:left;'>任务动态</div>
            </div>
          </template>
          </div>
          <div class='task-detail-content'>
            <div class='item' style='padding:10px;color:#333;margin-bottom:5px;'>
              <div class='status' style='display:flex;'>
                <span class='date' style='margin-right:10px;font-weight:bold;background:#333;color:#ddd;font-size:12px;padding:2px 5px;'>1 小时前</span>
               
              </div>

              <div class='item-detail' style='padding:10px;background:#ccc;border-bottom-right-radius:10px;'>
                <div class="flex-wrap"> <hs-avatar :userinfo="session" style='margin-right:5px' /> <a href="#">{{session.name}}</a> 完成了任务</div>
                 <div style='margin-top:5px;'>更新了平行责任人的读取方式，现在能正确匹配3位平行责任人和打分结果</div>
                
              </div>
            </div>  <div class='item' style='padding:10px;color:#333;margin-bottom:5px;'>
              <div class='status' style='display:flex;'>
                <span class='date' style='margin-right:10px;font-weight:bold;background:#333;color:#ddd;font-size:12px;padding:2px 5px;'>3 小时前</span>
               
              </div>

              <div class='item-detail' style='padding:10px;background:#ccc;border-bottom-right-radius:10px;'>
                <div class="flex-wrap"> <hs-avatar :userinfo="session" style='margin-right:5px' /> <a href="#">{{session.name}}</a> 提交了任务动态</div>
                 <div style='margin-top:5px;'>更新了平行责任人的读取方式，现在能正确匹配3位平行责任人和打分结果</div>
                
              </div>
            </div>  <div class='item' style='padding:10px;color:#333;margin-bottom:5px;'>
              <div class='status' style='display:flex;'>
                <span class='date' style='margin-right:10px;font-weight:bold;background:#333;color:#ddd;font-size:12px;padding:2px 5px;'>5 小时前</span>
               
              </div>

              <div class='item-detail' style='padding:10px;background:#ccc;border-bottom-right-radius:10px;'>
                <div class="flex-wrap"> <hs-avatar :userinfo="session" style='margin-right:5px' /> <a href="#">{{session.name}}</a> 提交了任务动态</div>
                 <div style='margin-top:5px;'>更新了平行责任人的读取方式，现在能正确匹配3位平行责任人和打分结果</div>
                
              </div>
            </div>
            
          </div>

        </div>
        <div class='workspace' slot="paneR" style='background:#dfdfdf;'>
           <div class='block attr-block block-dropdown' style='width:100%;background:#333;'>
              <div class='label'><Icon type='md-paper' /> 任务处理区</div>
              
            </div>
            <div class='workspace-detail' style='position:relative;height:calc(100% - 30px);padding:20px;overflow:hidden;'>
               <transition name="dropdown">

          <div
            v-show='showSubs'
            style='position:absolute;top:0;left:0;right:0;z-index:100;bottom:0;background:#fff;overflow-y:auto;'
          >
            <div class='flex-wrap'>
                <Input
          class='block-input'
          style='width:200px;'
          size='small'
          search
          clearable
        />
              <div
          class="block attr-block attr-block-dark"
          @click='showSubs==1?showSubs=0:showSubs=1'
          :class="showSubs==1?'block-actived':''"
        >
          <div class='label'>全部</div>
          <div class='count'>{{subs.length}}</div>
        </div>
        <div
          class="block attr-block attr-block-dark"
          @click='showSubs==2?showSubs=0:showSubs=2'
          :class="showSubs==2?'block-actived':''"
        >
          <div class='label'>进行中</div>
          <div class='count'>2</div>
        </div>
        <div
          class="block attr-block attr-block-dark"
          @click='showSubs==3?showSubs=0:showSubs=3'
          :class="showSubs==3?'block-actived':''"
        >
          <div class='label'>已完成</div>
          <div class='count'>1</div>
        </div>
        <div
          class="block attr-block attr-block-dark"
          @click='showSubs==4?showSubs=0:showSubs=4'
          :class="showSubs==4?'block-actived':''"
        >
          <div class='label'>已挂起</div>
          <div class='count'>1</div>
        </div>
        <div
          class="block attr-block attr-block-dark"
          style="flex:1"
        >
        </div>
            </div>
            <div class='task task-title'>
              <div class='code'>
                编号
              </div>
              <div class='title'>
                任务名称
              </div>
              <div class='work'>
               状态
              </div>
              <div class='work'>
                工作量
              </div>
              <div class='time'>
                计划时间
              </div>
              <div class='charger'>
                负责人
              </div>
              <div
                class='result'
                style='width:80px;'
              >
                成果
              </div>
              <div
                class='result'
                style='width:80px;'
              >
                花费时间
              </div>
            </div>
            <template v-for='t in subs'>
              <div
                :key='t.id'
                class="task"
              >
                <div class='code'>
                  {{t.parent_id}}-{{t.id}}
                </div>
                <div class='title'>
                  {{t.name}}
                </div>
                 <div class='work'>
               已完成
              </div>
                <div class='work'>
                  30%
                </div>
                <div class='time'>
                  3.5 h
                </div>
                <div class='flex-wrap charger'>
                  <hs-avatar
                    :userinfo='session'
                    size='20'
                    class='avatar'
                    style='margin-right:5px;'
                  /> {{session.name}}
                </div>
                 <div
                class='result'
                style='width:80px;'
              >
                <a href="#">查看</a>
              </div>
              <div
                class='result'
                style='width:80px;'
              >
                0.5 h
              </div>

              </div>
            </template>
          </div>
        </transition>
              <hs-form style='width:600px;' :form="projectForm" editable :data='projectFormData' :option="{hideCancel:true}" />
            </div>
        </div>
      </split-pane>
    </div>
 </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import projectForm from '@/forms/project'
export default {
  data() {
    return {
      showSubs: false,
      showSider: false,
      showViewMenu:false,
      projectForm,
      projectFormData:{},
      items: [{
        id: 1,
        name: "流程的问题"
      }, {
        id: 2,
        name: "考核数据问题处理"
      }, {
        id: 3,
        name: "考核数据提取"
      }],
      subs: [{
        id: 4,
        name: "FORM提交数据的问题",
        parent_id: 1
      }, {
        id: 5,
        name: "节点与状态",
        parent_id: 1
      }, {
        id: 6,
        name: "流程图",
        parent_id: 1
      }, {
        id: 7,
        name: "历史与结构",
        parent_id: 1
      }]
    }
  },
  computed: {
    ...mapGetters('core', ['session'])
  }
}
</script>
<style lang="less" scoped>
.action-button {
  width: 220px;
  height: 80px;
  background: linear-gradient(to bottom right, #aaa, #fff);
  transition: left 0.2s ease-in-out;
}

.block {
  padding: 5px 10px;
  position: relative;
  color: #aaa;
  border-right: 1px solid #000;
  height: 60px;
  border-bottom: 1px solid #000;
  background: #394865;
  cursor: pointer;
  min-width: 100px;
  margin: 0;
  .label {
    font-size: 12px;
  }

  .count {
    font-size: 20px;
    text-align: center;
    color: #fff;
  }

  .attr {
    font-size: 12px;
    color: #aaa;
    margin-right: 15px;
    .value {
      color: #fff;
    }
  }

  .title {
    color: #fff;
    display: flex;
    align-items: center;
    height: 30px;
  }
}

.dropdown-enter,.dropdown-leave-to{
            opacity: 0;
            transform: translateY(-320px);
        }

        .dropdown-enter-active,.dropdown-leave-active{
            transition: all 0.6s ease;
        }

.block-task {
  padding-left: 60px;

  .avatar {
    position: absolute;
    left: 10px;
    top: 10px;
  }
}

.task {
  background: #fff;
  color: #333;

  border-bottom: 1px solid #dfdfdf;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  > * {
    border-right: 1px solid #dfdfdf;
    padding: 10px;
  }
  .code {
    width: 80px;
    text-align: center;
  }
  .title {
    flex: 1;
    color: #000;
    text-shadow:1px 1px 1px #aaa;
  }

  .work {
    min-width: 80px;
    text-align: center;
  }

  .time {
    width: 80px;
    text-align: center;
  }

  .charger {
    width: 120px;
  }

  .result{
    text-align: center;
  }

  
}

.task-title {
  font-size:12px;
  > * {
    background: #333;
    height: 30px;
    padding: 5px;
    color: #ddd !important;
    border-color: #000;
    text-align: center;
  }
}

.block-dropdown {
  padding-right: 25px;
}

.block-button {
  display: flex;
  min-width: 60px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  i {
    font-size: 22px;
    margin-bottom: 3px;
  }
}

.block-dropdown:after {
  content: "\e614";
  font-family: "gzicon";
  position: absolute;
  right: 5px;
  top: calc(50% - 10px);
}

.block:hover {
  filter: brightness(1.2);
}

.attr-block {
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .lable {
  }
  .count {
    font-size: 12px;
  }
}

.block-actived {
  background: rgb(11, 209, 223);
  color: rgb(45, 45, 45);
}
.content {
  margin-left: 0;
  transition: margin-left 0.2s ease-in;
  position: relative;
  height:100%;
}

.content-on {
  margin-left: 255px;
  transition: margin-left 0.2s ease-in;
}

.workspace-wrap {
  height: 100%;
  position: relative;
  background:#444;
  .task-detail {
    background: #dfdfdf;
    overflow:hidden;
    height:100%;
    .task-detail-content{
      height:calc(100% - 90px);
      border-right:1px solid #000;
      overflow-y:auto;
    }
  }
  .workspace{
    background:#aaa;
    overflow:hidden;
     height:100%;
  }
}

.attr-block-dark{
  background:#333;
  color:#dfdfdf;
}
</style>