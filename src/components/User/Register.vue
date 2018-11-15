<template>
    <div class="register">
        <div>
            <router-link to="/login" tag="a"><img src="http://127.0.0.1:1997/app/fanhui.png" alt=""></router-link>
            <div class="inputs">
                <p>注册</p>
                <div><img src="http://127.0.0.1:1997/app/username.png" alt=""><input type="text" placeholder="请输入手机号" v-model="uname"></div>
                <div><img src="http://127.0.0.1:1997/app/username.png" alt=""><input type="text" placeholder="请输入图形验证码" v-model="verify"><img class="verification" src="http://127.0.0.1:1997/app/download.png" alt=""></div>
                <div><img src="http://127.0.0.1:1997/app/yanzhengma.png" alt=""><input type="text" placeholder="请输入手机验证码" v-model="p_verify"><a>|获取验证码</a></div>
                <div><img src="http://127.0.0.1:1997/app/password.png" alt=""><input type="password" placeholder="请输入密码" v-model="upwd"></div>
                <button @click="register()">注册</button>
            </div>
        </div>
        
    </div>
</template>
<script>
import {Toast} from "mint-ui"
    export default{
        data(){
            return{
                uname:"",verify:"",p_verify:"",upwd:"",
            }
        },
        methods:{
            register(){//注册请求
                var ulr="user/register";
                var uname=this.uname;
                var upwd=this.upwd;
                var verify=this.verify;
                var p_verify=this.p_verify;
                // console.log(uname,upwd)
                /*请求前验证 */
                if(!uname.match(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/)) Toast("手机号格式错误")
                else if(!upwd.match(/^\w{6,18}$/)) Toast("请设置密码为6~18位")
                else if(uname==""||upwd==""||verify==""||p_verify=="") Toast("请填写完整")
                //验证通过  发起注册请求
                this.$http.post(url,{uanme,upwd}).then(result=>{
                    console.log(result.body)
                })
            }
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
        margin-bottom:1rem;
    }
    .register>div{
        padding:1rem .5rem;
    }
    .register>div>.inputs{
        background:#fff;
        border-radius:15px;
        padding:1rem 1.5rem;
        padding-bottom:2rem;
    }
    .register>div>.inputs>p{
        color:#000;
        font-size:1.4rem;
        font-weight: 700;
        margin-bottom:.5rem;
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
        width:30%;
        text-align:center;
        font-size:.7rem;
        line-height:3.5rem;
    }
    /*注册按钮*/
    .register>div>.inputs>button{
        display: block;
        width:100%;
        height:2.5rem;
        border-radius:10px;
        background:#ffcc05;
        color:#fff;
        font-size:1rem;
        border:none;
        margin:0 auto;
        margin-top:2rem;
    }
</style>