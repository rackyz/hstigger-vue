<template>
  <div style='position:relative;'>
    <template v-if='!id || !items || items.length == 0 || error' >
      {{error || "没有内容"}}
    </template>
    <template v-else>
      <Carousel autoplay v-model="value2" loop style='width:100%;'  autoplay-speed='10000' height='130' >
        <template v-for='d in items'>
          <CarouselItem :key='d.title' >
            <a :href="d.link" target="_blank"><div :style='`background:url("${d.image}");background-size:100% 100%;height:285px;display:flex;align-items:flex-end;justify-content:center;color:#fff;text-shadow:1px 1px 1px #333;padding:20px 5px;`' >{{d.title}}</div></a>
        </CarouselItem>
        </template>
    </Carousel>
    </template>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data(){
    return {
      error:"",
      items:[]
    }
  },
  props:['id'],
  computed:{
    ...mapGetters('core',['rss']),
    theRss(){
      return this.rss.find(v=>v.id == this.id)  || {}
    }
  },
  watch:{
    id:{
      handler(v,old){
        if(v!=old){
          this.getData()
        }
      },  
      immediate:true
    }
  },
  mounted(){
    this.getData()
  },methods:{
    getData(){
      this.error = ""
      this.loading = true
      this.CORE.GET_RSS_DATA({param:{id:this.id}}).then(res=>{
        this.items = res.data.data
      }).catch(e=>{
        this.error = e
      }).finally(e=>{
        this.loading = false
      })
    }
  }
}
</script>

<style>

</style>