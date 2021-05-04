<template>
  <div ref="gantt" style="min-height:600px;padding:0;"></div>
</template>

<script>
import {gantt} from 'dhtmlx-gantt'
import "dhtmlx-gantt/codebase/dhtmlxgantt.css"
export default {
  name:"gantt",
  data(){
    return {
      formattedTasks:[]
    }
  },
  props:{
    tasks:{
      type:Object,
      default(){
        return {
          data:[],links:[]
        }
      }
    },
    enable_percent:{
      type:Boolean,
      default:false
    }
  },
  watch:{
    tasks:{
      handler(v){
         this.refresh()
      },
      deep:true,
      immediate:true
    },
    enable_percent:{
       handler(v){
        this.refresh()
       
      },
      deep:true,
      immediate:true
    }
  },
  computed:{
    columns(){
      let cols =  [
        {name:"name",width:'*',align:'left',resize:true,label:'任务名称'},
        {name:"charger",width:100,align:'left',label:'负责人'},
        {name:"percent",width:100,align:'center',label:'工作量'}
      ]
     

      return this.enable_percent?cols:cols.slice(0,2)
    }
  },
  mounted(){
    
  
    this.init()
    
  },
  methods:{
    init(){
      gantt.i18n.setLocale("cn")
        gantt.init(this.$refs.gantt)
        this.refresh()
    },
    refresh(){
      gantt.clearAll();
      this.$nextTick(()=>{
         gantt.config.xml_date = "%Y-%m-%d"
       gantt.config.columns = this.columns
        gantt.config.scale_unit ="day"
        gantt.config.date_scale ="%d号, 星期%D";
        gantt.config.min_column_width = 60;
        gantt.config.duration_unit ="day";
        gantt.config.scale_height = 20 * 3;
        gantt.config.row_height = 28;

        var weekScaleTemplate = function(date){
            var dateToStr = gantt.date.date_to_str("%M%d日");
            var weekNum = gantt.date.date_to_str("(第%W周)");
            var endDate = gantt.date.add(gantt.date.add(date,1,"week"), - 1,"day");
            return dateToStr(date)+" - "+ dateToStr(endDate)+""+ weekNum(date);
        };

        gantt.config.subscales = [{
            unit:"month",
            step:1,
            date:"%Y,%F"
        },{
            unit:"week",
            step:1,
            template:weekScaleTemplate
        }];
      
      gantt.parse(this.formattedTasks)
      })
     
      this.formattedTasks = {
        data:this.tasks.map((v,i)=>{
        return {
            id:i+1,
            name:v.name,
            start_date:v.end_date ? v.end_date : (v.start_date || moment().format("DD-MM-YYYY")),
            duration:v.plan_duration || 1,
            progress:v.state>1?1:0
          }
          }),
          links:[]
        }

    }
  }
}
</script>

<style>

</style>