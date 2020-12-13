const NodeStateTypes = [{
  id: 0,
  key: "initing",
  name: "初始化",
  color: "skyblue"
}, {
  id: 1,
  key: "active",
  name: "等待处理",
  color: "#aaa"
}, {
  id: 2,
  key: "submitted",
  name: "已提交",
  color: "orange"
}, {
  id: 3,
  key: "rejected",
  name: "已拒绝",
  color: "darkred"
}, {
  id: 4,
  key: "accepted",
  name: "已接受",
  color: "yellowgreen"
}, {
  id: 5,
  key: "retrying",
  name: "修改中",
  color: "oranged"
}, {
  id: 6,
  key: "processing",
  name: "处理中",
  color: "yellow"
}, {
  id: 7,
  key: "process_ok",
  name: "处理完毕",
  color: 'yellowgreen'
}, {
  id: 8,
  key: "process_failed",
  name: "处理失败",
  color: "red"
}, {
  id: 9,
  key: "freezed",
  name: "已冻结",
  color: "skyblue"
}, {
  id: 10,
  key: "closed",
  name: "已关闭",
  color: "skyblue"
}]

const ActionTypes = [{
  id: 0,
  key: "init",
  name: "初始化",
  color: 'red'
}, {
  id: 1,
  key: "submit",
  name: "提交",
  color: "yellowgreen"
}, {
  id: 2,
  key: "reject",
  name: "拒绝",
  color: "darkred"
}, {
  id: 3,
  key: "accept",
  name: "接收",
  color: "yellowgreen"
}, {
  id: 4,
  key: "process",
  name: "处理",
  color: "orange"
}, {
  id: 5,
  key: "retry",
  name: "重试",
  color: "orange"

}, {
  id: 6,
  key: "close",
  name: "关闭(支线)"
}, {
  id: 7,
  key: "pass",
  name: "跳过"
}]


const MapKey = (types) => {
  let o = {}
  types.forEach(v => {
    o[v.key] = v.id
  })
  return o
}

const GetType = (types, id) => {
  return types.find(v => v.id == id)
}

export const NODE_STATES = MapKey(NodeStateTypes)
export const ACTION_TYPES = MapKey(ActionTypes)

export default {
  MapKey,
  GetActionType:t=>GetType(ActionTypes,t),
  GetNodeState:t=>GetType(NodeStateTypes,t),
  NODE_STATES,
  ACTION_TYPES
}
