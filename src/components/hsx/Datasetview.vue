<template>
  <div class='s-dataset'>
    <Row class="s-header" :gutter="2">
      <template v-for="c in columns">
        <Col :key="c.key" :span='c.span'>
          <div class='s-caption' :key='c.key'>
            {{c.label}}
          </div>
        </Col>
      </template>
    </Row>
    <template v-for="d in data">
      <Row class="s-data" :key="d.key" :gutter="2">
        <template v-for="c in columns">
          <Col :key="c.key" :span='c.span'>
            <div class='s-value' :key='c.key'>
              {{format(c,d[c.key])}}
            </div>
          </Col>
        </template>
      </Row>
    </template>
  </div>
</template>

<script>
export default {
  props:['columns','data'],
  methods:{
    format(c,val){
      if(c.control == 'time'){
        return val?moment(val).format('L'):'-'
      }else if(c.control == 'select'){
        let getTypes = this.$store.getters[c.option.getters]
        let types = c.option.key?getTypes(c.option.key):getTypes
        let t = types.find(v=>v.value == val)
        if(t)
          return t.name
      }

      return val
    }
  }
}
</script>
<style lang="less">
.s-caption{
  background:#515a6e;
  color:#fff;
  padding:2px 0px;
  text-align: center;
}

.s-value{
   padding:5px 0;
  text-align: center;
}
</style>