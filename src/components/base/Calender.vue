<template>
  <div class='hs-container' style='padding-top:5px;'>
      <div class='l-active'>
         <div class="l-week">
            <div class='l-week-item-wrap' style='width:30px'></div>
           <template v-for="(d,di) in weeknames">
             <div class='l-week-item-wrap' :style='`color:${di>4?"red":""}`' style='margin-right:3px;width:30px;' :key='d'>
               {{d}}
             </div>
           </template>
          </div>
        <template v-for="w in weeks">
          
          <div class="l-week" :key='w.id'>
            <div class='l-week-item-wrap ' style='overflow:visible;'>{{w.isFirst?monthnames[w.month]:""}}</div>
            <template v-for="d in w.days">
            <Tooltip placement='top' class="l-week-item-wrap l-day" :key='d.date' :content="`${d.date},有${d.count}个活动`">
            <div class="l-week-item" :style="`background:${mapActiveColor(d.count,!d.isPast)}`">

            </div>
            
            </Tooltip>
            </template>
             <div class='l-week-item-wrap' style='color:#aaa;'>{{w.id}}</div>
          </div>
        </template>
      
      </div>
        <div class="flex-wrap flex-between">
          <div class='flex-wrap'><span style='margin-right:3px'>活动</span>
            <template v-for='g in gradients'>
              <div class='l-week-item-wrap l-day' style='margin-left:2px;' :key='g' :style="`background:${g};`"></div>
            </template></div>
           <div class='flex-wrap'> <template v-for='g in gradients2'>
              <div class='l-week-item-wrap l-day' style='margin-left:2px;' :key='g' :style="`background:${g};`"></div>
            </template><span style='margin-left:3px'>计划</span></div>
        </div>
  </div>
</template>

<script>
const moment = require('moment')
export default {
  data(){
    return {
      date:[0,1,23,4,5,6],
      weeknames:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
      monthnames:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      gradients:['#dff9ba','#cbfa89','#b6fa57','#7ccb1e'],
      gradients2:['#f7f5c8','#fae04f','#faa12e','#cb471e'],
    }
  },
  computed:{
    activities(){
      return this.$store.getters['core/my_activities'] || []
    },
    weeks(){
      let offset = 11
      let mom = moment()
      let weeks = []
      let alldays = []
      for(let i=-offset;i<=offset;i++){
        let m = mom.clone().startOf('week').add('week',i)
        let offday = moment.duration(m - m.clone().startOf('month')).as('days')
        let w = {
          id:m.week(),
          date:m.format('YYYYMMDD'),
          month:m.month(),
          off:offday,
          isFirst:offday >= 0 && offday < 7,
        }
        
        let days = []
        for(let i=0;i<7;i++){
          let d = m.clone().add('day',i)
          let day = {
            date:d.format('YYYYMMDD'),
            day:d.day(),
            month:d.month(),
            isPast:d.isBefore(mom.clone().startOf('day')),
            year:d.year(),
            count:0
          }
          day.count = 0
          days.push(day)
          alldays.push(day)
        }
        w.days = days
        
        this.activities.forEach(v=>{
          if(v.started_at){
            let started_at = moment(v.started_at)
            let finished_at = moment(v.started_at).clone().add('day',1)
            if(v.finished_at){
              finished_at = moment(v.finished_at)
            }
            alldays.forEach(d=>{
              if(moment(d.date,'YYYYMMDD').isBetween(started_at,finished_at))
                d.count++
            })
          }
        })

        weeks.push(w)
      }

      return weeks
    }
   
    
  },
  methods:{
    mapActiveColor(c = 0,isPlan){
      if(c == 0)
        return isPlan?'#fff':'#eee'

      let g = this.gradients
      if(isPlan)
        g = this.gradients2
       
      if(c > 0)
        return g[0]
      else if(c > 5)
        return g[1]
      else if(c > 20)
        return g[2]
      else if(c > 50)
        return g[3]
      
    }
  }
}
</script>
<style lang="less" scoped>
.hs-container{
  padding:10px;
}
.l-active{
  display: flex;
}
.l-week{
  display: flex;
  flex-direction: column;
  margin-right:1px;
 
}

 .l-week-item-wrap{
    width:15px;
    height:15px;
    margin:1px;
    border-radius: 2px;
   
    overflow: hidden;
    font-size:10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family:'Courier New', Courier, monospace
  }
  .l-day{
     border:1px solid #ddd;
  }
  .l-week-item{
     width:15px;
    height:15px;
    background:#eee;

    
  }
</style>