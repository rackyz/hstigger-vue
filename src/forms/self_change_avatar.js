export default {
  def: {
    avatar: {
      label: "头像",
      editable: true,
      control: "avatar",
      option:{
        uploader:"core/upload"
      }
    },
  },
  layout: `<div>
  <div style='height:100px;width:100px;margin:10px;'>{{avatar}}</div>
  
  </div>`,

  option: {
    hideReset:true
  }
}