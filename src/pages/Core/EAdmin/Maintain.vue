<template> <div class='hs-container'>
   <Alert dis-hover style="background:#FFEEEE;color:darkred;filter:none;margin:10px;border:1px solid #dfdfdf;">
                  请谨慎使用该功能，操作不当可能会导致数据丢失！<br />
                  测试版本暂未开通数据回复功能.
                </Alert>
                <div class="flex-right project-tools" style="margin-right:20px;width:100%;">
                  <Button style='margin-right:10px;' type="primary" @click="AddDump">新增备份</Button>
                </div>
                <div class="height:calc(100% - 100px);position:relative;">
                <hs-table style="margin:10px;" :columns="cols" :data="dumps" :onEvent="nop" /> 
                </div>
               </div>
</template>

<script>
export default {
 mounted(){
    this.getData()
  },
  data(){
    return {
      dumps:[],
      tabname:"name1",
       cols: [{
            key: 'id',
            title: '序号',
            type: 'index',
            width: 60
        },  {
            key: 'date',
            title: '备份日期',
            type: 'time',
            width:120,
            option:{
                align:"center",
                type:'time'
            }
        }, {
            key: 'file',
            title: '文件名称',
            type: 'text',
            option:{
            }
        }, {
            key: 'state',
            title: '状态',
            type: 'state',
            width:100,
            event:'open',
            option: {
                align: "center"
                ,states:['已保存'],
                colors:['darkgreen']
            }
        }]
    }
  },
  methods:{
    nop(){},
    getData(){
      this.loading = true
      this.CORE.GET_DUMPS().then(res=>{
        let list = res.data.data
        list.sort((a, b) => a > b ? -1 : 1)
        let dumps = list.map(v=>{
            let matches = v.match(/dump([0-9]{14}).*/)
            let [,timestamp] = matches
            return {
                date: moment(timestamp,'YYYYMMDDHHmms').toString(),
                file:v
            }
        })
        this.dumps = dumps
      }).finally(e=>{
        this.loading = false
      })
    },
    AddDump(){
      this.CORE.MAKE_DUMP().then(res=>{
        this.Success('备份已完成')
        this.getData()
      })
    }
  }
}
</script>

<style>

</style>