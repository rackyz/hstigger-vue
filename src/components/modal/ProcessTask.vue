<template>
  <Modal v-model='value' title="任务处理" @on-cancel="handleExit" footer-hide width="1200" styles="padding:20px;" draggable>
    <div style="padding:10px;">
      <div class="flex-wrap">
         <hs-toolbar
        style="width:auto;background: #fff;border:1px solid #dfdfdf;padding:5px 0px 10px 0px;"
        :data="tools"
        @event="onToolEvent"
        :disabled="toolDisabled"
      />
       <hs-toolbar
        style="width:auto;margin-left:10px;background: #fff;border:1px solid #dfdfdf;padding:5px 0px 10px 0px;"
        :data="edit_tools"
        @event="onToolEvent"
        :disabled="toolDisabled"
      />
      </div>
      <div style="margin-top:10px;padding:10px;border:1px solid #dfdfdf">
      <h2 style='font-size:18px;'>任务名称</h2>
      <p style='font-size:10px;color:#aaa;'>任务内容</p>
      </div>
       <Tabs type="card" style="margin-top:10px;" :animated="false">
        <TabPane label="进度拆分" icon="md-code" style="padding:20px;">

        </TabPane>
        
        <TabPane label="任务处理" icon="md-checkbox-outline" style="padding:20px;">
          任务视图1
        </TabPane>
    </Tabs>
   </div>
  </Modal>
</template>

<script>
export default {
  props:['value'],
  data(){
    return {
      	tools: [
			
				{
					key: "resetpwd",
					name: "完成",
					icon: "md-key",
				},
				{
					key: "resetpwdto",
					name: "中止",
					icon: "ios-key",
        }],
        edit_tools:[	{
					key: "add",
					name: "拆分",
					icon: "md-add",
				},
				{
					key: "edit",
					name: "编辑",
					icon: "md-create",
				},
				{
					key: "delete",
					name: "删除",
					icon: "md-trash",
        },],
        edit_tools:[	{
					key: "add",
					name: "拆分",
					icon: "md-add",
				},
				{
					key: "edit",
					name: "编辑",
					icon: "md-create",
				},
				{
					key: "delete",
					name: "删除",
					icon: "md-trash",
				},]
    }
  },
  methods:{
    handleExit(e){
      this.$emit('input',false)
    },
    onToolEvent(e) {

    },
  }
}
</script>

<style>

</style>