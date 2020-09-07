<template>
<div style='height:100%;'>
  <Card style='margin:10px;margin-bottom:0;border-radius:0;background:#23334c;color:#fff;border-top-left-radius:10px;border-top-right-radius:10px;'>
      <h4><Icon type='md-person' /> 用户管理</h4>
      
  </Card>
  <Card style='margin:10px;margin-bottom:0;margin-top:0;height:calc(100% - 200px);border:none;border-radius:0;' padding='0'>
      <hs-toolbar :data="tools" @event='onEvent' :enabled='toolEnabled' />
      <a style='position:absolute;right:10px;top:35px;font-size:14px;color:skyblue;'><Icon type='md-document' /> 下载导入用表格模板</a>
      <div class='filter-wrap' style='padding:10px;background:#eee;'>
        <Input v-model='searchText' search style='width:200px' clearable /> <ButtonGroup><Button :type='hidingLocked?"primary":""' @click='hidingLocked=!hidingLocked'>隐藏已禁用</Button></ButtonGroup><Button :type='showUnsafe?"primary":""' @click='showUnsafe = !showUnsafe' style='margin-left:5px;'>密码未修改</Button>
      </div>
      <List split :loading='loading'>
       <template v-for='user in filterdUsers'>

          <a @click='selected = user' :key='user.id'>
        <ListItem :key='user.id' style='padding:20px;' class='list-item' :class='selected==user?"list-item-selected":""'>
            <ListItemMeta :title="`${user.user} / ${user.name}`">
            <hs-avatar :userinfo='user' size='35' slot='avatar' style='margin-top:2px'></hs-avatar>
          
            <div class="description" slot='description' style='font-size:12px;line-height:12px;'>
                <div class='state-mark' :style='`background:${GetStateColor(user.state)}`'></div>{{GetStateText(user.state)}} | <span style='margin:0 5px;' :style='`color:${user.passweak?"darkred":"darkgreen"}`'>{{user.passweak?'初始密码':'安全'}}</span> | {{user.lastlogin_at?moment(user.lastlogin_at).fromNow():'未登录'}}
            </div>
           
            </ListItemMeta>
           
            <template slot="action">
                <li>
                    {{user.deps.map(d=>deps.find(v=>v.id == d).name).join(',') || '无部门'}}
                </li>
                <li>
                    {{user.roles.map(d=>roles.find(v=>v.id == d).name).join(',') || '无角色'}}
                </li>
            </template>
            
        </ListItem>
        </a>
            </template>
    </List>
  </Card>

   <hs-modal-form ref="form"  :title="current && current.id?'修改信息':'新增用户'" v-model="showModal" :width="420"  style="margin:10px" :form="user_form" :data="current"  editable  @on-submit="patchUser" @on-event='handleEvent' />
</div>
  
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data(){
    return {
      users:[],
      selected:null,
      loading:false,
      hidingLocked:false,
      searchText:null,
      showUnsafe:false,
      showModal:false,
      current:{},
      tools:[
      {
          key:'add',
          name:'新增',
          icon:'md-add'
      },{
          key:'edit',
          name:'编辑',
          icon:"md-create"
      },{
          key:'delete',
          name:'删除',
          icon:"md-trash"
      },{
        key:'resetpwd',
        name:"重置密码",
        icon:'md-key'
      },{
        key:'lock',
        name:"禁用",
        icon:'md-lock'
      },{
        key:'unlock',
        name:"启用",
        icon:'md-unlock'
      },{
        key:'import',
        name:"导入",
        icon:'ios-folder-open'
      },{
        key:'refresh',
        name:"刷新",
        icon:'md-refresh'
      }],
    }
  },
  mounted(){
    this.getData()
  },
  computed:{
    ...mapGetters('core',['deps','roles']),
    toolEnabled(){
      if(this.selected)
        return [1,1,1,1,this.selected.state == 0,this.selected.state==1, 1,1]
      else
        return [1,0,0,0,0,0,1,1]
    },
    user_form(){
      return {
        def: {
            user:{
                label:"登录名",
                editable:true,
                control:"input",
                option:{
                    required:true,
                    rules: [{
                        type: 'name'
                    }, {
                        msg: '该名称已存在,请更换'
                    }]
                }
            },
            name: {
                label: "姓名",
                editable: true,
                control: "input",
                option: {
                    required: true
                }
            },
            roles: {
                label: "角色",
                control: "select",
                option: {
                    getters:'core/roles',
                    multiple:true
                }
            },
            avatar: {
                label: "头像",
                editable: true,
                control: "image"
            },
            deps:{
                label: "部门",
                control: "select",
                option:{
                   getters: 'core/deps',
                    multiple: true
                }
            },
            phone:{
                label:"电话",
                control:"input"
            }


        },
        layout: `<div>
        <Row :gutter='10'>
        <Col span='10'>{{user}}</Col><Col span='10'>{{name}}</Col><Col span='4'>{{avatar}}</Col>
        </Row>
        <Row :gutter='10' style='margin-top:10px;'><Col span='12'>{{phone}}</Col>
        </Row><Row :gutter='10' style='margin-top:10px;'><Col span='24'>{{deps}}</Col>
        </Row><Row :gutter='10' style='margin-top:10px;'><Col span='24'>{{roles}}</Col>
        </Row></div>`,
        

        option: {}
    }
    },
    filterdUsers(){
      return this.users.filter(v=>{
        if(this.searchText && !v.name.includes(this.searchText.trim()))
          return false
        
        if(this.showUnsafe && !v.passweak)
          return false
        
        if(this.hidingLocked && v.state != 0)
          return false

        return true
      })
    }
  },
  methods:{
    GetStateColor(s){
      if(s == 0)
        return 'yellowgreen'
      else if(s == 1)
        return 'darkred'
      else 
        return 'orange'
    },
    GetStateText(s){
      if(s == 0)
        return '正常'
      else if(s== 1)
        return '禁用'
      else 
        return '锁定'
    },
    getData(){
       this.loading = true
      this.Request('GET_USERS').then(res=>{
        this.users = res.data.data
      }).finally(e=>{
        this.loading = false
      })
    },
    onEvent(e){
      console.log(e)
      if(e == 'add'){
        this.showModal = true
      }else if(e == 'edit'){
        this.current = this.selected
        this.showModal = true
      }else if(e == 'refresh'){
        this.getData()
      }
    },
     patchUser(item){
            var that = this
            if(this.current.id){
                item.id = this.current.id
            }
            this.Request(item.id?'PATCH_USER':'POST_USER',{data:item}).then(res=>{
                that.Success(item.id?"修改成功":"新增用户成功")
                that.showModal = false
                that.current = {}

                let item =Object.assign({},item,res.data.data)
                let index = that.users.findIndex(v=>v.id == item.id)
                if(index != -1)
                 that.users.splice(index,1,item)
                else
                  that.users.splice(that.users.length-1,0,item)

            }).catch(e=>{
                if(typeof(e) == "string" && e.includes('{')){
                   e = JSON.parse(e)
                   if(e.key){
                    that.$refs.form.setError(e.key,e.error)
                    return
                   }
                }

                that.Error(e)
            })
        }
  }
}
</script>

<style lang="less" scoped>
.description{
  display: flex;
  align-items: center;
}
.state-mark{
  width:9px;
  height:9px;
  margin-right:5px;
}

.list-item{
  padding:15px !important;
}

.list-item:hover{
  background:linear-gradient(to right,#fff,#ffe);
}

</style>