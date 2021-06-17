<template>
  <div class="hs-container" style="position:relative;height:100%;overflow-y:auto;padding:10px;">
    <div class="l-filter" style="padding:0 10px;">
      <Input search style="width:250px" />
      <Button icon="md-add" style="margin-left:10px" @click="handleCreate">新建培训项目</Button>
      <ButtonGroup style="margin-left:10px;">
        <Button :type="filterIndex==-1?'primary':''" @click="filterIndex=-1">全部 {{filterCount(-1)}}</Button>
          <Button :type="filterIndex==0?'primary':''" @click="filterIndex=0">准备中 {{filterCount(0)}}</Button>
         <Button :type="filterIndex==1?'primary':''" @click="filterIndex=1">进行中 {{filterCount(1)}}</Button>
         <Button :type="filterIndex==2?'primary':''" @click="filterIndex=2">已结束 {{filterCount(2)}}</Button>
      </ButtonGroup>
    </div>
    <hs-list :data="filteredItems.slice(0,12)" :option="{tmpl:'HsxClassAdmin'}" style="border:none;background:none;height:calc(100% - 100px);overflow:hidden;overflow-y:auto;" @event="handleEvent" />
     <div class="flex-wrap" style="justify-content:center;width:100%;margin-top:20px;">
        <Page  :total="total" :page-size="12" show-total @change="getData"/>
        </div>

    <hs-modal-form v-model="modalCreate" :title="model.id?'编辑项目':'创建项目'" :form="Form('class')" :data="model" @on-submit="handleSubmit" width="600" />
  </div>
</template>

<script>
export default {
  data(){
    return {
      model:{},
      modalCreate:false,
      filterIndex:-1,
      items:[]
    }
  },
  computed:{
    filteredItems(){
      if(this.filterIndex == -1)
        return this.items
      else
        return this.items.filter(v=>v.state == this.filterIndex)
    }
  },
  mounted(){
    this.getData()
  },
  methods:{
     getData(){
      this.api.enterprise.LIST_TRAININGS().then(res=>{
        let items = res.data.data
        this.items = items
      })
    },
    filterCount(e){
      if(e == -1)
        return this.items.length
      else
        return this.items.filter(v=>v.state == e).length
    },
    handleCreate(){
      this.modalCreate = true
      
    },
    handleEvent(e){
      console.log(e)
      if(e.event == 'delete'){
        this.handleDelete(e.param.id)
      }else if(e.event == 'edit'){
        this.handleEdit(e.param)
      }
    },
    handleEdit(e){
      this.model = e
      this.modalCreate = true
    },
    handleSubmit(e){
      if(!this.model.id) {
        this.api.enterprise.POST_TRAININGS(e).then(res=>{
          let updateInfo = res.data.data || {}
          let item = Object.assign({},e,updateInfo)
          this.items.push(item)
           this.Success("创建完成")
          this.modalCreate = false
          this.model = {}
        }).catch(e=>{
          this.Error('创建失败'+e)
        })
      }else{
         this.api.enterprise.PATCH_TRAININGS(e,{param:{id:this.model.id}}).then(res=>{
          let item = Object.assign({},this.model,e)
          this.Success("修改成功")
          let index = this.items.findIndex(v=>v.id == this.model.id)
          this.items.splice(index,1,item)
          this.modalCreate = false
          this.model = {}
        }).catch(e=>{
          this.Error('修改失败')
        })
      }
     
    },
    handleDelete(id){
      this.Confirm("确定删除该培训项目(所有相关资料均会被删除)?",
        e=>{
          this.api.enterprise.DELETE_TRAININGS({param:{id}}).then(res=>{
            this.Success('删除成功')
            this.getData()
          })
        }
      )
     
    }
  }
}
</script>

<style>

</style>