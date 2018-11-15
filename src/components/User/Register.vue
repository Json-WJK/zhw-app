<template>
    <div class="register">
        <div>
            <router-link to="" tag="a"><img src="http://127.0.0.1:1997/app/fanhui.png" alt=""></router-link>
            <div class="inputs">
                <p>注册</p>
                <div><img src="http://127.0.0.1:1997/app/username.png" alt=""><input type="text"></div>
                <div><img src="http://127.0.0.1:1997/app/username.png" alt=""><input type="text"><img class="verification" src="http://127.0.0.1:1997/app/download.png" alt=""></div>
                <div><img src="http://127.0.0.1:1997/app/yanzhengma.png" alt=""><input type="text"><a>|获取验证码</a></div>
                <div><img src="http://127.0.0.1:1997/app/password.png" alt=""><input type="password"></div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{

            }
        },
        methods:{

        },
        created(){

        }
    }
</script>
<style>
    .register{
        background: url("http://127.0.0.1:1997/app/bg.png") no-repeat;
        background-size: cover;
        padding-top:1.5rem;
        margin-bottom:3.5rem;
    }
    .register>div>a>img{
        height:1.2rem;
        margin-left:1rem;
    }
    .register>div{
        padding:1rem .5rem;
    }
    .register>div>.inputs{
        background:#fff;
        border-radius:15px;
        padding:1rem 1.5rem;
    }
    .register>div>.inputs>p{
        color:#000;
        font-size:1.4rem;
        font-weight: 700;
        margin-bottom:2rem;
    }
    .register>div>.inputs>div{
        border-bottom:1px solid #eee;
        height:4rem;
        padding:1rem 0;
    }
    .register>div>.inputs>div>img{
        width:1rem;
        height:1.4rem;
        float: left;
        margin-top:1rem;
        margin-right:1rem;
    }
    .register>div>.inputs>div>img.verification{
        width:25%;
        height:2.5rem;
        float: right;
        margin-top:0rem;
        margin-right:0;
    }
    .register>div>.inputs>div>input{
        font-size:.7rem;
        width:55%;
        border:none;
        float:left;
        margin-top:.5rem;
    }
    .register>div>.inputs>div:nth-child(2)>input
    /* .register>div>.inputs>div:nth-child(3)>input, */{
        width:80%;
    }
    .register>div>.inputs>div:nth-child(4)>a{
        float:right;
        width:25%;
        text-align:center;
        font-size:.7rem;
        line-height:2.5rem;
    }
</style>