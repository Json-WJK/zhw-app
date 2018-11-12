<template>
    <div class="hseek">
        <span @click="islg()"><a>{{$store.state.islg}}</a></span>
        <div>
            <input @keyup.enter="hseeks()" type="text" placeholder="请输入关键字" v-model="hseek">
            <span @click="hseeks()"><img src="http://127.0.0.1:1997/app/sousuo.png" alt=""></span>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                hseek:"",
            }
        },
        methods:{
            hseeks(){
                if(this.hseek!=""){
                    //将input值存在vueX中 供seek使用
                    this.$store.state.seek=this.hseek
                    this.$store.state.f_img=2
                        // console.log(this.$store.state.seek)
                    this.$router.push("/select")
                }
            },
            islg(){
                if(this.$store.state.islg=="注销"){
                    this.$store.state.uname=""
                    this.$store.state.islg="登录"
                    this.$store.state.islogin=0
                }
                    this.$store.state.f_img=4
                    this.$router.push("/login")
            }
        }
    }
</script>
<style>
    .hseek{
        display:flex;
        background:#ffd005;
        height:50px;
        width:100%;
        max-width: 768px;
        box-sizing: border-box;
        padding:0.5rem 0;
        justify-content:space-around;
        position:fixed;
        z-index:999;
    }
    .hseek>span{
        width:15%;
        height: 2.5rem;
        line-height: 2.0rem;
        text-align: left;
        font-size: .6rem;
        padding-left:1.0rem;
    }
     .hseek>span>a{
        color:#fff;
    }
    .hseek>div{
        display:flex;
        width:80%;
        height: 2.5rem;
    }
    .hseek>div>input[type='text']{
        width:80%;
        color:#0894ec;
        height: 2.0rem;
        line-height: 2.0rem;
        text-align:left;
        font-size: .6rem;
        border: none;
        outline: none;
        background:#f5f5f5;
        border-top-right-radius:none;
        border-bottom-right-radius:none;
    }
    .hseek>div>span{
        display:block;
        width:14%;
        background:#f5f5f5;
        height:2.0rem;
        line-height:1.5rem;
        border-top-right-radius:5px;
        border-bottom-right-radius:5px;
        margin-left:-2px;
        box-sizing:border-box;
        padding-left:3px;
        padding-top:.4rem;
    }
    .hseek>div>span>img{
        max-width:1.3rem;
        float:left;
    }
    .hseek>div>input[type='text']::-webkit-input-placeholder{
        color:#999;;   
    }
</style>