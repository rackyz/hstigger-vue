<template>
  <div style='position:relative;height:100%;'>

    <div
      style='margin:10px;border:none;border-radius:0;position:relative;height:100%;overflow-y:auto;'
      padding='0'
    >

      <div style='background:#fff;position:absolute;top:0;left:0;right:0;height:110px;z-index:100;'>
        <div style='padding:10px;border-bottom:1px solid #dfdfdf;'>
          <Icon type='md-person' /> 用户管理</div>

        <hs-toolbar
          :data="tools"
          @event='onEvent'
          :enabled='toolEnabled'
        />

        <a
          href="https://cdn-1301671707.cos.ap-nanjing.myqcloud.com/download/hs_user_template.xlsx"
          style='position:absolute;right:10px;top:85px;font-size:14px;color:#63738c;'
        >
          <Icon type='md-download' /> 下载导入用表格模板</a>

      </div>
      <div class="hs-fulltable" style='padding-top:108px;height:calc(100% - 20px);overflow:hidden;position:relative;'>
        <hs-list
          :data="filterdUsers"
          style="border:none;width:100%;margin:0;max-height:calc(100% - 86px);overflow:hidden;"
          :selectable="multiple?'multiple':'single'"
          :option="{tmpl:'BaseUser',modes}"
          @event="onUserEvent"
        >
          <div
            class='filter-wrap'
            style='padding:5px;'
            @click="selected=null"
          >
            <ButtonGroup style='margin-right:5px;'  v-show='multiple'><Button
                @click='selected=filterdUsers || []'
               
              >全选</Button><Button
             
                @click='selected=[]'
              >清空</Button></ButtonGroup>
            <Button
              style='margin-right:5px;'
              type='error'
              v-show='multiple'
              @click='multiple=false'
            >结束批量操作</Button>
            <Input
              v-model='searchText'
              search
              style='width:200px'
              clearable
            />
            <ButtonGroup style='margin-left:5px;'><Button
                :type='hidingLocked?"primary":""'
                @click='hidingLocked=!hidingLocked'
              >隐藏已禁用</Button>
            </ButtonGroup>
            <Button
              :type='showUnsafe?"primary":""'
              @click='showUnsafe = !showUnsafe'
              style='margin-left:5px;'
            >密码未修改
            </Button>
          </div>

        </hs-list>
    
        <div style='height:50px;background:#fff;display:flex;justify-content:center;border-top:1px solid #dfdfdf;align-items:center;'>

          <Page
            :total="filterdUsers.length"
            size="small"
            :page-size="100"
            :page-size-opts="[20,50,100]"
            show-elevator
            show-sizer
            show-total
          />
        </div>
       
      </div>
    </div>

    <hs-modal-form
      ref="form"
      :title="(current && current.id?'修改信息':'新增用户')"
      v-model="showModal"
      :width="420"
      style="margin:10px"
      :form="user_form"
      :data="current"
      editable
      @on-submit="patchUser"
      @on-event='handleEvent'
    />

    <hs-modal-form
      ref="formpwd"
      :title="`修改密码:${selected?selected.name:''}`"
      v-model="showModalPassword"
      :width="320"
      style="margin:10px"
      :form="user_password_form"
      :data="current"
      editable
      @on-submit="patchUserPassword"
      @on-event='handleEvent'
    />

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
        <p style='color:#333;margin-bottom:0.25rem;font-size:14px;text-align:left;padding:5px 30px;padding-top:15px;'>{{importStateStr}}</p>
        <div style='text-align:left;padding:10px;font-size:12px;max-height:300px;overflow-y:auto;background:#fff;padding:10px;margin:10px 30px;'>
          <p
            v-for='(u,i) in importData'
            :key='u.name'
          >
            [{{i+1}}] {{u.user}} / {{u.name}}
            <template v-if='u.state == undefined'>
              <span
                style='float:right;'
                :style='`color:${TestImportState(u)?"red":"green"}`'
              >{{TestImportState(u)?TestImportState(u):'可导入'}}</span>
            </template>
            <template v-else>
              <span
                style='float:right;'
                :style='`color:${u.state?"red":"blue"}`'
              >{{u.state?'创建失败':'创建成功'}}</span>
            </template>
          </p>

        </div>
        <Button
          style='height:40px;margin:10px;width:90%;'
          @click='importAllUsers'
          v-if='importState == 2 && importData && importData.length'
          :disabled='importableUsers.length == 0'
          :loading='loadingImport'
        >导入账号({{importableUsers.length}})</Button>
      </div>

      <input
        ref='fileLoader'
        v-show='false'
        type='file'
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,*.csv"
        @change='parse'
      />
    </Modal>

  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import XLSX from 'xlsx'
export default {
  data() {
    return {
      loadingImport: false,
      selected: null,
      loading: false,
      hidingLocked: false,
      importData: [],
      searchText: null,
      showUnsafe: false,
      multiple: false,
      showModal: false,
      showModalPassword: false,
      modalImporting: false,
      importStateStr: "",
      importState: 0,
      importStates: [],
      modes: [
        
        { 
            type: 'table', 
            tmpl: [
              { type: 'index', title: '序号' },
               { type: 'text', key: 'user', width: 150, title: '用户名' }, 
              { type: 'text', key: 'name', width: 80, title: '名称' }, 
                { type: 'text', key: 'phone', width: 150, title: '联系电话' }, 
                 { type: 'state', title: '用户等级', key: 'level', width: 120,option:{states: ['游客','合作单位','实习','员工','老员工','管理层','董事长','顾问']} },
              { type: 'state', title: '密码安全', key: 'passweak', width: 80, option:{states: ['未修改', '已修改']} },
             
              { type: 'state', title: '账号状态', key: 'state', width: 80,option:{states: ['锁定', '正常']} },
              { type: 'list', title: '角色权限', key: 'roles',width:200,option:{states: ['锁定', '正常']} },
              { type: 'list', title: '所属部门', key: 'deps', width:200,option:{states: ['锁定', '正常']} },
              { key: 'last_login_at', type: 'time',width:150,title: "最后登录" }
            ], 
            icon: 'md-calendar' 
        }],
      current: {},
      tools: [
        {
          key: 'add',
          name: '新增',
          icon: 'md-add'
        }, {
          key: 'edit',
          name: '编辑',
          icon: "md-create"
        }, {
          key: 'delete',
          name: '删除',
          icon: "md-trash"
        }, {
          key: 'resetpwd',
          name: "重置密码",
          icon: 'md-key'
        }, {
          key: 'resetpwdto',
          name: "修改密码",
          icon: 'ios-key'
        }, {
          key: 'lock',
          name: "禁用",
          icon: 'md-lock'
        }, {
          key: 'unlock',
          name: "启用",
          icon: 'md-unlock'
        }, {
          key: 'import',
          name: "导入",
          icon: 'ios-folder-open'
        }, {
          key: 'multiple',
          name: "批量操作",
          icon: 'ios-people'
        }, {
          key: 'refresh',
          name: "刷新",
          icon: 'md-refresh'
        }],
    }
  },
  mounted() {
    this.getData()
  },
  computed: {
    ...mapGetters('core', ['deps', 'roles']),
    ...mapGetters('admin', ['users']),
    toolEnabled() {
      if (this.multiple) {
        if (this.selected && this.selected.length > 0) {
          return [1, 0, 1, 1, 0, this.selected.state == 0, this.selected.state == 1, 1, 0, 1, 1]
        } else {
          return [1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1]
        }
      } else {
        if (this.selected)
          return [1, 1, 1, 1, 1, this.selected.state == 0, this.selected.state == 1, 1, 1, 1]
        else
          return [1, 0, 0, 0, 0, 0, 0, 1, 1, 1]
      }

    },
    user_password_form() {
      return {
        layout: "<div><Row><Col :span='24'>{{password}}</Col></Row><Row style='margin-top:10px'><Col :span='24'>{{passwordAgain}}</Col></Row></div>",
        def: {
          password: {
            label: "输入密码",
            control: "input",
            option: {
              type: 'password',
              require: true
            }
          },
          passwordAgain: {
            label: "密码确认",
            control: "input",
            option: {
              type: 'password',
              require: true
            }
          }
        }
      }
    },
    user_form() {
      return {
        def: {
          user: {
            label: "登录名",
            editable: true,
            control: "input",
            option: {
              required: true,
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
              getters: 'core/roles',
              multiple: true
            }
          },
          avatar: {
            label: "头像",
            editable: true,
            control: "image"
          },
          deps: {
            label: "部门",
            control: "select",
            option: {
              getters: 'core/deps',
              multiple: true
            }
          },
          phone: {
            label: "电话",
            control: "input"
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
    filterdUsers() {
      return this.users.filter(v => {
        if (this.searchText && (!v.name || !v.name.includes(this.searchText.trim())) && (!v.user || !v.user.includes(this.searchText.trim())))
          return false

        if (this.showUnsafe && !v.passweak)
          return false

        if (this.hidingLocked && v.state != 0)
          return false

        return true
      }) || []
    },
    importableUsers() {
      return this.importData.filter(v => !this.TestImportState(v))
    }
  },
  methods: {
    TestImportState(user) {
      if (this.users.find(v => v.user == user.user))
        return '用户名重复'
      else if (this.users.find(v => v.phone == user.phone))
        return '电话号码重复'
    },
    onSelectAll() {
      this.selected = this.filterdUsers
    },
    onUserEvent(e) {
      console.log(e)
      if(e && e.type == 'select')
        this.selected = e.param
    },
    onSelect(e) {
      if (this.multiple) {
        let index = this.selected.findIndex(v => v.id == e.id)
        if (index != -1)
          this.selected.splice(index, 1)
        else
          this.selected.push(e)
      } else {
        if (this.selected == e)
          this.selected = null
        else
          this.selected = e
      }
    },
    importAllUsers() {
      var that = this
      this.loadingImport = true
      let users = this.importData.filter(v => !this.TestImportState(v))
      this.$store.dispatch('admin/CreateUsers', users).then(results => {

        let succees = results.filter(v => v == 0)
        let map = {}
        that.importStateStr = `导入完毕,成功导入${succees.length}个账户`
        that.importStates = results
        users.forEach((v, i) => {
          v.state = results[i].id ? 0 : 1
        })
        that.importState = 3
      }).catch(e => {
        this.Error(e)
        this.modalImporting = false
        this.getData()
      }).finally(e => {
        this.loadingImport = false
      })
    },
    GetStateColor(s) {
      if (s == 0)
        return 'yellowgreen'
      else if (s == 1)
        return 'darkred'
      else
        return 'orange'
    },
    GetStateText(s) {
      if (s == 0)
        return '正常'
      else if (s == 1)
        return '禁用'
      else
        return '锁定'
    },
    getData() {
      this.loading = true
      this.$store.dispatch('admin/ListUsers').then(res => {

      }).finally(e => {
        this.loading = false
      })
    },
    onEvent(e) {
      var that = this
      if (e == 'add') {
        this.current = null
        this.showModal = true
      } else if (e == 'edit') {
        this.current = this.selected
        this.showModal = true
      } else if (e == 'refresh') {
        this.getData()
      } else if (e == 'lock') {
        this.$store.dispatch('admin/LockUser', this.selected.id)
      } else if (e == 'unlock') {
        this.$store.dispatch('admin/UnlockUser', this.selected.id)
      } else if (e == 'resetpwd') {
        if (this.multiple) {
          this.Confirm(`确定要重置<span style="color:red">${this.selected.join(',')}等${this.selected.length}</span>用户的密码?`,
            () => this.$store.dispatch('admin/Resetpassword', this.selected.map(v => v.id))
          )
        } else {
          this.Confirm(`确定要重置用户<span style="color:red">${this.selected.name}</span>的密码?`,
            () => this.$store.dispatch('admin/Resetpassword', [this.selected.id])
          )
        }
        this.$store.dispatch('admin/ResetPassword', { id: this.selected.id })
      } else if (e == 'resetpwdto') {
        this.showModalPassword = true
      } else if (e == 'delete') {
        this.Confirm(this.multiple ? `确定要删除<span style='color:red;margin:0 2px;font-weight:bold'>${this.selected.slice(0, 3).map(v => v.name).join(', ')}</span>等${this.selected.length}个账号` : `确定要删除该用户${this.selected.name}?`, () => {
          if (this.multiple) {
            this.$store.dispatch('admin/DeleteUsers', that.selected.map(v => v.id)).then(res => {
              this.Success('删除成功')
            }).catch(e => {
              this.Error(e)
            })
          } else {
            this.$store.dispatch('admin/DeleteUser', that.selected.id).then(res => {
              this.Success('删除成功')
            }

            ).catch(e => {
              this.Error(e)
            })
          }
        })
      } else if (e == 'import') {
        this.$refs.fileLoader.click()

      } else if (e == 'multiple') {
        this.multiple = true
        this.selected = []
      } else if (e == 'unmultiple') {
        this.multiple = false
        this.selected = null
      }
    },

    file2Xce(file) {
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
      var that = this
      this.modalImporting = true
      this.importStateStr = "正在分析文件... 请耐心等待"
      // 打开loading对话框

      this.file2Xce(file).then(tabJson => {

        if (tabJson && tabJson.length > 0) {
          that.importStateStr = "正在上传数据..."
          let users = tabJson[0].sheet.map(v => ({
            name: v['姓名'],
            phone: v['电话'],
            password: v['密码'],
            user: v['电话']
          }))
          that.importStateStr = `已从文件中提取${users.length}个账号`
          that.importState = 2
          that.importData = users
        }
      }).finally(e => {
        that.$refs.fileLoader.value = ''
      })
    },
    patchUserPassword(item) {
      var that = this
      if (item.password != item.passwordAgain) {
        this.$refs.formpwd.setError('passwordAgain', '两次密码不一致,请检查')
        return
      }

      if (this.selected && this.selected.id) {
        item.id = this.selected.id
        this.$store.dispatch('admin/ResetPassword', item).then(res => {
          that.Success('修改成功')
          that.showModalPassword = false
        }).catch(e => {
          that.Error(e)
        })
      }


    },
    patchUser(item) {
      console.log('patch:', item)
      var that = this
      if (this.current && this.current.id) {
        item.id = this.current.id
      }
      this.$store.dispatch('admin/PatchUser', item).then(res => {
        that.Success(item.id ? "修改成功" : "新增用户成功")
        that.showModal = false
        that.current = {}
      }).catch(e => {
        if (typeof (e) == "string" && e.includes('{')) {
          e = JSON.parse(e)
          if (e.key) {
            that.$refs.form.setError(e.key, e.error)
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
.description {
  display: flex;
  align-items: center;
}
.state-mark {
  width: 9px;
  height: 9px;
  margin-right: 5px;
}

.list-item {
  padding: 15px !important;
}

.list-item:hover {
  background: linear-gradient(to right, #fff, #ffe);
}
</style>