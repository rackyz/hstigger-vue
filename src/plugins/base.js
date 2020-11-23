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

// Predefined Some Easy Prompt Methods based on iview
Vue.prototype.Confirm = function (content, cb) {
    this.$Modal.confirm({
        title: '操作确认',
        content,
        onOk: cb
    })
}

Vue.prototype.Success = function (content) {
        this.$Notice.success({
            title: '操作成功',
            desc: content
        })
    },

Vue.prototype.Error = function (content) {
    var that = this
    setTimeout(() => {
        that.$Modal.error({
            title: "错误",
            content
        })
    }, 1000)
}
// API transfer
Object.entries(Clients).forEach(([k,v])=>{
    Vue.prototype[k] = v
})

Vue.prototype.RouteTo = function (path, newtab = false) {
    if (newtab) {
        let routerUrl = this.$router.resolve({
            path
        });
        window.open(routerUrl.href, "_blank");
    } else {
        if(this.$route.path != path)
            this.$router.push(path)
    }


}

Vue.directive('transfer',{
    inserted:el=>{
        el.parentElement.removeChild(el)
        document.body.appendChild(el)
        
    }
})

process.env.VUE_APP_MOCK && require('../../mock/index.js')

Vue.config.productionTip = false

export default Vue