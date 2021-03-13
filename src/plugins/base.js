// BASE SETTING to VUE


// Imports
const Vue = require('vue')
const PuzzleVerification = require('vue-puzzle-verification')
import Clients from './axios'
import moment from 'moment'
import SplitPane from 'vue-splitpane'
import API from './api'
// Setup PuzzleVerification plugins
Vue.use(PuzzleVerification)
Vue.prototype.moment = moment
Vue.component('split-pane', SplitPane)
Vue.prototype.Download = function(url){

   let a = document.createElement("a")
   a.href = url
   a.download = "download"
   a.target = "blank"

   document.body.appendChild(a)

   a.click()
   a.remove()
}

Vue.prototype.$Notice.config({
    top:50,
    duration:3
})

Vue.prototype.$bus = new Vue()
// Predefined Some Easy Prompt Methods based on iview
Vue.prototype.Confirm = function (content, cb, cb2, option={}) {
    this.$Modal.confirm({
        title: '操作确认',
        content,
        onOk: cb,
        onCancel: cb2,
        ...option
    })
}

// Vue.prototype.Success = function (content) {
//         this.$Notice.success({
//             title: '操作成功',
//             desc: content
//         })
//     },

// Vue.prototype.Error = function (content) {
//     var that = this
//     setTimeout(() => {
//         that.$Modal.error({
//             title: "错误",
//             content
//         })
//     }, 1000)
// }

Vue.prototype.Form = (form_name,init_func) => {
    let form = null
    try{
        form = require('@/forms/'+form_name)
    }catch(e){
        console.error('Form Load Error:',e)
    }
    
    if(form){
      if(init_func){
        return init_func(form.default || form)
      }else{
        return form.default || form
      }
    }

}

// API transfer
Object.entries(Clients).forEach(([k,v])=>{
    Vue.prototype[k] = v
})
import gzTable from '../plugins/old/table'
Vue.component("gzTable", gzTable)

Vue.prototype.RouteTo = function (path, newtab = false) {
    if(!path)
        return
    if (newtab) {
        if(!path.includes('http')){
            let routerUrl = this.$router.resolve({
                path
            });
            window.open(routerUrl.href, "_blank");
        }else{
            window.open(path, "_blank");
        }
        
    } else {
        if(!path.includes('http')){
            
            if(this.$route.path != path)
                this.$router.push(path)
        }else{
            window.location.href = path
        }
    }


}
function getBlob(url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "blob";
  xhr.onload = function () {
    if (xhr.status === 200) {
      cb(xhr.response);
    }
  };
  xhr.send();
    // console.log("URL:",url,API.SERVER)
    // axios.get({
    //     url,
    //     method:'GET',
    //     responseType: 'blob'
    // }).then(res=>{
    //     console.log("ok")
    //     cb(res)
    // }).catch(e=>{
    //     console.error('errpr:',e)
    // })
}

/**
 * 保存
 * @param  {Blob} blob
 * @param  {String} filename 想要保存的文件名称
 */
function saveAs(blob, filename) {
    console.log("save:",blob)
  if (window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveBlob(blob, filename);
  } else {
    var link = document.createElement("a");
    var body = document.querySelector("body");

    link.href = window.URL.createObjectURL(blob);
    link.download = filename;

    // fix Firefox
    link.style.display = "none";
    body.appendChild(link);

    link.click();
    body.removeChild(link);

    window.URL.revokeObjectURL(link.href);
  }
}

/**
 * 下载
 * @param  {String} url 目标文件地址
 * @param  {String} filename 想要保存的文件名称
 */
function download(url, filename) {
  getBlob(url, function (blob) {
    saveAs(blob, filename);
  });
}


Vue.prototype.DownloadWithName = download 

Vue.directive('transfer',{
    inserted:el=>{
        el.parentElement.removeChild(el)
        document.body.appendChild(el)
        
    }
})

Vue.directive('tableDrag', {
  inserted: function () {
    let el = document.getElementsByClassName('ivu-table-body')[0];
    el.style.cursor = 'grab';
    el.onmousedown = function () {
      let gapX = event.clientX;
      let gapY = event.clientY
      let startX = el.scrollLeft;
      let startY = el.scrollTop
      document.onmousemove = function (e) {
        let x = e.clientX - gapX;
        let y = e.clientY - gapY
        el.scrollLeft = startX - x;
        el.scrollTop = startY - y
        return false;
      };
      document.onmouseup = function (e) {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  }
});

process.env.VUE_APP_MOCK && require('../../mock/index.js')

Vue.config.productionTip = false

export default Vue