export default {
  layout:`<Row  :gutter="10"><Col :span="18">{{name}}</Col><Col :span="6">{{color}}</Col></Row>`,
  def: {
    parent_id: {
      label: "上级部门",
      control: "select",
      option: {
        editable: false,
        getters: "user/deps",
        defaultValue: 0
      }
    },
    name: {
      label: "部门名称",
      control: "input",
      option: {
        maxlen: 16,
        required: true
      }
    },
    color: {
      label: "颜色",
      control: "color",
      option: {
        defaultValue: "#333333"
      }
    }
  },
  option: {
    hideReset: true,
    hideLabel: true
  }
}