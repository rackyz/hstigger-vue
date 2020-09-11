<template>
<div style='height:100%;'>
 
  <Card style='margin:10px;border:none;border-radius:0;' padding='0'  >
     <div style='padding:10px;border-bottom:1px solid #dfdfdf;'><Icon type='md-person' /> 用户管理</div>
      <hs-toolbar :data="tools" @event='onEvent' :enabled='toolEnabled' />
      <a style='position:absolute;right:10px;top:85px;font-size:14px;color:#63738c;'><Icon type='md-download' /> 下载导入用表格模板</a>
      <div class='filter-wrap' style='padding:5px;border-bottom:1px solid #dfdfdf;' @click="selected=null">
        <Input v-model='searchText' search style='width:200px' clearable /> <ButtonGroup><Button :type='hidingLocked?"primary":""' @click='hidingLocked=!hidingLocked'>隐藏已禁用</Button></ButtonGroup><Button :type='showUnsafe?"primary":""' @click='showUnsafe = !showUnsafe' style='margin-left:5px;'>密码未修改</Button>
      </div>
      <List split :loading='loading'>
       <template v-for='user in filterdUsers'>

          <a @click.stop='onSelect(user)'  :key='user.id'>
        <ListItem :key='user.id' style='padding:20px;' class='list-item' :class='(multiple?selected.includes(user):selected==user)?"list-item-selected":""'>
            <ListItemMeta :title="`${user.user}(账号) / ${user.name}`">
            <hs-avatar :userinfo='user' size='35' slot='avatar' style='margin-top:2px'></hs-avatar>
          
            <div class="description" slot='description' style='font-size:12px;line-height:12px;'>
                <div class='state-mark' :style='`background:${GetStateColor(user.state)}`'></div>{{GetStateText(user.state)}} | <span style='margin:0 5px;' :style='`color:${user.passweak?"darkred":"darkgreen"}`'>{{user.passweak?'初始密码':'安全'}}</span> | {{user.lastlogin_at?moment(user.lastlogin_at).fromNow() + ' 登录':'未登录'}}
            </div>
           
            </ListItemMeta>
           
            <template slot="action">
                <li>
                    {{user.deps && user.deps.length > 0 ? user.deps.map(d=>deps.find(v=>v.id == d).name).join(',') : '无部门'}}
                </li>
                <li>
                    {{user.roles && user.roles.length > 0 ?user.roles.map(d=>roles.find(v=>v.id == d).name).join(',') : '无角色'}}
                </li>
            </template>
            
        </ListItem>
        </a>
            </template>
    </List>
  </Card>

   <hs-modal-form ref="form"  :title="(current && current.id?'修改信息':'新增用户')" v-model="showModal" :width="420"  style="margin:10px" :form="user_form" :data="current"  editable  @on-submit="patchUser" @on-event='handleEvent' />

    <hs-modal-form ref="formpwd"  :title="`修改密码:${selected?selected.name:''}`" v-model="showModalPassword" :width="320"  style="margin:10px" :form="user_password_form" :data="current"  editable  @on-submit="patchUserPassword" @on-event='handleEvent' />

    <!-- 从文件导入状态对话框 -->
    <Modal
        v-model="modalImporting"
        width="600"
        transfer
        :z-index='2'
        :footer-hide="importState != 3"
    >
        <p
            slot="header"
            style="color:#f60;text-align:center"
        >
            <Icon type="ios-information-circle"></Icon>
            <span>导入数据</span>
        </p>
        <div style="text-align:center;font-size:0.85rem;">
            <p
                style='color:red;font-weight:bold;margin-bottom:0.25rem;font-size:14px;text-align:left;padding:5px 30px;padding-top:15px;'
                :style="importState===2?'color:green':''"
            >{{importStateStr}}</p>
            <div style='text-align:left;padding:10px;font-size:12px;max-height:300px;overflow-y:auto;background:#fff;padding:10px;margin:10px 30px;'>
              <p v-for='(u,i) in importData' :key='u.name'>
              [{{i+1}}] {{u.user}} / {{u.name}} <span style='float:right;' :style='`color:${TestImportState(u)?"red":"blue"}`'>{{TestImportState(u)?TestImportState(u):'可导入'}}</span>
            </p>
           
            </div>
             <Button  style='height:40px;margin:10px;width:90%;' @click='importAll' v-if='importData && importData.length'>导入所有账号</Button>
        </div>

        <input ref='fileLoader' v-show='false' type='file' accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,*.csv"  @change='parse' />
    </Modal>
    
</div>
  
</template>

<script>
import {mapGetters} from 'vuex'
import XLSX from 'xlsx'
export default {
  data(){
    return {
      selected:null,
      loading:false,
      hidingLocked:false,
      importData:[],
      searchText:null,
      showUnsafe:false,
      multiple:false,
      showModal:false,
      showModalPassword:false,
      modalImporting:false,
      importStateStr:"",
      importState:0,
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
        key:'resetpwdto',
        name:"修改密码",
        icon:'ios-key'
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
        key:'multiple',
        name:"多选",
        icon:'ios-people'
        },{
        key:'unmultiple',
        name:"取消多选",
        color:'yellogreen',
        icon:'ios-people-outline'
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
    ...mapGetters('admin',['users']),
    toolEnabled(){
      if(this.multiple){
        if(this.selected.length > 0){
           return [1,0,1,1,0,this.selected.state == 0,this.selected.state==1, 1,0,1,1]
        }else{
           return [1,0,0,0,0,0,0,1,0,1,1]
        }
      }else{
         if(this.selected)
          return [1,1,1,1,1,this.selected.state == 0,this.selected.state==1, 1,!this.multiple,this.multiple,1]
        else
          return [1,0,0,0,0,0,0,1,!this.multiple,this.multiple,1]
      }
     
    },
    user_password_form(){
      return {
        layout:"<div><Row><Col :span='24'>{{password}}</Col></Row><Row style='margin-top:10px'><Col :span='24'>{{passwordAgain}}</Col></Row></div>",
        def:{
          password:{
            label:"输入密码",
            control:"input",
            option:{
              type:'password',
              require:true
            }
          },
          passwordAgain:{
            label:"密码确认",
            control:"input",
            option:{
              type:'password',
              require:true
            }
          }
        }
      }
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
        if(this.searchText && !v.name.includes(this.searchText.trim()) && !v.user.includes(this.searchText.trim()))
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
    TestImportState(user){
      if(this.users.find(v=>v.user == user.user))
        return '用户名重复'
      else if(this.users.find(v=>v.phone == user.phone))
        return '电话号码重复'
    },
    onSelect(e){
      if(this.multiple){
        if(this.selected.includes(e))
          this.selected.splice(this.selected.findIndex(v=>v==e),1)
        else
          this.selected.push(e)
      }else{
        if(this.selected == e)
          this.selected = null
        else
          this.selected = e
      }
    },
    importAll(){
      var that = this
      this.$store.dispatch('admin/CreateUsers',this.importData).then(results=>{
        let succees = results.filter(v=>v == 0)
        that.importStateStr = `导入完毕,成功导入${succees.length}个账户`
      })
    },
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
      this.$store.dispatch('admin/ListUsers').then(res=>{
       
      }).finally(e=>{
        this.loading = false
      })
    },
    onEvent(e){
      console.log(e)
      if(e == 'add'){
        this.current = null
        this.showModal = true
      }else if(e == 'edit'){
        this.current = this.selected
        this.showModal = true
      }else if(e == 'refresh'){
        this.getData()
      }else if(e == 'lock'){
        this.$store.dispatch('admin/LockUser',this.selected.id)
      }else if(e == 'unlock'){
        this.$store.dispatch('admin/UnlockUser',this.selected.id)
      }else if(e == 'resetpwd'){
        if(this.multiple){
          this.Confirm(`确定要重置<span style="color:red">${this.selected.join(',')}等${this.selected.length}</span>用户的密码?`,
            ()=>this.$store.dispatch('admin/Resetpassword',this.selected.map(v=>v.id))
          )
        }else{
          this.Confirm(`确定要重置用户<span style="color:red">${this.selected.name}</span>的密码?`,
            ()=>this.$store.dispatch('admin/Resetpassword',[this.selected.id])
          )
        }
        this.$store.dispatch('admin/ResetPassword',{id:this.selected.id})
      }else if(e== 'resetpwdto'){
        this.showModalPassword = true
      }else if(e == 'delete'){
        this.Confirm('确定要删除该用户?',()=>{
          if(this.multiple){
            this.$store.dispatch('admin/DeleteUsers',this.selected.map(v=>v.id)).then(res=>{
              this.Success('删除成功')
            }).catch(e=>{
              this.Error(e)
            })
          }else{
            this.$store.dispatch('admin/DeleteUser',this.selected.id).then(res=>{
              this.Success('删除成功')
            }
              
            ).catch(e=>{
              this.Error(e)
            })
          }
        })
      }else if(e == 'import'){
        console.log(this.$refs.fileLoader)
        this.$refs.fileLoader.click()
        
      }else if(e == 'multiple'){
        this.multiple = true
        this.selected = []
      }else if(e == 'unmultiple'){
        this.multiple = false
        this.selected = null
      }
    },

file2Xce(file){
    let wb = null
    return new Promise(function (resolve, reject) {
        const reader = new FileReader()
        reader.onload = function (e) {
            const data = e.target.result
            wb = XLSX.read(data, {
                type: 'binary'
            })
            const result = []
            wb.SheetNames.forEach((sheetName) => {
                result.push({
                    sheetName: sheetName,
                    sheet: XLSX.utils.sheet_to_json(wb.Sheets[sheetName])
                })
            })
            resolve(result)
        }
        reader.readAsBinaryString(file)
    })

},
    parse(file) {
            file = this.$refs.fileLoader.files[0]
            console.log(file)
            var that = this
            this.modalImporting = true
            this.importStateStr = "正在分析文件... 请耐心等待"
            // 打开loading对话框
            
            this.file2Xce(file).then(tabJson => {
                if (tabJson && tabJson.length > 0) {
                    that.importStateStr = "正在上传数据..."
                    let users = tabJson[0].sheet.map(v=>({
                      name:v['姓名'],
                      phone:v['电话'],
                      password:v['密码'],
                      user:v['电话']
                    }))
                    that.importStateStr = `已从文件中提取${users.length}个账号`
                    that.importState = 2
                    that.importData = users
                    console.log(users)
                }
            })
        },
    patchUserPassword(item){
      var that = this
      if(item.password != item.passwordAgain){
        this.$refs.formpwd.setError('passwordAgain','两次密码不一致,请检查')
        return
      }

      if(this.selected && this.selected.id){
        item.id = this.selected.id
        this.$store.dispatch('admin/ResetPassword',item).then(res=>{
          that.Success('修改成功')
          that.showModalPassword = false
        }).catch(e=>{
          that.Error(e)
        })
      }

     
    },
    importAll(){
      let users = this.importData.filter(v=>this.TestImportState(v))
      this.$store.dispatch('admin/CreateUsers',users).then(results=>{

      })
    },
     patchUser(item){
       console.log('patch:',item)
        var that = this
        if(this.current && this.current.id){
            item.id = this.current.id
        }
        this.$store.dispatch('admin/PatchUser',item).then(res=>{
            that.Success(item.id?"修改成功":"新增用户成功")
            that.showModal = false
            that.current = {}
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