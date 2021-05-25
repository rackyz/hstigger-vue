<template>
   <div class="l-task-tmpl-item" :class="{'l-task-tmpl-item-unread':!data.readed_at}" :key="data.id" @click="RouteTo(`/core/notices/${data.id}/detail`,true)">
       
        <div class='l-desc'>  <Icon
            :type="data.readed_at?'md-mail-open':'md-mail'"
             :color="showMessageList?'yellowgreen':''"
            size="15"
          /> {{getType(data.msg_type).name}} | {{data.title}}
        </div>
        <div class='l-right'>
         {{smartTime(data.created_at)}}
        </div>
    </div>
</template>

<script>
export default {
  props:['data'],
  methods:{
    getType(e){
      let types = this.$store.getters["core/getTypes"]('MESSAGE_TYPE')
      let t = types.find(v=>v.value == e)
      return t || {}
    },
    onCreate(e){
      this.$emit('event','create')
    },
    smartTime(e){
      if(moment(e).isAfter(moment().subtract(7,'day'))){
        return moment(e).fromNow()
      }else{
        return moment(e).format('YYYY-MM-DD')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.l-task-tmpl-item{
  padding:5px 10px;
  margin:0 !important;
  width:100%;
  height:30px;
  display: flex;
   color:#aaa;
  border-bottom:1px solid #eee;
  flex-direction: row;
  justify-content: space-between;
 

  .l-desc{
    font-size:12px;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: bold;
    max-width: 300px;
    overflow: hidden;
  }

  .l-right{
    width:100px;
    font-size:12px;
    text-align: right;
  }
  
}

.l-task-tmpl-item:last-child{
  border-bottom:none;
}

.l-task-tmpl-item-unread{
  color:rgb(31, 147, 230);
  .l-desc{
    font-weight: normal;
  }
}

</style>