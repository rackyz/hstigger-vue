<style>
.gz-row {}
.gz-row-disabled .ivu-table-cell,
.gz-table .ivu-table-cell {
  padding: 0;
  width: 100%;
  height: auto;
}



.gz-row-disabled td {
  filter: grayscale(100%);
}


.contract-selector{
    position: absolute !important;
    right:-610px;
}

.g-modal-page .ivu-modal-body{
    padding:0;
    height:100%;
    overflow-y:auto;
    background:#eee;
}

.flex-right{
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.table .ivu-table-fixed-right{
  overflow: hidden;
}



.gz-table-col-fixed{
  background:#eee !important;
  border-color:#ddd !important;
  
}

th.gz-table-col-fixed{
    background:#ddd !important;
   border-color:#ccc !important;
}


.gz-row-expand-cover .ivu-table-cell-expand{
    visibility: hidden !important;
}
</style>
<template>
  
  <div class='gz-table l-table'>
    <slot>
    </slot>
    <Table
      ref="itable"
      :row-class-name="option.rowClassName || rowClassName"
      :stripe = "option.stripe || false"
      :height="tableHeight"
      size="small"
      stripe
      border
      :show-summary="option.summary"
      :sum-text="option.sumText || '合计'"
      :summary-method="Summarize"
      :columns="cols"
      @on-sort-change='handleSortChange'
      style='box-shadow:0px 1px 1px #aaa;'
      :data="tableData"
    ></Table>
    <div class='l-fixed-bottom'  id="pagenumber">
        <Page
          style='margin-right:0.5rem'
           show-total
          :total="total"
          :page-size="pageSize"
          size="small"
          :current="page"
          ec
          show-elevator
          :page-size-opts = "[10,20,30,50,100]"
          @on-change="handlePageChange"
          @on-page-size-change="pageSize=$event"
          show-sizer
        ></Page>
    </div>
  </div>
</template>

<script>
import tableRender from './render'
export default {
  data() {
    return {
        tableData:[],
        tableHeight:0,
        sort_order:'desc',
        sort_key:'inputTime',
        sort_lsit:[]
    }
  },
  props:{
      columns:{
        type:Object
      },
      page:{
        type:Number,
        default:1
      },
      pageSize:{
        type:Number,
        default:100
      },
      data:{
        type:Object,
        default:[]
      },
      option:{
        type:Object,
        default:{}
      },
      rowClassName:{
        type:Function
      },
      onEvent:{
        type:Function
      }
  },
  computed:{
    total(){
      return this.data.length
    },
      cols(){
            let userinfo = this.$store.getters["user/userinfo"]
            let users = this.$store.getters["kernel/users"]
            return tableRender.render(this.columns,this.onEvent,this.auth,{...this.attach,users,userinfo})
        },
        SummableColumns(){
          return this.columns.filter(v=>
            v.option && v.option.sumable
          )
        }
  },
  mounted(){
    this.calcTableHeight()
    addEventListener('resize',this.calcTableHeight)
  },
  beforeDestroy(){
    removeEventListener('resize',this.calcTableHeight)
  },
  watch:{
    sort_list:{
      handler(val){
        if(!val)
          return
         if(val.length > this.pageSize){
          this.tableData = this.getPageData(val ,this.page,this.pageSize)
        }else{
          this.tableData = this.data
        }
      },
      deep:true,
      immediate:true
    },
    data:{
      handler(val){
        this.sort()
        this.tableData = this.getPageData(this.sort_list,this.page,this.pageSize)
      },
      immediate:true,
      deep:true
    },
    page:{
      handler(val){
        let data = this.data
        if(this.sort_list)
          data = this.sort_list
        if(this.total > this.pageSize){
         this.tableData = this.getPageData(data,this.page,this.pageSize)
        }else{
          this.tableData = this.data
        }
      },
      immediate:true
    },
    pageSize:{
      
      handler(val){
        let data = this.data
        if(this.sort_list)
          data = this.sort_list
        if(this.total > val){
         this.tableData = this.getPageData(data,this.page,this.pageSize)
        }else{
          this.tableData = this.data
        }
      },
      immediate:true
    }
  },
  methods: {
    calcTableHeight(){
      let height = window.innerHeight - this.$el.getBoundingClientRect().top - 60
      if(this.option.summary){
        height -= 50
      }
       this.tableHeight = height
      // console.log(this.$el.getBoundingClientRect().top,this.tableHeight )
    },
    Summarize({columns,data}){
      const sum = {}
      const sumableColumns = this.SummableColumns

      if(!columns || columns.length ==0)
        return

      columns.forEach(c=>{
         sum[c.key] = {
              key:c.key,
              value:""
            }
      })
      sumableColumns.forEach(c=>{
            sum[c.key].value = 0
      })
      this.data.forEach(v=>{
        sumableColumns.forEach(c=>{
          sum[c.key].value += parseFloat(v[c.key] || 0)
        })
      })

      sumableColumns.forEach(c=>{
        if(sum[c.key] && c.option)
        {
            if(c.option.percentTo && sum[c.option.percentTo]){
             
              let percent = parseInt(sum[c.key].value / sum[c.option.percentTo].value * 100)
              sum[c.key].value = c.option.formatter(sum[c.key].value) + ` (${percent}%)`
            }
            
        }
      })

      sumableColumns.forEach(c=>{
        if(sum[c.key] && c.option && c.option.formatter)
        {
            if(!c.option.percentTo){
              sum[c.key].value = c.option.formatter(sum[c.key].value)
            }
            
        }
      })

      
      sum[columns[0].key].value="合计"
      return sum
    },
    /** 
     * @function     handleCurrentChange
     * @description  点击分页按钮
     * @type         callback
     * 
     */
    handlePageChange(val) {
       this.page = val
      
        this.$emit('page-change',val)
    },
    handlePageSizeChange(val){
      this.pageSize = val
    },
    getPageData(totalData,startPage=1,pageSize=15){
      let pageData = totalData.slice((startPage-1)*pageSize,startPage*pageSize)
      return pageData
    },
    /** 
     * @function    handleSortChange
     * @description 点击表单列标题排序
     * @type        callback
     * @param       e {
     *                  key:    列名      col.key
     *                  order:  排序方式  asc,desc
     *                }
     */
    handleSortChange(e) {
      let cur_sort = 'inputTime'
      let cur_sort_order = 'desc'
      if(e.order == 'normal'){
        cur_sort = "inputTime"
        cur_sort_order = "desc"
      }else{
          cur_sort = e.key
          cur_sort_order = e.order
      }

      this.sort_order = cur_sort_order
      this.sort_key = cur_sort

      this.sort()
      this.tableData = this.getPageData(this.sort_list,this.page,this.pageSize)
    },

    sort(){
      let temp = Object.assign([],this.data)
      let col = this.cols.find(v=>v.key == this.sort_key)
      if(!col || !col.sortMethod){
        this.sort_list = temp
        return
      }
      temp.sort(col.sortMethod(this.sort_order))
      console.log("sorted:",temp.map(v=>v[this.sort_key]))
      this.sort_list = temp
    },

    exportCsv(options) {
      this.$refs.itable.exportCsv(options)
    },
  }
};
</script>

<style scoped>
.l-fixed-bottom{
  position: relative;
  height:46px;
  width:100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;


}
.page-number{
  bottom:0.5rem;
}
.tools {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  justify-content: space-between;
}
.flex-wrapper {
  display: flex;
  align-items: center;
}

.flex-row {
  display: flex;
}

.flow {
  color: blue !important;
}

.flow:hover {
  cursor: pointer;
}

.flex-between {
  justify-content: space-between;
}

.gz-group-item {
  height: 2rem;
  cursor: pointer;
}

.gz-group-item:hover .group-name {
  font-weight: bold;
  transition: 0.5s;
  cursor: pointer;
}

.gz-group-item-selected {
  font-weight: bold;
  color: #333;
}

.gz-group-item-wran {
  color: red;
}

.gz-group-item-selected .badge-alone {
  background: orange !important;
}
.gz-view-body {
  padding: 0.5rem;
}

.handle-box {
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
</style>
