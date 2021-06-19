<template>
   <Modal v-model='value' icon="md-chatboxes" @on-cancel="handleExit" footer-hide width="1000" styles="padding:20px;padding-bottom:50px;">
     <div slot="header" style="padding:2.5px;"><Icon type="md-chatboxes" style="margin-right:2px;" /></Icon> {{data.title}}</div>

      <hs-markdown :data="data.content"></hs-markdown>
      <div class="flex-wrap flex-between" style="border-top:1px solid #ddd;padding:10px;">
        <div class="flex-wrap">
          <hs-avatar size="20" :userinfo="getUser(data.created_by)" style="margin-right:10px;" />
          {{getUser(data.created_by).name}}
        </div>
        <div class="flex-wrap flex-between" style="width:140px;font-size:10px;">
        <span>已读 {{data.readed_count}}</span>
          <span>回复 {{data.reply_count}}</span>
            <span>赞 {{data.good_count}}</span>
            </div>
      </div>
      <div  style="padding:10px;">
       回复:
       <hs-form :data="reply" :form="replyForm" @submit="handleReply" :editable="true" />
       
      </div>

      <div class="reply-wraps">
        <template v-for="(r,index) in data.replys">
          <div :key='r.id' class="reply flex-wrap" style="width:100%;padding:10px;border:1px solid #eee;">
            <div class='reply-user' style="width:80px;padding:10px;align-items:flex-start;">
              <hs-avatar :userinfo="getUser(r.created_by)" size="40" />
              <div style="text-align:center;width:40px;margin-top:10px;">
                {{getUser(r.created_by).name}} 
              
              </div>
            </div>
            <div class="reply-content" style="width:calc(100% - 80px);font-size:10px;">
               <hs-markdown  :data="r.content" style="background:#eee;"></hs-markdown>
                <div class="flex-wrap flex-between" style="padding:5px;background:#fff;">
                  <span>{{moment(r.created_at).fromNow()}}</span>
                  <div class="flex-wrap">
         <span>赞 {{r.good_count || 0}}</span>
         <a style="color:red;margin-left:10px;" v-if="r.created_by == uid" @click="handleRemoveReply(r.id,index)">删除</a>
         </div>
      </div>
                   
            </div>
          </div>
        </template>
      </div>
   </Modal>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props:['value','data'],
  data(){
    return {
      reply:{}
    }
  },
  methods:{
    handleReply(e){
      if(e.content.trim() == ""){
        this.Error("请输入内容进行回复")
        return
      }
      e.topic_id = this.data.id
      this.api.enterprise.ADDRELATED_TOPICS(e,{param:{id:this.data.id,related:'replys'}}).then(res=>{
        let item = Object.assign({},e,res.data.data || {})
       // this.$set(this.data,'reply_count',this.item.reply_count+1)
        this.data.replys.splice(0,0,item)
        this.reply = {}
      })
    },
     handleExit(e){
      this.$emit('input',false)
    },
    handleRemoveReply(e,i){
      this.Confirm("删除确认",_=>{
        this.api.enterprise.DELRELATED_TOPICS(e,{param:{id:this.data.id,related:'replys',relatedId:e}}).then(res=>{
          this.Success("删除成功")
          this.data.replys.splice(i,1,0)

        }).catch(e=>{
           this.Error("删除失败")
        })
      })
    }
  },
  computed:{
    ...mapGetters('core',['getUser','uid']),
    replyForm(){
      return {
        def:{
          content:{
            control:"input",
            option:{
              type:"md",
              height:200
            }
          }
        },
        layout:"{{content}}",
        option:{
          hideReset:true,
          hideCancel:true
        }
      }
    }
  }
}
</script>

<style>

</style>