<template>
  <div class="hs-container hs-container-scroll">
        <Alert style="margin:10px;" show-icon>系统基础的类型数据都在此页进行配置,您可以对非系统类型进行修改并制定标识颜色</Alert>
       <Row :gutter="10" style="margin:5px;">
        <Col :span="4">
       <Card title="类型列表" icon='md-list'>
          <hs-tree :data="keys" selection="selectedKey" @on-select='selectedKey=$event' />
        </Card>
        </Col>

        <Col :span='20'>
      <Card :padding="0">
            <div slot="title" style='padding:4px 2px;color:#083964;font-size:16px;'><Icon type='ios-pricetag' style='margin-right:5px' /> {{selectedKey.name || "未选择"}} ({{selectedKey.count || 0}})</div>
            <hs-toolbar :data="tools" :enabled="ToolEnabled" @event="onEvent" v-show="selectedKey&&selectedKey.id" />

            <hs-list :data="getTypes(selectedKey.key)" :option="{tmpl:'BaseType'}" selectable='multiple' style='border:none' />
      </Card>
      </Col>
      </Row>

      <!-- Modal -->
       <hs-modal-form
        ref="form"
         v-model="showModal" :width="420" :title="current && current.id?'修改信息':'新增类型'" style="margin:10px" :form="typeForm" :data="model"  editable  @on-submit="Patch" @on-event='handleEvent'
      />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    
    data(){
        return {
            loading:false,
            showModal:false,
            current:undefined,
            selection:[],
            model:{},
            multiple:false,


            editingItem:{},
            selectedKey:{},
            tools:[{
                key:'add',
                name:'添加',
                icon:'md-add'
            },{
                key:'delete',
                name:'删除',
                icon:"md-trash"
            },{
                key:'edit',
                name:'修改',
                icon:"md-create"
            },
            // {
            //     key:'select-all',
            //     name:'全选',
            //     icon:'md-checkmark-circle'
            // },{
            //     key:'clear-all',
            //     name:'清除',
            //     icon:'md-checkmark-circle-outline'
            // }
            ],
            type_col:[{
                type:'index',
                title:'序号',
                width:60
            },{
                type:'text',
                key:'name',
                title:"名称",
                width:200
            },{
                type:'color',
                title:"标识色",
                key:'color',
                width:80
            }
                
            ],
            typeForm:{
              layout:`<Row  :gutter="10"><Col :span="12">{{name}}</Col><Col :span="6">{{icon}}</Col><Col :span="6">{{color}}</Col></Row>`,
              def:{
                name:{
                  label:"类型名称",
                  control:"input",
                  option:{
                    maxlen:16,
                    required:true
                  }
                },
                icon:{
                    label:"图标",
                    control:"select",
                    option:{
                        type:"icon",
                        options:['md-tag','md-star'],
                        defaultValue:'md-tag'
                    }
                },
                color:{
                  label:"颜色",
                  control:"select",
                  option:{
                    type:"color",
                    defaultValue:"#333333"
                  }
                }
              
            }
            }
        }
    },
    computed:{
        ...mapGetters("core",['types','keys','getTypes']),
        ToolEnabled(){
            if(this.selectedKey.data == null){
                return false
            }
            let selection = this.selection
            let add = this.selectedKey.add
            let del = this.selectedKey.del
            let edit = this.selectedKey.edit
            let permit = []
            if(selection && selection.length > 0)
            {
                edit = selection[0].edit
                del = selection[0].del
                permit =  [add,del,edit]
            }else{
                permit =  [add,0,0]
            }

            if(permit.join('').includes('1'))
                return permit
        }
    },
    methods:{
        Select(r){
            const multiple = false
            if(multiple){
                if(this.selection.includes(r))
                {
                    this.selection.splice(this.selection.findIndex(v=>r==v),1)
                }else{
                    this.selection.push(r)
                }
            }else{
                if(this.selection && this.selection[0] == r)
                    this.selection = []
                else
                    this.selection = [r]
            }
        },
        Patch(e){
             if(!e.id){
                 e.parent_id = this.selectedKey.id
             }
             this.$store.dispatch('type/Patch',e).then(item=>{
                this.Success(e.id?'类型已修改':'类型已创建')
                this.showModal = false
            }).catch(e=>{
                this.Error(e)
            })
        },
        onEvent(e){
            var that = this
            if(e == 'add'){
                this.showModal = true
                this.model = {}
            }else  if(e == 'delete'){
                this.Confirm(`确定要删除<span style='color:red;margin:0 5px;'>${this.selection.map(v=>v.name).join(',')}</span>共${this.selection.length}个类型?`,()=>{
                    that.$store.dispatch('type/Delete',this.selection.map(v=>v.id)).then(res=>{
                        this.Success("删除成功")
                    }).catch(e=>{
                        this.Error(e)
                    })
                })
            }else if(e == 'select-all'){
                this.selection = this.getTypes(this.selectedKey.id)
            }else if(e == 'clear-all'){
                this.selection = []
            }else if(e == 'edit'){
                this.model = this.selection[0]
                this.showModal = true
            }
        }
    }
}
</script>
<style lang="less" scoped>
.l-list-item-type{
    min-width:120px;
    height:40px;
    margin:5px;
    padding:10px;
    display: flex;
    align-items: center;
    border:1px solid #dfdfdf;
    i{
        max-width: 20px;
        width:20px;
        margin-right:10px;
    }
}

.l-system{
    border-color:#aaa;
    background:#cef;
}
</style>