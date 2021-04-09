<style lang="less">
.l-list-item-card{
   width:200px;
   height:240px;
   border:1px solid #dfdfdf;
   margin:10px;padding:15px;
   box-shadow: none;
   filter:none !important;
   border:1px solid #dfdfdf !important;
   display: flex;
   align-items: center;
   flex-direction: column;
   border-radius: 10px !important;
   text-align: center;
   cursor: pointer;
   .lr-name{
       font-size:20px;
       margin-top:10px;
       text-align: center;
   }

   i{
       border:2px solid #aaa;
       border-radius: 50%;
       padding:25px;
   }
}


.l-list-item-card:hover{
     background:rgb(216, 239, 253);
     
    transition: all 0.3s;
}

.l-list-item-card-selected{
    border:2px solid rgb(10, 190, 255) !important;
    transition: all 0.3s;
}

.l-list-item-user{
    width:160px;
    display: flex;
    padding:10px;
    background:#fff;
    cursor: pointer;
    border-radius: 5px;

    .info{
        padding:2px 0;
        font-size:16px;
        color:#333;
        line-height:18px;
    }
    
}

.l-list-item-user:hover{
     background:rgb(192, 232, 236);
    transition: all 0.3s;
}

.l-tool-active{
    i{
        color:#3af;
    }
    .label{
        color:#3af;
    }
}
</style>
<template>
 <div class="hs-conatiner hs-conatiner-scrollable" style='background:#dfdfdf;'>

      <Spin fix v-if='loading'>
			 <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                <div>Loading</div>
		</Spin>

     <Card style="margin:10px;font-size:25px;">
        角色权限
        <div style="font-size:14px;color:#888;">配置角色、部门的权限，为用户分配角色</div>
      </Card>
       <Row :gutter="10" style="margin:5px;">
          <Col :span='24'>
          <Tabs type="card" :value="type_id" :animated="false" @on-click='type_id=$event' >
                <TabPane :label="`企业岗位(${getRoles(11).length})`" :name="11" style="background:#fff;padding:10px;">
                    <Alert  show-icon closable>
        系统通用权限的角色划分，标识用户对于各模块的访问和操作权限
    </Alert>
                    <div class="l-list" style="margin:20px;margin-top:10px;">
                        <template v-for="r in getRoles(11)">
                        <div class="l-list-item-card" :class="{'l-list-item-card-selected':selected == r}" :key="r.id">
                            <Icon :type="r.icon" size='45' :color="r.color" />
                            <div class="lr-name">{{r.name}}</div>
                            <div style="text-align:center"><a @click="Config(r)">配置</a> | <a @click="Edit(r)">修改</a><template> | <a @click="Delete(r)">删除</a></template> | <a @click="Arrange(r)">分配</a></div>
                            <div style="text-align:center;font-size:12px;color:#aaa">{{r.desc}}</div>
                        </div>
                        </template>
                         
                        <div class="l-list-item-card" style="border:3px dashed #dfdfdf !important;" @click="Add">
                            <Icon type="ios-add" size='80' color="#aaa" style="border:none" />
                             <div class="lr-name" style='margin-top:0px;text-align:center;color:#aaa !important;'>添加角色</div> 
                        </div>
                         
                    </div>

                   

                </TabPane>
                <TabPane :label="`项目岗位(${getRoles(12).length})`" :name="12"  style="background:#fff;padding:10px;">
                     <Alert   show-icon closable>
        项目权限划分，对应项目岗位角色分配
    </Alert>
                    <div class="l-list" style="margin:20px;margin-top:10px;">
                        <template v-for="r in getRoles(12)">
                        <div class="l-list-item-card" :key="r.id">
                            <Icon :type="r.icon || 'md-bookmark'" size='45' :color="r.color" />
                            <div class="lr-name">{{r.name}}</div>
                            <div style="text-align:center"><a @click="Config(r)">配置</a> | <a @click="Edit(r)">修改</a><template v-if="r.id>1000"> | <a @click="Delete(r)">删除</a></template></div>
                            <div style="text-align:center;font-size:12px;color:#aaa">{{r.desc}}</div>
                        </div>
                        </template>
                         
                        <div class="l-list-item-card" style="border:3px dashed #dfdfdf !important;" @click="Add">
                            <Icon type="ios-add" size='80' color="#aaa" style="border:none" />
                             <div class="lr-name" style='margin-top:0px;text-align:center;color:#aaa !important;'>添加角色</div> 
                        </div>
                         
                    </div>



                </TabPane>
                <TabPane :label="`部门权限(${deps.length})`" name="dep"  style="background:#fff;padding:10px;">
                     <Alert  show-icon closable>
        部门权限划分，对应部门岗位角色分配
    </Alert>
                    <div class="l-list" style="margin:20px;margin-top:10px;">
                        <template v-for="r in deps">
                        <div class="l-list-item-card" :class="{'l-list-item-card-selected':selected == r}" :key="r.id">
                            <Icon :type="r.icon || 'md-bookmark'" size='45' :color="r.color" />
                            <div class="lr-name">{{r.name}}</div>
                            <div style="text-align:center"><a @click="Config(r)">配置</a></div>
                            <div style="text-align:center;font-size:12px;color:#aaa">{{r.desc}}</div>
                        </div>
                        </template>
                         
                        <div class="l-list-item-card" style="border:3px dashed #dfdfdf !important;" @click="Add">
                            <Icon type="ios-add" size='80' color="#aaa" style="border:none" />
                             <div class="lr-name" style='margin-top:0px;text-align:center;color:#aaa !important;'>添加角色</div> 
                        </div>
                         
                    </div>

                </TabPane>
                 <TabPane :label="`部门岗位(${getRoles(13).length})`" :name="13"  style="background:#fff;padding:10px;">
                     <Alert  show-icon closable>
        部门权限划分，对应部门岗位角色分配
    </Alert>
                    <div class="l-list" style="margin:20px;margin-top:10px;">
                        <template v-for="r in getRoles(13)">
                        <div class="l-list-item-card" :class="{'l-list-item-card-selected':selected == r}" :key="r.id">
                            <Icon :type="r.icon" size='45' :color="r.color" />
                            <div class="lr-name">{{r.name}}</div>
                            <div style="text-align:center"><a @click="Config(r)">配置</a> | <a @click="Edit(r)">修改</a><template v-if="r.id>1000"> | <a @click="Delete(r)">删除</a></template></div>
                            <div style="text-align:center;font-size:12px;color:#aaa">{{r.desc}}</div>
                        </div>
                        </template>
                         
                        <div class="l-list-item-card" style="border:3px dashed #dfdfdf !important;" @click="Add">
                            <Icon type="ios-add" size='80' color="#aaa" style="border:none" />
                             <div class="lr-name" style='margin-top:0px;text-align:center;color:#aaa !important;'>添加角色</div> 
                        </div>
                         
                    </div>

                </TabPane>
                 <TabPane :label="`外部岗位(${getRoles(14).length})`" :name="14"  style="background:#fff;padding:10px;">
                     <Alert  show-icon closable>
        客户或者其他合作方角色
    </Alert>
                    <div class="l-list" style="margin:20px;margin-top:10px;">
                        <template v-for="r in getRoles(14)">
                        <div class="l-list-item-card" :class="{'l-list-item-card-selected':selected == r}" :key="r.id">
                            <Icon :type="r.icon" size='45' :color="r.color" />
                            <div class="lr-name">{{r.name}}</div>
                            <div style="text-align:center"><a @click="Config(r)">配置</a> | <a @click="Edit(r)">修改</a><template v-if="r.id>1000"> | <a @click="Delete(r)">删除</a></template></div>
                            <div style="text-align:center;font-size:12px;color:#aaa">{{r.desc}}</div>
                        </div>
                        </template>
                         
                        <div class="l-list-item-card" style="border:3px dashed #dfdfdf !important;" @click="Add">
                            <Icon type="ios-add" size='80' color="#aaa" style="border:none" />
                             <div class="lr-name" style='margin-top:0px;text-align:center;color:#aaa !important;'>添加角色</div> 
                        </div>
                         
                    </div>

                </TabPane>
            </Tabs>
        
        
      
      </Col>
      
      </Row>
      

      <!-- modal -->
    
    <Modal v-model="showModalConfig" icon="md-person" :title="`配置角色`" footer-hide fullscreen>
     <div class="l-toolbox l-list" style='background:#23334c;padding:0;height:60px;'>
         <Dropdown transfer trigger="click" @on-click="handleChangeRole" style="height:100%;position:relative;">
         <div class="l-tool" style="width:220px;height:60px;border-right:1px solid #555;font-size:14px;display:flex;justify-content:space-between;align-items:center;color:#fff;padding:0 15px;margin-left:0;">
             <div class="flex-wrap" style='min-width:150px;'>
             <Icon :type='role.icon' size="30" style="margin-right:10px;border:1px solid #aaa;" />
             <div>{{role.name}}<div style='font-size:10px;color:#aaa;text-align:left;'>{{getTypeById(role.type_id).name}}</div></div>
             </div>
             <Icon type='md-arrow-dropdown' size="25" />
             </div>
             <DropdownMenu slot="list">
                 <template v-for="r in roles">
                      <DropdownItem :name='r.id' :key='r.id' :selected="r.id == current_role">{{r.name}}</DropdownItem>
                 </template>
        </DropdownMenu>
             </Dropdown>
                <div class="l-tool" @click="onSavePermission" :class="{'l-tool-active':Object.values(updated_acl).filter(v=>v!=undefined).length}">
                    <Icon type="md-document" size="25" />
                    <div class="label">保存</div>
                    </div>
                     <div class="l-tool" @click="onCancelPermission">
                    <Icon type="md-exit" size="25" />
                    <div class="label">取消</div>
                    </div>
                  <div class="l-tool" @click="onEnableAllPermission">
                    <Icon type="md-unlock" size="25" />
                    <div class="label">全部启用</div>
                    </div>
                      <div class="l-tool" @click="onDisabledAllPermission">
                    <Icon type="md-lock" size="25" />
                    <div class="label">全部禁用</div>
                    </div>
                     <div class="l-tool" @click="onGoBackPermission">
                    <Icon type="md-arrow-back" size="25" />
                    <div class="label">恢复默认</div>
                    </div>
        </div>
    <Layout style='flex-direction:row;overflow:hidden;'>
       
         <hs-menu ref='menu' style='min-width:220px;width:220px;padding-bottom:60px;padding:0;border-right:1px solid #dfdfdf;background:#eee;'  :data="filteredMenus"  @on-select='onClickMenu' :current="menuIndex" />
        
        <Content style="background:#fff;position:relative;">
            <Alert show-icon closable type="success" v-if='Object.values(updated_acl).filter(v=>v!=undefined).length' style="margin:10px;margin-bottom:0;">已修改 {{Object.values(updated_acl).filter(v=>v!=undefined).length}}项，注意保存</Alert>
            <keep-alive><hs-list ref="list" :selectable="false" :data="ValuedPermissions" :option="{tmpl:'BasePermission'}" style="border:none;height:calc(100% - 100px);" @event="onListEvent" /></keep-alive>
            
        </Content>  
        </Layout>  
    </Modal> 

     <Modal v-model="showModal" :title="!role.id?'新建角色':'编辑角色'"  footer-hide>
     <hs-form style="margin:10px;" editable ref="form" :form="roleForm" :data="role" @on-submit="Patch" @on-cancel="showModal = false" />
     </Modal>

     <Modal v-model="showUserConfig" :title="`分配角色 - ${role.name}`" width="470" footer-hide>
          <Transfer
          style="margin:20px;"
        :data="tranferDataUsers"
        :target-keys="roleUsers"
        :titles="['用户列表','已分配']"
        filterable
        :filter-method="filterMethod"
        @on-change="handleChange2"></Transfer>
        <div class="flex-wrap" style="justify-content:flex-end;padding:20px;padding-top:5px;">
             <Button @click="SaveUser">保存</Button>
        </div>
       
     </Modal>
  </div>
</template>

<script>
import tableDef from './t_user'
import { mapActions, mapGetters } from 'vuex'
export default {
    
    data(){
        return {
            roleUsers:[],
            showUserConfig:false,
            menuIndex:"module",
            acl:{"ad584593-3b83-11eb-8e1e-h15d5c7db744":false},
            tabIndex:'basic',
            loading:false,
            showModal:false,
            showModalConfig:false,
            current:undefined,
            selected:null,
            role:{},
            type_id:11,
            selection:[],
            updated_acl:{},
            depPermissions:[{name:'mod1'}],
            projectPermissions:[{name:'mod2'}],
            archivePermissions:[{name:"mod3"}],
        }
    },
    computed:{
        ...mapGetters("core",['types','getTypes','getTypeById']),
        ...mapGetters("entadmin",['users','roles','deps','projects','enabled_modules','rss']),
        tranferDataUsers(){
            return this.users.map(v=>{
                return {
                    key:v.id,
                    label:v.name
                }
            })
        },
        tableDef(){
            return tableDef
        },
        filteredMenus(){
            return this.menus
        },
        ValuedPermissions(){
            return this.GetPermissionList(this.menuIndex).map(v=>{
                return {
                    id:v.id,
                    key:v.key,
                    name:v.name,
                    desc:v.desc,
                    value:this.updated_acl[v.id]!=undefined ?this.updated_acl[v.id]:(this.acl[v.id]!=undefined?this.acl[v.id]:v.value)
                }
            })
        },
       
        filteredRoles(){
            return this.getRoles(this.type_id)
        },
        user_table() {
           return tableDef.cols
        },
        user_form(){
            return tableDef.form
        },
         menus(){
           
            let resources = ['enabled_modules','deps','projects','rss']
            let counts = {}
            resources.forEach(res=>{
                counts[res] = 0
            })
            resources.forEach(res=>{
                if(Array.isArray(this[res]))
                    this[res].forEach(v=>{
                        if(this.acl[v.id] == undefined && false != this.acl[v.id] || this.acl[v.id])
                            counts[res]++

                    })
            })
            resources.forEach(res=>{
                if(this[res].length > 0)
                    counts[res] = (counts[res] * 100/this[res].length).toFixed() + '%'
            })
              console.log('recaculate-menu:',counts)
            return [{
                name:"资源权限",
                icon:'apps',
                is_group:true,
                subs:[{
                name:'模块',
                icon:"user",
                path:'module',
                count:counts.enabled_modules
                },{
                    name:'项目',
                    icon:"organization",
                    path:'project',
                    count:counts.projects
                },{
                    name:'部门',
                    icon:"organization",
                    path:'dep',
                    count:counts.deps
                },{
                    name:'信息',
                    icon:"organization",
                    path:'rss',
                    count:counts.rss
                }]
            },
            //   {
            //     name:"对象详情",
            //     icon:'apps',
            //     is_group:true,
            //     subs:[{
            //         name:'项目',
            //         icon:"organization",
            //         path:'/core/eadmin/dep',
            //         count:this.deps.length
            //     },{
            //         name:'部门',
            //         icon:"organization",
            //         path:'/core/eadmin/dep',
            //         count:this.deps.length
            //     },{
            //         name:'员工',
            //         icon:"organization",
            //         path:'/core/eadmin/dep',
            //         count:this.deps.length
            //     },{
            //         name:'后台管理',
            //         icon:"organization",
            //         path:'/core/eadmin/dep',
            //         count:this.deps.length
            //     }]
            // },
            {
                name:"业务模块",
                icon:'apps',
                is_group:true,
                subs:[]
            }]
      },
        roleForm(){
           return {
              layout:`<div><Row  :gutter="10"><Col :span="4">{{icon}}</Col><Col :span="14">{{name}}</Col><Col :span="6">{{color}}</Col></Row><Row style='margin-top:10px' :gutter="10"><Col :span="24">{{desc}}</Col></Row></div>`,
            //   option:{
            //       hideAction:true
            //   },
              def:{
                icon:{
                  label:"图标",
                  control:"select",
                  option:{
                    options:['logo-twitter','md-star','ios-person'],
                    type:'icon',
                    text:true,
                    defaultValue:'ios-person',
                    required:true
                  }
                },
                name:{
                  label:"名称",
                  control:"input",
                  option:{
                    maxlen:16,
                    required:true
                  }
                },
                color:{
                  label:"颜色",
                  control:"color",
                  option:{
                      required:true,
                    defaultValue:"#333333"
                  }
                },
                desc:{
                  label:"描述",
                  control:"input",
                  option:{
                     type:"textarea"
                  }
                }
              }
            }
         }
    },
    mounted(){
        this.$store.dispatch('entadmin/GetRoles')
    },
    methods:{
            handleChange2 (users) {
                this.roleUsers = users;
            },
            filterMethod (data, query) {
                return data.label.indexOf(query) > -1;
            },
        SaveUser(){
            // this.role
            // this.roleUsers
            this.api.entadmin.PATCH_ROLES(this.roleUsers,{param:{id:this.role.id},query:{q:'users'}}).then(res=>{
                this.Success("保存成功")
                this.showUserConfig = false
            }).catch(e=>{
                this.Error("保存失败:"+e)
            })
        },
        GetRoleUsers(role){
             if(!role || !role.id)
                return
            this.api.entadmin.GET_ROLES({param:{id:role.id},query:{q:'users'}}).then(res=>{
                let users = res.data.data
                this.roleUsers = users
            }).finally(e=>{
                this.loading = false
            })
        },
        GetRoleACL(role){
            if(this.loading)
                return
            this.loading = true
            if(!role || !role.id)
                return
            this.api.entadmin.GET_ROLES({param:{id:role.id}}).then(res=>{
                let acls = res.data.data
                let acl = {}
                this.updated_acl = {}
                acls.forEach(v=>{
                    acl[v.key] = parseInt(v.value)==0?false:true
                })
                console.log("ACL:",this.acl)
               
                this.$set(this,'acl',acl)
                this.$set(this,'updated_acl',{})
                this.$forceUpdate()
            }).finally(e=>{
                this.loading = false
            })
        },  
        GetPermissionList(key){
             if(this.menuIndex == 'module'){
                return this.enabled_modules.map(v=>Object.assign({},v,{value:true}))
            }else if(this.menuIndex == 'dep'){
                return this.deps.map(v=>Object.assign({},v,{value:true}))
            }else if(this.menuIndex == 'project'){
                return this.projects.map(v=>Object.assign({},v,{value:true}))
            }else if(this.menuIndex == 'rss'){
                return this.rss.map(v=>Object.assign({},v,{value:true}))
            }
            return []
        },
         GetPercent(key){
            let permissions = this.GetPermissionList(key)
            let c = 0
            permissions.forEach(v=>{
                if((!v.type || v.type == 'boolean') && this.acl[v.id]){
                    c = c + 1
                }
            })
            if(permissions.length == 0 || c == 0)
                return  ""

            return (c / permissions.length).toFixed(0) + '%'
        },
        onClickMenu(e){
            console.log(e)
            this.menuIndex = e
        },
        getRoles(type_id){
            return this.roles.filter(v=>v.type_id == type_id)
        },
        Add(){
            this.role = {}
            this.showModal = true
        },
        Edit(r){
            this.role = r
           
          
            this.showModal = true
        },
        Config(r){
            this.role = r
              this.GetRoleACL(r)
            this.showModalConfig = true
        },
        Arrange(r){
            this.role = r
            this.GetRoleUsers(r)
            this.showUserConfig = true
        },
        Patch(e){
            if(Object.keys(e).length <= 1){
                this.showModal = false
                return
            } 
            if(!e.id)
                e.type_id = this.type_id
           
            this.$store.dispatch('entadmin/PatchRole',e).then(role=>{
                this.Success(e.id?'修改成功':'添加完成')
                this.showModal = false
                this.role = {}
            }).catch(e=>{
                this.Error(e)
            })
        },
        Select(item){
            if(item != this.selected)
                this.selected = item
            else
                this.selected = null
        },
        Delete(item){
            var that = this
            this.Confirm(`确定删除角色<span style='margin:0 3px;color:red;'>${item.name}</span>?`,()=>{
                 that.$store.dispatch('entadmin/RemoveRole',item.id).then(e=>{
                that.Success('删除成功')
            }).catch(e=>{
                that.Error(e)
            })
            })
        },
        handleChangeRole(e){
          
            let role = this.roles.find(v=>v.id == e)
              this.Config(role)
        },
        onSavePermission(){
            let data = Object.keys(this.updated_acl).map(v=>({
                key: v,
                value: this.updated_acl[v]
            }))

            if(data.length == 0){
                this.showModalConfig = false
                return
            }


            this.Confirm('确定保存修改?',()=>{
                this.api.entadmin.PATCH_ROLES(data,{param:{id:this.role.id},query:{q:'acl'}}).then(res=>{
                    this.$set(this,'acl',Object.assign({},this.acl,this.updated_acl))
                    this.$set(this,'updated_acl',{})
                    this.$forceUpdate()
                    this.Success('保存成功')
                }).catch(e=>{
                    this.Error('保存失败:'+e)
                })
                
            })
        },
        onCancelPermission(){
            this.showModalConfig = false
        },
        onListEvent(e){
            console.log(e)
            if(e.event && e.event.type == 'switch'){
                if(this.acl[e.param.id] != undefined)
                    if(e.event.value != this.acl[e.param.id])
                        this.$set(this.updated_acl,e.param.id,e.event.value)
                    else
                        this.$set(this.updated_acl,e.param.id,undefined)
                else{
                     if(e.event.value != e.param.value)
                        this.$set(this.updated_acl,e.param.id,e.event.value)
                    else
                        this.$set(this.updated_acl,e.param.id,undefined)
                }
            }
            this.$forceUpdate()
        },
        onEnableAllPermission(){
            this.ValuedPermissions.forEach(v=>{
                if(this.acl[v.id]==undefined || this.acl[v.id] == true)
                    this.$delete(this.updated_acl,v.id)
                else
                    this.$set(this.updated_acl,v.id,true)
            })
            console.log(this.updated_acl)
            this.$forceUpdate()
        },
        onDisabledAllPermission(){
             this.ValuedPermissions.forEach(v=>{
                if(this.acl[v.id] != false)
                     this.$set(this.updated_acl,v.id,false)
                else
                    this.$delete(this.updated_acl,v.id)
            })
              console.log(this.updated_acl)
             this.$forceUpdate()
        },
        onGoBackPermission(){
            this.ValuedPermissions.forEach(v=>{
                 this.$delete(this.updated_acl,v.id)
            })
              console.log(this.updated_acl)
            this.$forceUpdate()
        }
    }
}
</script>
<style lang="less" scoped>
.l-toolbox{
    border-bottom:1px solid #dfdfdf;
    padding:10px;
    .l-tool{
        text-align: center;
        width:50px;
        height:100%;
        padding:5px 0;
        margin:0 5px;
        font-size:12px;
        color:#aaa;
        cursor: pointer;
        .label{
            margin-top:3px;
        }
    }
    .l-tool:hover{
        color:rgb(41, 191, 255);
    }
}
.l-status{
    padding:5px;
    font-size:12px;
    color:#aaa;
    border-top:1px solid #dfdfdf;
}
</style>