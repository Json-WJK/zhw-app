<template>
    <div class="sseeks">
        <div class="sseek">
            <span>租号大厅</span>
            <div>
                <input type="text" placeholder="请输入关键字" v-model="seek">
                <span @click="seeks()"><img src="http://127.0.0.1:1997/app/sousuo.png" alt=""></span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            seek:"",
            pno:0
        }
    },
    methods:{
        seeks(){
            if(this.seek!=""){//搜索请求
                var url="search/seek"
                this.$http.get(url+"?kwords="+this.seek+"&pno="+this.pno).then(result=>{
                    this.$store.state.seek_r=result.body.products
                })
            }
        }
    }
}
</script>

<style>
    .sseeks{
        height:3rem;
    }
    .sseek{
        display:flex;
        height:3rem;
        width:100%;
        max-width: 768px;
        box-sizing: border-box;
        padding:0.5rem 0;
        justify-content:space-around;
        position:fixed;
        z-index:999;
        background:#fff;
    }
    .sseek>span{
        width:25%;
        height: 1.5rem;
        line-height: 1.5rem;
        text-align: left;
        font-size: .6rem;
        padding-left:1.0rem;
    }
    .sseek>div{
        display:flex;
        width:75%;
        height: 2rem;
    }
    .sseek>div>input[type='text']{
        width:80%;
        color:#0894ec;
        height:1.5rem;
        line-height: 1.5rem;
        text-align:left;
        font-size: .6rem;
        border: none;
        outline: none;
        background:#f5f5f5;
        border-top-right-radius:none;
        border-bottom-right-radius:none;
    }
    .sseek>div>span{
        display:block;
        width:14%;
        background:#f5f5f5;
        height:1.5rem;
        line-height:1.5rem;
        border-top-right-radius:5px;
        border-bottom-right-radius:5px;
        margin-left:-2px;
        box-sizing:border-box;
        padding-left:3px;
        padding-top:.4rem;
    }
    .sseek>div>span>img{
        max-width:1rem;
        float:left;
    }
    .sseek>div>input[type='text']::-webkit-input-placeholder{
        color:#999;;   
    }
</style>