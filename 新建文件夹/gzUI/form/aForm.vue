<template>
  <gzForm :form='form' :data="data" @on-submit="onSubmit" editable />
  
</template>

<script>
import gzForm from './index'
import {mapGetters, mapActions} from 'vuex'
export default {
    data(){
        return {
            form:{}
        }
    },
    mounted(){
        this.$nextTick(v=>{
            this.get(this.id)
        })
    },
    props:{
        id:{
            type:String
        },
        data:{
            type:Object,
            default:{}
        },
        "footer-hide":{
            type:Boolean
        }
    },
    watch:{
        id:{
            handler(v){
                 this.get(this.id).then(res=>{
                      let formObject = this.getFormById(this.id)
                    console.log('formObject:',formObject)
                    if(!formObject)
                            return

                    let option = JSON.parse(this.makePlatJSON(formObject.option))
                        option.hideAction = true
                        console.log('hideAction:',option.hideAction)
                        if(formObject){
                            this.form = {
                                def: JSON.parse(this.makePlatJSON(formObject.def)),
                                layout:formObject.layout,
                                option:option,
                                events:JSON.parse(this.makePlatJSON(formObject.events)),
                            }
                        }
                    this.$forceUpdate()
                 })
               
            }
        }
    },
    computed:{
        ...mapGetters('form',['getFormById'])
    },
    components:{
        gzForm
    },
    methods:{
        ...mapActions('form',['get']),
        makePlatJSON(t){
            if(t)
                return '{'+t.replace(/\s\t/,"")+'}'
            else
                return '{}'
        },
    }
}
</script>

<style>

</style>