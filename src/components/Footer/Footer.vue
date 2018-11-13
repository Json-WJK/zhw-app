<template>
    <div class="footer">
        <div>
            <div @click="f_home()"><img :src="this.$store.state.f_img==1?'http://127.0.0.1:1997/app/index_1.png':'http://127.0.0.1:1997/app/index_0.png'" alt=""><span>首页</span></div>
            <div @click="f_select()"><img :src="this.$store.state.f_img==2?'http://127.0.0.1:1997/app/lease_1.png':'http://127.0.0.1:1997/app/lease_0.png'" alt=""><span>租号</span></div>
            <div @click="f_d_app()"><img :src="'http://127.0.0.1:1997/app/app_0.png'" alt=""><span>App</span></div>
            <div @click="f_login()"><img :src="this.$store.state.f_img==4?'http://127.0.0.1:1997/app/my_1.png':'http://127.0.0.1:1997/app/my_0.png'" alt=""><span>我的</span></div>  
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
                this.$store.state.f_img=1
                this.$router.push({path:'/home'});
            },
            f_select(){
                this.$store.state.f_img=2
                this.$store.state.seek="",
                this.$store.state.seek_r=undefined,
                this.$router.push({path:'/select'});
            },
            f_d_app(){
                this.$store.state.f_img=1
                this.$router.push({path:'/d_app'});
            },
            f_login(){
                this.$store.state.f_img=4
                var url="user/islogin"
                this.$http.get(url).then(result=>{
                    // this.imglist=result.body   
                    // if(result.body.ok==0)
                    // this.$router.push({path:'/login'});
                    // if(result.body.ok==1) 
                    // this.$router.push({path:'/user'});
                    // console.log(result.body.ok)
                    if(this.$store.state.islogin==0){
                        this.$router.push({path:'/login'})
                    }else if(this.$store.state.islogin==1){
                        this.$router.push({path:'/user'});
                    }
                })
            },
        },
        created(){
        }
    }
</script>
<style>
    .footer{
        width:100%;
        position:fixed;
        bottom:0;
        max-width:768px;
        margin:0 auto;
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