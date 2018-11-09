<template>
    <div class="footer">
        <div>
            <div @click="f_home()"><img src="http://127.0.0.1:1997/app/index_1.png" alt=""><span>首页</span></div>
            <div @click="f_select()"><img src="http://127.0.0.1:1997/app/lease_0.png" alt=""><span>租号</span></div>
            <div @click="f_d_app()"><img src="http://127.0.0.1:1997/app/app_0.png" alt=""><span>App</span></div>
            <div @click="f_login()"><img src="http://127.0.0.1:1997/app/my_0.png" alt=""><span>我的</span></div>  
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
            f_home(){
                this.$router.push({path:'home'});
            },
            f_select(){
                this.$router.push({path:'select'});
            },
            f_d_app(){
                this.$router.push({path:'d_app'});
            },
            f_login(){
                var url="user/islogin"
                this.$http.get(url).then(result=>{
                    // this.imglist=result.body   
                    if(result.body.ok==0)
                    this.$router.push({path:'login'});
                    if(result.body.ok==1) 
                    this.$router.push({path:'user'});

                    console.log(result.body.ok)
                })
            }
        }
    }
</script>
<style>
    .footer{
        width:100%;
        position:fixed;
        bottom:0;
        left:0;
    }
    .footer>div{
        border-top:1px solid #aaaaaa;
        display:flex;
        justify-content:space-around;
        width:100%;
        background: #f6f6f6;
    }
    .footer>div>div{
        width:25%;
        text-align:center;
    }
    .footer>div>div>span{
        display: block;
        font-size:.55rem;
        color:#929292;
        margin-top:-0.2rem;
    }
    .footer>div>div>img{
        width:1.0rem;
        margin-top:.5rem;
    }

</style>