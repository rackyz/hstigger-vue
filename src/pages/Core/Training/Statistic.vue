<style lang="less">
.l-block-card{
  width:100px;
  height:50px;
  display:flex;
  align-items: center;
  justify-content: center;
  background:#fff;
  color:#333;
  cursor:pointer;
}

.l-block-card:hover{
  transition: all 0.3s;
  background:#ffa;
  
}

.l-block-card-active{
  background:#346;
  color:#fff;
}

.l-block-card-active:hover{
  background:#346;
}
</style>
<template>
  <Layout>
    <Sider width="900" style="background:#fff;position:relative;height:calc(100% - 40px);overflow:hidden;border-right:1px solid #ddd;">
      <div class="flex-wrap flex-between" style="padding:10px;">
        <div class="flex-wrap">
        <Input style="width:200px" search placeholder="搜索" />
        <Select style="margin-left:10px;width:200px;"></Select>
         <Select style="margin-left:10px;width:200px;"></Select>
         <Button style="margin-left:10px;">清除</Button>
        </div>
        <Button>导出EXCEL</Button>

      </div>
      <div style="height:(100% - 300px);position:relative;overflow:hidden;">
      <hs-table :data="trainingEmployees" :columns="cols" :page-size="1000"></hs-table>
      </div>
    </Sider>
      <Content>
          <div class="flex-wrap"  style="border-bottom:1px solid #dfdfdf;background:white;">
            <div class="l-block-card l-block-card-active">
              培训
            </div>
            <div class="l-block-card">
              作业
            </div>
          </div>
      </Content>
      
  </Layout>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed:{
    ...mapGetters('core',['employees','uid']),
    cols(){
      return [{
          type:'index',
          title:"序号",
          width:40,
      },{
        type:'user',
        key:'id',
        title:"姓名",
        width:100,
        option:{
          getters:"core/users"
        }
      },{
        title:'事业部',
        type:'text',
        key:'raw_dep',
        minWidth:100,
        option:{
          align:"center"
        }
      },{
        title:'部门/项目',
        type:'text',
        key:'raw_project',
        width:100,
        option:{
          align:"center"
        }
      },{
        title:'直属领导',
        type:'text',
        key:'raw_leader',
        width:100,
        option:{
          align:"center"
        }
      },{
        title:'参加培训',
        type:'text',
        key:'raw_leader',
        width:100,
        option:{
          align:"center"
        }
      },{
        title:'作业提交',
        type:'text',
        key:'raw_leader',
        width:100,
        option:{
          align:"center"
        }
      },{
        title:'考核评分',
        type:'text',
        key:'raw_leader',
        width:100,
        option:{
          align:"center"
        }
      }]
    },
    trainingEmployees(){
      return this.employees
    }
  }
}
</script>

<style>

</style>