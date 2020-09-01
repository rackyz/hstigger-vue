// BASE SETTING to VUE


// Imports
import Vue from 'vue'
import PuzzleVerification from 'vue-puzzle-verification'
// Setup PuzzleVerification plugins
Vue.use(PuzzleVerification)

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

Vue.prototype.RouteTo = function (path, newtab = false) {
    if (newtab) {
        let routerUrl = this.$router.resolve({
            path
        });
        window.open(routerUrl.href, "_blank");
    } else {
        this.$router.push(path)
    }


}

Vue.directive('transfer',{
    inserted:el=>{
        el.parentElement.removeChild(el)
        document.body.appendChild(el)
        
    }
})

console.log("PLUGINS INIT SUCCESS")

export default Vue