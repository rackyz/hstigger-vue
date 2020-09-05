<template>
<div style='height:100%;'>
  <Card style='margin:10px;margin-bottom:0;border-radius:0;background:#23334c;color:#fff;'>
      <h3>用户管理</h3>
      
  </Card>
  <Card style='margin:10px;margin-bottom:0;margin-top:0;height:calc(100% - 200px);border:none;border-radius:0;' padding='0'>
      <div style='padding:10px;'>
      <hs-toolbar :data="tools" />
      </div>
      <List>
       <template v-for='user in users'>

   
        <ListItem :key='user.id' style='padding:20px;'>
            <ListItemMeta :title="user.name" description="部门 | 角色 | 5小时前" />
            <hs-avatar :userinfo='user' slot='avatar'></hs-avatar>
            <template slot="action">
                <li>
                    <a href="">编辑</a>
                </li>
                <li>
                    <a href="">删除</a>
                </li>
            </template>
        </ListItem>
            </template>
    </List>
  </Card>
</div>
  
</template>

<script>
export default {
  data(){
    return {
      users:[],
      loading:false,
      tools:[
      {
          key:'add',
          name:'新增',
          icon:'md-add'
      },{
          key:'delete',
          name:'删除',
          icon:"md-trash"
      },{
        key:'unlock',
        name:"启用",
        icon:'md-unlock'
      }],
    }
  },
  mounted(){
    this.loading = true
    this.Request('GET_USERS').then(res=>{
      this.users = res.data.data
    }).finally(e=>{
      this.loading = false
    })
  },
  methods:{
    onEvent(e){

    },
    onDelete(){

    }
  }
}
</script>

<style>

</style>