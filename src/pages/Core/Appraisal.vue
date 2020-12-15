<template>
  <div class='hs-container-full' style='height:100%;'>
      <!-- <div class="hs-left">
         <div class='caption'>2020年年终考核情况汇总统计</div>
         <div class='dep'>
            所有员工 <span class='count'>123/321</span>
          </div>
          <div class='dep'>
            建设管理事业部 <span class='count'>123/321</span>
          </div>
           <div class='dep'>
            市政监理事业部 <span class='count'>123/1234</span>
          </div>
           <div class='dep'>
            房建监理事业部 <span class='count'>123/123</span>
          </div>
           <div class='dep'>
            装修事业部 <span class='count'>123/231</span>
          </div>
      </div> -->
      <div class='hs-content'>
        <!-- filters -->
		<div class="filter-wrap" style="padding: 5px" @click="selected = null">
			<ButtonGroup style="margin-right: 5px" v-show="multiple"
				><Button @click="onSelectAll">全选</Button
				><Button @click="selected = []">清空</Button></ButtonGroup
			>
			<Button
				style="margin-right: 5px"
				type="error"
				v-show="multiple"
				@click="multiple = false"
				>结束批量操作</Button
			>
      <Button
				style="margin-right: 5px"
				type="error"
				:loading="loading"
				@click="getData()"
				>刷新 {{loading}}</Button>
			<Input v-model="searchText" search style="width: 200px" clearable />
		
		</div>
    <!-- table -->
		<div
			style="
				height: calc(100% - 90px);
				overflow: hidden;
				background: #ddd;
				position: relative;
			"
		>
			<hs-table
        ref='table'
				style="height:100%;width:100%;"
				:columns="columns"
				:data="filterdData"
				:paged="false"
        	:loading="loading"
				selectable="single"
				:selection="selected"
				full
				@event="onTableEvent"
			>
			</hs-table>
    
		</div>
		
    <!-- paging -->
		<div
			style="
				height: 50px;
				background: #fff;
				display: flex;
				justify-content: center;
				border-top: 1px solid #dfdfdf;
				align-items: center;
			"
		>
			<Page
				:total="filterdData.length"
				size="small"
				:page-size="100"
				:page-size-opts="[20, 50, 100]"
				show-elevator
				show-sizer
				show-total
			/>
		</div>

	
      </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed:{
    filterdData(){
      return this.items.filter(v=>{
        return true
      })
    }
  },
  mounted(){
    this.getData()
  },
  data(){
    return {
      items:[],
      loading:false,
      	columns: [
        { type: "index", title: "序号" },
        
			 { type: "text", key: "name", width:200,title: "姓名",option:{align:"center"}},
            { type: "state", key: "dep", width:120,title: "部门",option:{align:"center"},	option: {states: ['行政综合','房建监理事业部','市政监理事业部','建设管理事业部','装修管理事业部', '造价咨询事业部', 'BIM咨询']}},
           { type: "state", key: "position", width:120,title: "职务",option:{align:"center"},	option: { 
             states: ['项目经理/部门经理/总监(含副职)', '项目/部门经理助理/总代', '工程师级','助理级/员级']},},
              { type: "text", key: "rank", width:120,title: "职称",option:{align:"center"}},
               { type: "text", key: "project", width:200,title: "所在项目",option:{align:"center"}},
               {type:'datetime',key:'hire_date',width:120},
                 { type: "text", key: "cerificate", width:200,title: "岗位证书",option:{align:"center"}},
                  { type: "text", key: "education", width:200,title: "学历",option:{align:"center"}},
                { type: "text", key: "report", width:100,title: "述职报告",option:{}},
					{ type: "text", key: "desc",minWidth:300,  title: "评语", },
        
							 { type: "type", key: "state", width:100,title: "状态",option:{align:"center"},	option: { getters:'core/getTypes',getters_key:"FLOW_STATE",
							labelKey:"value"},},
          
        
			],
    }
  },
  methods:{
    getData(){
      this.loading = true
      this.ENT.LIST_CHECKREPORTS().then(res=>{
        this.items = res.data.data
        
      }).catch(e=>{
        this.Error(e)
      }).finally(e=>{
        setTimeout(()=>{
          this.loading =false
        },1000)
        
      })
    }
  }
}
</script>

<style lang="less" scoped>
.hs-left{
  width:300px;
  position: absolute;
  left:0;
  top:0;
  bottom:0;
  background:#082c49;
}
.caption{
  background:rgb(7, 86, 104);
  padding:10px 20px;
  color:#fff;
  text-align: center;
  filter:drop-shadow(1px 1px 2px #333);
}
.dep{
  height:60px;
  color:#fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width:100%;
  border-bottom:1px solid rgb(4, 131, 145);
  padding:20px;

  .count{
    color:yellowgreen;
    font-size:12px;
  }
}

.dep:hover{
  background:rgb(2, 161, 164);
  cursor: pointer;
}

.hs-content{
  position: absolute;
  left:0;;
  right:0;
  bottom:0;
  top:0;
}
</style>