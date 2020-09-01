<template>
  <Row>
    <template v-for="(c,i) in cols">
      <Col :key='i' :span='span' :style="{minWidth:minWidth+'px'}">
        <template v-for="(item,j) in c">
          <component :key='j' :is='tmpl' :data='item' :filter='filter' @on-event='onEvent' :editable="editable" :checked="checked" />
        </template>
        
      </Col>
    </template>
  </Row>
</template>

<script>
export default {
  props:{
    data:{
      type:Array,
      default:()=>[]
    },
    tmpl:{
      type:String,
      default:'text'
    },
    filter:{
      type:String,
      default:""
    },
    span:{
      type:Number,
      default:4
    },
    minWidth:{
      type:Number,
      default:160
    },
    col:{
      type:Number,
      default:6
    },
    editable:{
      type:Boolean,
      default:false
    },
    checked:{
      type:Object,
      default:()=>({})
    }
  },
  computed:{
    cols(){
      let len = this.data.length
      let rows = Math.ceil(len/this.col)
      let collen = len/rows
      let cols = []
      for(let i=0;i<collen;i++){
        cols.push(this.data.slice(i*rows,(i+1)*rows))
      }
      console.log('cols:',cols)
      return cols
    }
  },
  methods:{
    onEvent(e){
      this.$emit('on-event',e)
    }
  }
}
</script>

<style>

</style>