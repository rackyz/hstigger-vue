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
   .name{
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

.ivu-tabs-tab-active{
   border-color:#aaa;
}

.ivu-tabs-tabpane{
    border:1px solid #dfdfdf;
    border-top:none;
}

.l-list-item-card-selected{
    border:2px solid rgb(101, 102, 102) !important;
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
</style>
<template>
  <div class="hs-container" >
       <Row :gutter="10" style="margin:5px;">
          <Col :span='24'>
          <Tabs type="card" :value="type_id" :animated="false" @on-click='type_id=$event' >
                <TabPane :label="`基本角色(${getRoles(11).length})`" :name="11" style="background:#fff;padding:10px;">
                    <Alert  show-icon closable>
        系统通用权限的角色划分，标识用户对于各模块的访问和操作权限
    </Alert>
                    <div class="l-list" style="margin:20px;margin-top:10px;">
                        <template v-for="r in getRoles(11)">
                        <div class="l-list-item-card" :class="{'l-list-item-card-selected':selected == r}" :key="r.id">
                            <Icon :type="r.icon" size='45' :color="r.color" />
                            <div class="name">{{r.name}}</div>
                            <div style="text-align:center"><a href="#" @click="Config(r)">配置</a> | <a href="#" @click="Edit(r)">修改</a><template v-if="r.id>1000"> | <a href="#" @click="Delete(r)">删除</a></template></div>
                            <div style="text-align:center;font-size:12px;color:#aaa">{{r.desc}}</div>
                        </div>
                        </template>
                         
                        <div class="l-list-item-card" style="border:3px dashed #dfdfdf !important;" @click="Add">
                            <Icon type="ios-add" size='80' color="#aaa" style="border:none" />
                             <div class="name" style='margin-top:0px;text-align:center;color:#aaa !important;'>添加角色</div> 
                        </div>
                         
                    </div>

                   

                </TabPane>
                <TabPane :label="`项目角色(${getRoles(12).length})`" :name="12"  style="background:#fff;padding:10px;">
                     <Alert   show-icon closable>
        项目权限划分，对应项目岗位角色分配
    </Alert>
                    <div class="l-list" style="margin:20px;margin-top:10px;">
                        <template v-for="r in getRoles(12)">
                        <div class="l-list-item-card" :key="r.id">
                            <Icon :type="r.icon" size='45' :color="r.color" />
                            <div class="name">{{r.name}}</div>
                            <div style="text-align:center"><a @click="Config(r)">配置</a> | <a @click="Edit(r)">修改</a><template v-if="r.id>1000"> | <a @click="Delete(r)">删除</a></template></div>
                            <div style="text-align:center;font-size:12px;color:#aaa">{{r.desc}}</div>
                        </div>
                        </template>
                         
                        <div class="l-list-item-card" style="border:3px dashed #dfdfdf !important;" @click="Add">
                            <Icon type="ios-add" size='80' color="#aaa" style="border:none" />
                             <div class="name" style='margin-top:0px;text-align:center;color:#aaa !important;'>添加角色</div> 
                        </div>
                         
                    </div>



                </TabPane>
                <TabPane :label="`部门角色(${getRoles(13).length})`" :name="13"  style="background:#fff;padding:10px;">
                     <Alert  show-icon closable>
        部门权限划分，对应部门岗位角色分配
    </Alert>
                    <div class="l-list" style="margin:20px;margin-top:10px;">
                        <template v-for="r in getRoles(13)">
                        <div class="l-list-item-card" :class="{'l-list-item-card-selected':selected == r}" :key="r.id">
                            <Icon :type="r.icon" size='45' :color="r.color" />
                            <div class="name">{{r.name}}</div>
                            <div style="text-align:center"><a @click="Config(r)">配置</a> | <a @click="Edit(r)">修改</a><template v-if="r.id>1000"> | <a @click="Delete(r)">删除</a></template></div>
                            <div style="text-align:center;font-size:12px;color:#aaa">{{r.desc}}</div>
                        </div>
                        </template>
                         
                        <div class="l-list-item-card" style="border:3px dashed #dfdfdf !important;" @click="Add">
                            <Icon type="ios-add" size='80' color="#aaa" style="border:none" />
                             <div class="name" style='margin-top:0px;text-align:center;color:#aaa !important;'>添加角色</div> 
                        </div>
                         
                    </div>

                </TabPane>
            </Tabs>
        
        
      
      </Col>
      
      </Row>
      

      <!-- modal -->
    <hs-modal-form
        ref="form"
        :title="!role.id?'新建角色':'编辑角色'"
        v-model="showModal"
        :width="420"
        style="margin: 10px"
        :form="roleForm"
        :data="role"
        editable
        @on-submit="Patch"
    />

    <Modal v-model="showModalConfig" :title="`配置角色 / ${role.name}`" footer-hide fullscreen>
        <div class="l-toolbox l-list">
                <div class="l-tool">
                    <Icon type="md-document" size="25" />
                    <div class="label">保存</div>
                    </div>
        </div>
       
    </Modal> 
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    
    data(){
        return {
            tabIndex:'basic',
            loading:false,
            showModal:false,
            showModalConfig:false,
            current:undefined,
            selected:null,
           
            depPermissions:[{name:'mod1'}],
            projectPermissions:[{name:'mod2'}],
            archivePermissions:[{name:"mod3"}],
           
            role:{},
            type_id:11,

           selection:[],
        }
    },
    computed:{
        ...mapGetters("admin",['roles','getRoles']),
        tableDef(){
            return {
    key: "user",
    idkey:"gy_id",
    restful: {
        key: "users"
    },
    name: "用户管理",
    desc: "用户管理及权限等操作",
    searcher: {
        containsIn: ['gy_user','gy_name','gy_phone']
    },
    
    filter: {},
    tools: {
        button: ['add']
    },
    beforeUpdate:(item)=>{
        if (item.groups)
            item.groups = JSON.stringify(item.groups)
        if (item.role)
            item.role = JSON.stringify(item.role)
    },
    
    cols: [{
            key: 'id',
            title: '序号',
            type: 'index',
            width: 60
        },  {
            key: 'user',
            title: '用户名',
            type: 'link',
            width: 100,
            event: 'open',
            option:{
                align:"center",
                event:'open'
            }
        }, {
            key: 'id',
            title: '姓名',
            type: 'user',
            width: 150,
            option: {
                getters:"core/users",
                align: "center"
            }
        }, {
            key: 'phone',
            title: '手机号',
            type: 'text',
            width: 150,
             option: {
                 align: "center"
             }
        }, {
            key: 'deps',
            title: '部门',
            type: 'type',
            width:250,
            option:{
                getters:"core/deps",
                multiple:true
            }
        }, {
            key: 'roles',
            title: '角色',
            type: 'type',
            width:120,
            option: {
                 getters: "core/roles",
                multiple: true
            }

        }, {
            key: 'lastlogin_at',
            title: '最近登录',
            type: 'time',
            width: 150,
            option: {
                type: "smart"
            }
        }, {
            key: "state",
            title: "账号状态",
            type: "bool",
            width: 100,
            option:{
                texts:["已启用","已禁用"],
                colors:["green","red"]
            }
        },
        {
            key: "passweak",
            title: "密码状态",
            type: "bool",
            width: 100,
            option: {
                texts: ["更改", "初始"],
                colors: ["green", "red"]
            }
        },
         {
             key: "created_at",
             title: "创建日期",
             type: "time",
             width: 100,
             option: {
                type:'date'
             }
         }, {
             key: "created_by",
             title: "创建人",
             type: "user",
             width: 100,
             option: {
                 getters:"core/users"
             }
         }, {
             key: "tools",
             title: "操作",
             type: "tool",
             buttons: ['edit', 'delete', {
                         label: '详情',
                         event: 'open'
                     }, {
                label:'禁用/启用',
                event:'lock'
             },{
                 label:'重置密码',
                 event:'reset'
             }],
             option: {
                type:"text"
             }
         },
    ],
    pageSize: 100,
    form: {
        def: {
            user:{
                label:"登录名",
                editable:true,
                control:"input",
                option:{
                    required:true,
                    rules: [{
                        type: 'name'
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
    },
    filterData: (items,{
            searchText = ""
        }) => {
        return items.filter(v=>{
             let st = searchText.trim()
             let {name,phone,user} = v
             if (st)
                 if ((name && name.includes(st)) || (phone && phone.includes(st)) || (user && user.includes(st)))
                     return true
                else
                    return false
             return true
        })
       
    },
    editor: {
        width: 430
    },
}
        },
        roles(){
            return this.getRoles(this.type_id)
        },
        user_table() {
           return this.tableDef.cols
        },
        user_form(){
            return this.tableDef.form
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
        this.getData()
    },
    methods:{
        getData(){
            this.$store.dispatch('admin/queryRoles')
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
            this.showModalConfig = true
        },
        Patch(e){
            if(!e.id)
                e.type_id = this.type_id
            console.log("PATCH:",e)
            this.$store.dispatch('admin/patchRole',e).then(role=>{
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
                 that.$store.dispatch('admin/delRole',item.id).then(e=>{
                that.Success('删除成功')
            }).catch(e=>{
                that.Error(e)
            })
            })
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
        padding:0 10px;
        margin:0 10px;
        font-size:12px;
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