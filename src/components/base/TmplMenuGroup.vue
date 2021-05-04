<style lang="less">
.l-app-group-list{
      .ivu-checkbox{
        .ivu-checkbox-inner{
          background:#fff;
        }
      }

      .ivu-checkbox-checked{
        .ivu-checkbox-inner{
               background:#2d8cf0;
        }
     
      }

      .ivu-checkbox-wrapper-disabled{
        color:#888;
        
      }

      
      .ivu-checkbox-disabled{
          .ivu-checkbox-inner{
            background:#333 !important;
          }
        }
}
</style>
<template>
  <transition name='fade' mode='out-in' appear>
   <div class="l-app-group" :key='data.name' v-show='items && items.length'>
      <div class="l-app-group-title">
        <Icon :custom="`gzicon gzi-${data.icon}`" style='color:#39f;'></Icon>{{data.name}}
      </div>
      <div class="l-app-group-list">
        <template v-for="app in items">
          <template v-if='!editable'>
              <span class='text-btn' :class="{'text-btn-disabled':app.dev}" :key='app.key' @click="RouteTo(app.dev?'':app.path);$emit('on-event','open')">{{app.name}}<span class='l-version' :class="{'l-version-dev':app.dev}" :style="`color:${app.state==0?'#555':(app.state==1?'orange':'')}`">{{app.state==0?'研发':(app.state==1?'测试':app.version)}}</span></span>
          </template>
          <template v-else>
              <Checkbox :key='app.key' class='l-app-check' :disabled='app.dev || !checked[app.key] && checked_count>=10' :value="checked[app.key]" @on-change='onChangeAcc(app.key,$event)'>{{app.name}}</Checkbox>
          </template>
        </template>   
      </div>
   
  </div>
   </transition>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  props:{
    data:{
      type:Object,
      default:()=>{}
    },
    filter:{
      type:String,
      default:""
    },
    editable:{
      type:Boolean,
      default:false
    },
    checked:{
      type:Object,
      default:()=>{}
    }
  },
  computed:{
    ...mapGetters('core',['apps']),
    items(){
      if(this.data && Array.isArray(this.data.subs))
        return this.data.subs.map(v=>this.apps[v]).filter(v=>v && (!this.filter || v.name.includes(this.filter)))
      return []
    },
    checked_count(){
      return Object.keys(this.checked).length
    }
  },
  methods:{
    onChangeAcc(key,selected){
      console.log('tmpl-check-change',key,selected)
      this.$emit('on-event',{
        type:selected?'select':'un-select',
        key
      })
    }
  }
}
</script>
<style lang="less" scoped>

  .l-app-group{
    color:#aaa;
    .l-app-group-title{
      font-weight: bold;
      color:#aaa;
      font-size:13px;
      margin:10px 0;
      display: flex;
      align-items: center;
      text-shadow: 1px 1px 1px #000;
      i{
        font-size:18px;
        margin-right:10px;
      }
    }
    .l-app-group-list{
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      font-size:13px;
      padding-left:0px;
      color:#ddd;
      a{
        font-size:13px;
      }
       .l-app-check{
         height:25px;
        font-size:12px;
        
      }

        
    }

    .l-version{
      color:rgb(42, 217, 236);
      font-size:10px;
      font-family:'黑体';
      margin-left:5px;
    }

    .l-version-dev{
      color:#666;
      font-family: '黑体';
      font-size:8px;
    }
  }

  @media screen and (max-width:768px){
    .l-app-group-title{
    margin:5px;
  }
  .l-app-group-list{
    padding-left:20px;
  }
  }
</style>