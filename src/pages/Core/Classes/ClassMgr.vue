<template>
  <div class="hs-container" style="padding:50px 80px;background:#fff;position:relative;height:100%;overflow:hidden;">
   <div class="l-panel" style="height:100%;overflow-y:auto;padding:20px;padding-top:10px; ">
        <h3 style="color:#346;font-weight:bold;margin-bottom:10px;">课程管理</h3>
        
        <hs-toolbar :data="tools" style="border:none;margin-top:10px;margin-bottom:10px;border-radius:5px;background:#eee;border:1px solid #ddd;color:#346;" @event="handleToolEvent" :disabled="disabled" />
        <div style="height:calc(100% - 120px);position:relative">
          <hs-list style="background:#eee;height:100%;" :data="items" :option="{tmpl:'HsxClassPlan'}" @event="handleListEvent" />
        </div>
       
      </div>
      
      
     <hs-modal-form v-model="showModalCreate" :title="!model.id?'创建课程计划':'修改课程计划'" :form="Form('classplan')" :data="model" @on-submit="handleSubmit" width="600" />

     <Modal hide-footer title="上传视频" v-model="showFileUploaderModal">
       {{complete}} %
     </Modal>
  </div>
</template>

<script>

const SetTrainingStateFromDuratin = (item={})=>{
  let now = moment()
  if(item.started_at){
    if (now.isAfter(moment(item.started_at))) {
      if(item.duration){
        item.finished_at = moment().add('hours',item.duration).format()
      }
      if(item.finished_at){
        if (now.isAfter(moment(item.finished_at))){
          item.stateText = '已结束'
          item.stateColor = 'red'
          return
        }  
      }
      item.stateText = '疯狂进行中'
      item.stateColor = 'orange'
      
    }else{
      item.stateText = '积极筹备中'
      item.stateColor = 'green'
    }
  }else{
    item.stateText = '讲师未到'
    item.stateColor = '#333'
  }

  return item

}


export default {
  data(){
    return {
      showModalCreate:false,
      selected:{},
      model:{},
      items:[],
      columns:[{
        title:"序号",
        type:"index",
        width:80
      },{
        key:'name',
        title:"姓名",
        minWidth:200
      },{
         key:'name',
        title:"考核结果",
        minWidth:200
      },
      {
         key:'name',
        title:"考核备注",
        minWidth:200
      },{
         key:"name",
         title:"提交时间"
      },{
         key:"name",
         title:"操作",
         sortable:false
      }],
      	tools: [
          
			
				{
					key: "add",
					name: "新增",
					icon: "md-add",
        },
        	{
					key: 'config',
					name: "配置",
					icon: "md-create",
				},
				{
					key: "delete",
					name: "移除",
					icon: "md-remove",
				},{
          key:"upload",
          name:"上传视频",
          icon:"md-videocam"
        }],
        showFileUploaderModal:false,
        complete:0
    }
  },
metaInfo:{
   title:"培训课程", 
    route:'/:id'
  },
  computed:{
    id(){
      return this.$route.params.id
    },
    disabled(){
      return {
        config:!this.selected.id,
        delete:!this.selected.id,
        upload:!this.selected.id,
      }
    }
  },
  mounted(){
    this.getData()
  },
  methods:{
    getData(){
      this.api.enterprise.RELATED_TRAININGS({param:{id:this.id,related:'plans'}}).then(res=>{
        let items = res.data.data
        items = items.sort((a,b)=>!a.started_at || (b.started_at && moment(a.started_at)).isBefore(moment(b.started_at))?-1:1)
        items.forEach((v,i,a)=>{
          
         a[i] = SetTrainingStateFromDuratin(v)
         v.index = i+1
        })
        
        this.items = items
      })
    },
    handleSubmit(e){
      if(e.id){
        this.api.enterprise.PATCHRELATED_TRAININGS(e,{param:{id:this.id,related:'plans',relatedId:e.id}}).then(res=>{
      
        this.Success("修改成功")
        this.getData()
        this.showModalCreate = false
        this.model = {}
      }).catch(e=>{
        this.Error('错误:'+e)
      })
      }else{
        this.api.enterprise.ADDRELATED_TRAININGS(e,{param:{id:this.id,related:'plans'}}).then(res=>{
        let item = res.data.data
        item = Object.assign({},e,item)
        this.items.push(item)
        let items = this.items
        items =  items.sort((a,b)=>!a.started_at || (b.started_at && moment(a.started_at)).isBefore(moment(b.started_at))?1:-1)
        items.forEach((v,i)=>v.index = i+1)
       
        this.items = items
        this.Success("添加成功")
        this.showModalCreate = false
        this.model = {}
      }).catch(e=>{
        this.Error('错误:'+e)
      })
      }
      
    },
    handleToolEvent(e){
      if(e == 'add'){
        this.model = {}
        this.showModalCreate = true
      }else if(e == 'delete'){
        this.handleDelete(this.selected)
        
      }else if(e == 'config'){
        this.model = this.selected
        this.showModalCreate = true
      }else if(e == 'upload'){
        this.handleUploadVideo(e)
      }
    },
    	onUploadProgressList(progressEvent,index) {
            
            var complete = ((progressEvent.loaded / progressEvent.total) * 100) | 0;
            
            this.$set(this.files[this.baseIndex+index],'percent',complete + "%");
            
        },
    handleUploadVideo(e){
     
        var inputObj=document.createElement('input')
        inputObj.setAttribute('id','file');
        inputObj.setAttribute('type','file');
        inputObj.setAttribute('name','file');
        inputObj.setAttribute("style",'visibility:hidden');
        document.body.appendChild(inputObj);
        inputObj.value;
        inputObj.click();
    	let files = inputObj.files;
            if (!files) return;
              this.baseIndex = this.files.length
			let fileObjects = Object.values(files).map((f) => ({
				name: f.name,
				size: f.size,
                ext: that.getFileExt(f.name),
                url:this.getObjectURL(f),
                loading:true,
				vdisk: this.option.vdisk || "ref",
            }));
            this.files = this.files.concat(fileObjects)
            this.showFileUploaderModal = true
            this.complete = 0
    this.$store.dispatch('file/upload',{files:Object.values(files),onProgress:this.onUploadProgressList}).then(res=>{
						if(!Array.isArray(res))
							throw("文件上传失败")
						files.forEach((v,i)=>{
							fileObjects[i].url = res[i].url
						})
						let values = this.files.map((v, i) => [v.name,v.url,v.ext]).join(';');
						this.$emit("change", values);
					})

        // var formdata = new FormData($("#file")[0]);
        // $.ajax({
        //     url:"http://localhost:8080/file/upload.action",
        //     type:"POST",
        //     data:formdata,
        //     enctype:"multipart/form-data",
        //     contentType:false,
        //     processData:false,
        //     success:function (data) {
        //         console.log(data)
        //     }
        // })
    
    },
    handleListEvent(e = {}){
     if(e.type == 'select'){
       
       this.selected = this.items.find(v=>v.id == e.param) || {}
     }
    },
    handleDelete(e){
      if(!e.id)
        this.Error("该计划无法删除")
      var that = this
      this.Confirm('确认删除该课程计划',_=>{
        this.api.enterprise.DELRELATED_TRAININGS({param:{id:that.id,relatedId:e.id,related:'plans'}}).then(res=>{
          this.Success("删除成功")
          this.getData()
        }).catch(e=>{
          this.Error("错误:"+e)
        })
      })
    }
  }
}
</script>

<style lang="less">
.l-caption{
  font-weight: bold;
}
.l-panel{
  margin-bottom:10px;background:#fff;color:#aaa;border:none;padding:15px;padding-top:0;height:200px;font-size:12px;
}

.number-panel{
  width:120px;
  height:70px;
  border:1px solid #eee;
  display:flex;
  justify-content: center;
  flex-direction: column;
  padding:10px 0;
  align-items: center;
}
</style>