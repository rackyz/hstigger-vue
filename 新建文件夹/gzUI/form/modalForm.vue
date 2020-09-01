<template>
  <Modal v-model="value" footer-hide :class="error?'l-modal-error':''" :width="width || 400" :title="title" @on-cancel="onCancel">
      <gzForm ref="form" :form="form" style="margin:10px;" editable :data="data" @on-submit="onSubmit" v-on:error-submit="onError"  @on-reset="error=false" />
  </Modal>
</template>

<script>
import gzForm from '@refs/gzUI/form/index'
export default {
    data(){
        return {
            error:false,
        }
    },
    props:{
        value:{
            type:Boolean,
        },
        title:{
            type:String
        },
        width:{
            type:Number
        },
        form:{
            type:Object
        },
        data:{
            type:Object
        }
    },
    components:{
        gzForm
    },
    methods:{
        onSubmit(e){
            this.$emit('on-submit',e)
        },
        setError(key,error){
           
            this.$refs.form.setError(key,error)
        },
        onError(e){
            if(typeof e == 'object' && Object.keys(e).length > 0)
                this.error = true
            else
                this.error = false
        },onCancel(){
            this.error = false
            this.$emit('input',false)
        }
    }
}
</script>