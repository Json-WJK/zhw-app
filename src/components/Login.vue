<template>
    <div class="login">
        <div>
            <a href=""><img src="http://127.0.0.1:1997/app/fanhui.png" alt=""></a>
        </div>
        <div>
            <img src="http://127.0.0.1:1997/app/logo.png" alt="">
        </div>
        <div class="fill">
            <div>登录</div>
            <div class="uname"><span></span><input type="text" placeholder="请输入手机号/用户名" v-model="uname"></div>
            <div class="upwd"><span></span><input type="password" v-model="upwd" placeholder="请输入密码"></div>
            <button @click="login()">登录</button>
            <div class="u_choice">
                <router-link to="/user/register" tag="span"><a>快速注册</a></router-link>
                <span><a href="">忘记密码</a></span>
            </div>
        </div>
        <span></span>
        <img src="http://127.0.0.1:1997/app/qq.png" alt="">
    </div>
</template>
<script>
import {Toast} from "mint-ui"
import {Indicator} from "mint-ui"
    export default{
        data(){
            return{
               uname:"",
               upwd:"", 
            }
        },
        methods:{
            login(){
                var uname=this.uname;
                var upwd=this.upwd;
                var url="user/login"
                this.$http.post(url,{uname:uname,upwd:upwd},{emulateJSON:true}).then(result=>{
                    if(result.body.ok==1){
                        this.$store.commit("islg",1)
                        this.$store.state.islg="注销"
                        this.$store.commit("r_uname",result.body.uname)
                        this.$store.state.f_img=4
                        Indicator.open('登录中...')
                        setTimeout(() => {
                            Indicator.close();
                            this.$router.go(-1);
                            Toast({
                                message: '登录成功',
                                position: 'middle',
                                duration: 1000
                            });
                        },1000);
                        
                    } 
                })
                var url="user/islogin"
                this.$http.get(url).then(result=>{
                })
            }
        }
    }
</script>
<style>
    .login{
        background: url("http://127.0.0.1:1997/app/bg.png") no-repeat;
        background-size: cover;
        padding-top:1.5rem;
        margin-bottom:3.5rem;
    }
    .login>img{
        display:block;
        width:2.5rem;
        height:2.5rem;
        margin:0 auto;
    }
    .login>div:nth-child(1){
        width:100%;
        height:2rem;
    }
    .login>div:nth-child(1)>a>img{
        width:.6rem;
        height:1.2rem;
        margin:.5rem 0 0 1rem;
    }
    .login>div:nth-child(2){
        width:100%;
        text-align:center;
    }
    .login>div:nth-child(2)>img{
        width:9.5rem;
        height:3.7rem;
    }
    .login>.fill{
        width:95%;
        margin:0 auto;
        background:#fff;
        box-sizing: border-box;
        padding:1rem;
        border-radius: 1rem;
        margin:2rem auto;
    }
    .login>.fill>div:nth-child(1){
        font-size:1.4rem;
        font-weight:bold;
        margin-bottom:2rem;
        margin-left:.3rem;
    }
    .login>.fill>.uname,
    .login>.fill>.upwd{
        display:flex;
        height:2.5rem;
        border-bottom:1px solid #ccc;
        margin-bottom:.5rem;
        width:95%;
        margin:.7rem auto;
    }
    .login>.fill>.upwd>span,
    .login>.fill>.uname>span{
        display:inline-block;
        width:.9rem;
        height:1.2rem;
        margin-top:.6rem;
        margin-left:.3rem;
    }
    .login>.fill>.upwd>input,
    .login>.fill>.uname>input{
        width:90%;
        margin-left:.5rem;
        border:none;
    }
    .login>.fill>.upwd>span{
        background:url("http://127.0.0.1:1997/app/password.png") no-repeat;
        background-size: 100% 100%;
    }
    .login>.fill>.uname>span{
        background:url("http://127.0.0.1:1997/app/username.png") no-repeat;
        background-size: 100% 100%;
    }
    .login input{
        font-size:.8rem;
        color:#ccc;
    }
    .login>.fill>button{
        display: block;
        width:95%;
        background-color: #ffcc05;
        border-radius: 0.25rem;
        margin:0 auto;
        height:2.7rem;
        color:#fff;
        font-size:1rem;
        border:none;
        margin-top:2rem;
    }
    .u_choice{
        display:flex;
        justify-content:space-between;
        padding:0 .5rem;
        font-size:.8rem;
        margin-top:.9rem;
    }
    .u_choice>span{

    }
</style>