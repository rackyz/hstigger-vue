<template>
  <div class='hs-container-full' style='height:100%;'>
      <div class="hs-left">
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
      </div>
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
			<Input v-model="searchText" search style="width: 200px" clearable />
		
		</div>
    <!-- table -->
		<div
			style="
				height: calc(100% - 160px);
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
      return []
    }
  },
  data(){
    return {
      	columns: [
        { type: "index", title: "序号" },
        	 { type: "type", key: "flow_type", width:200,title: "事业部",option:{align:"center"},	option: { getters:'core/getTypes',getters_key:"FLOW_TYPE",
							labelKey:"value"},},
				{ type: "text", key: "name",minWidth: 150, title: "姓名", render:(h,param)=>{
					
							return h("div",{class:"flex-wrap",style:{marginLeft:"10px;"}},[h("Icon",{props:{custom:`gzicon gzi-${param.row.icon}`,size:20}}),h("span",{style:{marginLeft:"5px",fontSize:"12px"}},param.row.name)])
						
						
          }},
           { type: "type", key: "flow_type", width:100,title: "岗位",option:{align:"center"},	option: { getters:'core/getTypes',getters_key:"FLOW_TYPE",
              labelKey:"value"},},
                { type: "type", key: "flow_type", width:100,title: "综合得分",option:{align:"center"},	option: { getters:'core/getTypes',getters_key:"FLOW_TYPE",
							labelKey:"value"},},
					{ type: "text", key: "desc",minWidth:300,  title: "评语", },
        
							 { type: "type", key: "state", width:100,title: "状态",option:{align:"center"},	option: { getters:'core/getTypes',getters_key:"FLOW_STATE",
							labelKey:"value"},},
          
        
			],
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
  left:300px;
  right:0;
  bottom:0;
  top:0;
}
</style>