<template>
    <div class='l-editor'>
        <Row :gutter='15'>
            <Col :span='6' style='height:400px;'>
            <div class='l-head'>
                    表单配置
                </div>
             <div class='l-content'>
                <gzAttriButes type='object' v-model='form.info' />
                </div>
            </Col>
            
            <Col :span='10' style='height:400px;'>
            <div class='l-head'>
                    表单布局
                </div>
                 <div class='l-content'>
                <Input type='textarea' v-model='form.layout' />
                </div>
            </Col>
            <Col :span='8' style='height:400px;'>
                <div class='l-head'>
                    数据定义
                </div>
                <div class='l-content'>
                <gzAttriButes type='object' v-model='form.def' />
                </div>
            </Col>
            
        
        </Row>
        </div>
    </div>
</template>

<script>
// Advanced: GUI editor
import Controls from './controls'
import gzAttriButes from '@refs/gzUI/attribute/attr.vue'
export default {
    props:{
        form:{
            type:Object,
            default:{}
        }
    },
    components:{
        gzAttriButes
    },
    // computed:{
    //     layout(){
    //        let target = this.form.layout
    //        let first = target.match(/<Row.*>.+(<\/Row>){1}/g)
        
    //        return first
    //     }
    // },
    mounted(){
        console.log(this.layout)
    },
    methods:{

    }
}
</script>

<style lang='less' scoped>
.l-editor{
    width:100%;
    overflow: hidden;
}
.l-head{
    display: flex;
    align-items: center;
    background:#333;
    color:#aaa;
    padding:0 0.5rem;
}

.l-content{
    height:400px;
    position: relative;
}
</style>