// BASE SETTING to VUE


// Imports
const Vue = require('vue')
const PuzzleVerification = require('vue-puzzle-verification')
import Clients from './axios'
import moment from 'moment'
// Setup PuzzleVerification plugins
Vue.use(PuzzleVerification)
Vue.prototype.moment = moment

Vue.prototype.Download = function(url){

   let a = document.createElement("a")
   a.href = url
   a.download = "download"

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
// API transfer
Object.entries(Clients).forEach(([k,v])=>{
    Vue.prototype[k] = v
})

Vue.prototype.RouteTo = function (path, newtab = false) {
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