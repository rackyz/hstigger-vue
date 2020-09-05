<template>
 <div style='height:100%;'>
  <Card style='margin:10px;margin-bottom:0;border-radius:0;background:#23334c;color:#fff;'>
      <h3>部门管理</h3>
      
  </Card>
  <Row style='margin:10px;' :gutter='10'>
    <Col :span='4'>
      <Card style='border:none;border-radius:0;'>Tree</Card>
    </Col>
    <Col :span='20'>
      <Card style='margin-bottom:0;margin-top:0;height:calc(100% - 200px);border:none;border-radius:0;' padding='0'>
      <div style='padding:10px;'>
      <a>添加新用户</a><a>多选</a><a>添加新用户</a>
      </div>
      <List>
      
        <ListItem style='padding:20px;'>
            <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar" title="胡佳翰" description="部门 | 角色 | 5小时前" />
            <template slot="action">
                <li>
                    <a href="">编辑</a>
                </li>
                <li>
                    <a href="">删除</a>
                </li>
            </template>
        </ListItem>
         <ListItem style='padding:20px;'>
            <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar" title="胡佳翰" description="部门 | 角色 | 5小时前" />
            <template slot="action">
                <li>
                    <a href="">编辑</a>
                </li>
                <li>
                    <a href="">删除</a>
                </li>
            </template>
        </ListItem>
         <ListItem style='padding:20px;'>
            <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar" title="胡佳翰" description="部门 | 角色 | 5小时前" />
            <template slot="action">
                <li>
                    <a href="">编辑</a>
                </li>
                <li>
                    <a href="">删除</a>
                </li>
            </template>
        </ListItem>
         <ListItem style='padding:20px;'>
            <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar" title="胡佳翰" description="部门 | 角色 | 5小时前" />
            <template slot="action">
                <li>
                    <a href="">编辑</a>
                </li>
                <li>
                    <a href="">删除</a>
                </li>
            </template>
        </ListItem>
        {{users}}
    </List>
  </Card>
    </Col>
  </Row>
  
</div>
</template>

<script>
export default {
  data(){
    return {
      users:[],
      loading:false,
      dep_tools:[
      {
          key:'add',
          name:'新增',
          icon:'md-add'
      },{
          key:'delete',
          name:'删除',
          icon:"md-trash"
      }],
    }
  },
  mounted(){
    
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