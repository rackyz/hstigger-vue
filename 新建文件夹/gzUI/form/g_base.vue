<template>
<div class='gz-form-item' :class="`${focused?'gz-form-item-focused':''} ${!editable?'gz-disabled-item':''}`" >
     <span class='gz-label'  :class="focused || !empty?'':'gz-label-empty'" v-if="label">
        {{label}} <span class="gz-require" v-show="required">*</span>
    </span>
    <span class="gz-clear" v-show="editable && clearable && !empty">
        <Icon type="md-close" @click.stop="onClear" />
    </span>
    <span class="gz-error" v-if="error">{{error}}</span>
    <div class="gz-form-content">
    <slot></slot>
    </div>
</div>
</template>
<script>
export default {
    props:{
        focused:{
            type:Boolean
        },
        index:{
            type:[Number,String]
        },
        label:{
            type:String
        },
        empty:{
            type:Boolean
        },
        editable:{
            type:Boolean
        },
        clearable:{
            type:Boolean
        },
        required:{
            type:Boolean
        },
        error:{
            type:String
        }
    },
    methods:{
        onClear(){
            this.$emit('clear')
        }
    }
}
</script>
