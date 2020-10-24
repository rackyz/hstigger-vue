<template>
  <div>
    <full-calendar
      :config="config"
      :events="events"
    ></full-calendar>
  </div>
</template>
<script>
import  FullCalendar  from 'vue-fullcalendar'
export default {
  components: { FullCalendar },
  data() {
      return {
        events: [{
          title: '[前期]办理土地计划书',  // 事件内容
          start: '2020-08-20 09:00:00', // 事件开始时间
          end: '2020-09-21 12:00:00',   // 事件结束时间
          color: 'rgba(9, 9, 9, 0.2)'       // 事件的显示颜色
        },{
          title: '[前期]办理土地计划书',  // 事件内容
          start: '2020-08-20 09:00:00', // 事件开始时间
          end: '2020-09-21 12:00:00',   // 事件结束时间
          color: 'rgba(9, 9, 9, 0.2)'       // 事件的显示颜色
        },{
          title: '[前期]办理土地计划书',  // 事件内容
          start: '2020-08-20 09:00:00', // 事件开始时间
          end: '2020-09-21 12:00:00',   // 事件结束时间
          color: 'rgba(9, 9, 9, 0.2)'       // 事件的显示颜色
        },{
          title: '[前期]办理土地计划书',  // 事件内容
          start: '2020-08-20 09:00:00', // 事件开始时间
          end: '2020-09-21 12:00:00',   // 事件结束时间
          color: 'rgba(9, 9, 9, 0.2)'       // 事件的显示颜色
        },{
          title: '[前期]办理土地计划书',  // 事件内容
          start: '2020-08-20 09:00:00', // 事件开始时间
          end: '2020-09-21 12:00:00',   // 事件结束时间
          color: 'rgba(9, 9, 9, 0.2)'       // 事件的显示颜色
        }],
        config: {
          buttonText: { today: "今天", month: "月", week: "周", day: "日" },
          locale: "zh-cn",
          editable: true, //是否允许修改事件
          selectable: true,
          eventLimit: 4, //事件个数
          allDaySlot: false, //是否显示allDay
          defaultView: "month", //显示默认视图
          eventClick: this.eventClick, //点击事件
          dayClick: this.dayClick, //点击日程表上面某一天
       }
     }
  },
  methods: {
     // 点击事件
     eventClick (event, jsEvent, pos) {
       console.log('eventClick', event, jsEvent, pos)
     },
     // 点击当天
     dayClick (day, jsEvent) {
        console.log('dayClick', day, jsEvent)
     }
  }
}
</script>