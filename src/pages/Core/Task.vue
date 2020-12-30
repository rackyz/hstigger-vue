<style lang="less" >
.block-input{
  border-right:1px solid #000;
  border-bottom:1px solid #000;
  position: relative;
  height:30px;
  input{
    border-radius: 0;
    background:#394865;
    border:none;
    width:100%;
     height:29px;
     color:#fff;
     
  }

  input:focus{
    filter:brightness(1.1);
    box-shadow: none;
  }
  .ivu-input-icon{
       line-height:30px;
     }
}
</style>
<template>
  <div class="page" style='position:relative;height:100%;'>
    <Drawer v-model='showSider' placement="left" :closable='false' :transfer="false" inner styles='background:#23334c;border-right:1px solid #000;border-top:1px solid #000'>
      <Input class='block-input' style='border:1px solid #000;height:32px;' placeholder="查询" />
    </Drawer>
    <div class="content" :class="{'content-on':showSider}">
       
      <div class="flex-wrap" style="justify-content:space-between;">
        <div class="block" style='width:60px;' @click='showSider=true'>
          <div class='label'>我的任务</div>
          <div class='count'>{{items.length}}</div>
        </div>
        <div class="block block-button">
          <Icon custom='gzicon gzi-backarrow' />
          上一级
        </div>
        <div class="block block-task" style="flex:1">
          <hs-avatar :userinfo='session' size='40' class='avatar' />
        <div class="flex-wrap" style='font-size:12px;'>
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
      <div class="flex-wrap" style="">
          <Input class='block-input' style='width:200px;' size='small' search clearable />
           <div class="block attr-block">
          <div class='label' style='flex:1;text-align:center;'>新增子任务</div>
        </div>
         <div class="block attr-block">
          <div class='label'>全部</div>
          <div class='count'>{{subs.length}}</div>
        </div>
         <div class="block attr-block">
          <div class='label'>进行中</div>
          <div class='count'>2</div>
        </div>
        <div class="block attr-block">
          <div class='label'>已完成</div>
          <div class='count'>1</div>
        </div>
        <div class="block attr-block">
          <div class='label'>已挂起</div>
          <div class='count'>1</div>
        </div>
        <div class="block attr-block" style="flex:1">
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
        工作量
        </div>
         <div class='time'>
        计划时间
        </div>
        <div class='charger'>
          负责人
        </div>
         <div class='result' style='width:80px;'>
          成果
        </div>
        <div class='result' style='width:80px;'>
          花费时间
        </div>
        </div>
      <template v-for='t in subs'>
      <div :key='t.id' class="task">
        <div class='code'>
        {{t.parent_id}}-{{t.id}}
        </div>
        <div class='title'>
        {{t.name}}
        </div>
        <div class='work'>
        30%
        </div>
         <div class='time'>
        3.5 h
        </div>
        <div class='flex-wrap charger'>
          <hs-avatar :userinfo='session' size='20' class='avatar' style='margin-right:5px;' /> {{session.name}}
        </div>
         
      </div>
      </template>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data(){
    return {
      showSider:false,
      items:[{
        id:1,
        name:"流程的问题"
      },{
        id:2,
        name:"考核数据问题处理"
      },{
        id:3,
        name:"考核数据提取"
      }],
      subs:[{
        id:4,
        name:"FORM提交数据的问题",
        parent_id:1
      },{
        id:5,
        name:"节点与状态",
        parent_id:1
      },{
        id:6,
        name:"流程图",
        parent_id:1
      },{
        id:7,
        name:"历史与结构",
        parent_id:1
      }]
    }
  },
  computed:{
    ...mapGetters('core',['session'])
  }
}
</script>
<style lang="less" scoped>

.action-button{
  width:220px;
  height:80px;
  background:linear-gradient(to bottom right,#aaa,#fff);
  transition: left 0.2s ease-in-out;
}

.block{
  padding:5px 10px;
  position: relative;
  color:#aaa;
  border-right:1px solid #000;
  height:60px;
  border-bottom:1px solid #000;
  background:#394865;
  cursor: pointer;
  min-width: 100px;
  margin:0;
  .label{
    font-size:12px;
  }

  .count{
    font-size:20px;
    text-align: center;
    color:#fff;
  }

  .attr{
    font-size:12px;
    color:#aaa;
    margin-right:15px;
    .value{
      color:#fff;
    }
  }

  .title{
    color:#fff;
    display: flex;
    align-items: center;
    height:30px;
  }
}

.block-task{
  padding-left:60px;

  .avatar{
    position: absolute;
    left:10px;
    top:10px;
  }
}



.task{
  background:#fff;
  color:#333;
  
  border-bottom:1px solid #dfdfdf;
  display: flex;
  justify-content: space-between;
  font-size:12px;
  >*{
    border-right:1px solid #dfdfdf;
    padding:10px;
  }
  .code{
    width:80px;
    text-align: center;
  }
  .title{
    flex:1;
    color:#000;
    font-weight: bold;
  }

  .work{
    min-width:80px;
    text-align: center;
  }

  .time{
    width:80px;
    text-align: center;
  }

  .charger{
    width:120px;
  }
}

.task-title{
  >*{
    background:#394865;
    height:30px;
    padding:5px;
    color:#ddd !important;
    border-color:#000;
    text-align: center;
  }
}

.block-dropdown{
  padding-right:25px;

}

.block-button{
  display: flex;
  min-width:60px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size:12px;
  i{
    font-size:22px;
    margin-bottom:3px;
  }
}

.block-dropdown:after{
  content:'\e614';
  font-family: 'gzicon';
  position: absolute;
  right:5px;
  top:calc(50% - 10px);
}

.block:hover{
  filter:brightness(1.2);
}

.attr-block{
  height:30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .lable{
  
  }
    .count{
    font-size:12px;
  }
}
.content{
  margin-left:0;
   transition: margin-left 0.2s ease-in;
}

.content-on{
  margin-left:255px;
  transition: margin-left 0.2s ease-in;
}

</style>