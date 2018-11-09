<template>
    <div class="user">
        <div class="u_header">
            <a href=""></a>
            <span>我的</span>
            <a href="">退出</a>
        </div>
        <div>
            <div class="user_name">
                <img src="http://127.0.0.1:1997/app/default1.png" alt="" class="user_portrait"><br>wjkwang<br>  
                <img :src="ximgs" alt="">
                <img :src="ximgs" alt="">
                <img :src="ximgs" alt="">
                <img :src="ximgs" alt="">
                <img :src="ximgs" alt="">
            </div>
            <div class="u_sx"></div>
            <div class="moneys">
                <div class="money">
                    <div><span>1.33</span><br><span>可用余额</span></div>
                    <div class="u_sx"></div>
                    <div><span>8.00</span><br><span>冻结资金</span></div>
                </div>
                <button class="up_money">充值</button>
            </div>
        </div>
        <div>
            <div class="u_lists" v-for="ify in classify">
                <img :src="ify.img" alt="">
                <span>{{ify.text}}</span>
                <span></span>
            </div>
        </div>
        <a href=""><img src="http://127.0.0.1:1997/app/u-index.png" alt=""></a>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                ximgs:"http://127.0.0.1:1997/app/icon_star1.png",
                classify:[
                    {
                        img:"http://127.0.0.1:1997/app/icon_order.png",
                        text:"我的租号订单",
                        right:">"
                    },
                    {
                        img:"http://127.0.0.1:1997/app/icon_collection.png",
                        text:"我收藏的账号",
                        right:">"
                    },
                    {
                        img:"http://127.0.0.1:1997/app/icon_redbags.png",
                        text:"我的红包",
                        right:">"
                    },
                    {
                        img:"http://127.0.0.1:1997/app/icon_free.png",
                        text:"免费体验",
                        right:">"
                    },
                    {
                        img:"http://127.0.0.1:1997/app/icon_tg.png",
                        text:"我的暑假推广",
                        right:">"
                    }
                ]
            }
        },
        methods:{
            user(){
                // var 
            }
        }
    }
</script>
<style>
    .user>div{
        background:#fff;
        width:92%;
        margin:0 auto;
    }
    .user>.u_header{
        width:100%;
        display: flex;
        justify-content:space-around;
        background:#fcfcfc;
    }
    .user>.u_header>span{
        color:#000;
        text-align:center;
    }
    .user>.u_header>a:nth-child(1){
        width:10%;
        line-height:3rem;
    }
    .user>.u_header>span:nth-child(2){
        width:69%;
        line-height:3rem;
    }
    .user>.u_header>a:nth-child(3){
        width:10%;
        font-size:.8rem;
        line-height:3rem;
        color:#000;
    }
    .user>a>img{
        display:block;
        width:92%;
        margin:0 auto;
    }

   
    /*用户信息*/
    .user>div:nth-child(2){
        display:flex;
        justify-content:space-around;
    }
     /*头像昵称*/
    .user .user_name{
        font-size:.7rem;
        text-align:center;
        width:33%;
    }
    .user .user_name>img:not(:nth-child(1)){
        width:.7rem;
        height:.7rem;
    }
    /*头像*/
    .user .user_portrait{
        width:3.5rem;
        height:3.5rem;
        margin-bottom:-.3rem;
    }
    .user>div>.moneys{
        width:66%;
    }
    .user>div>.moneys>.money{
        display:flex;
        text-align: center;
        flex-wrap:nowrap;
        justify-content:space-around;
        font-size:.7rem;
    }
    .user>div>.moneys>.money>div{
        width:49%;
        margin:.5rem 0;
    }
    .user>div>.moneys>.money>div>span:nth-child(1){
        font-weight:bold;
    }
    .u_sx{
        width:0px !important;
        border-left:1px dashed #f0f0f0 !important;
    }
    .user>div>.moneys>.up_money{
        display:block;
        background:#fecc05;
        border:none;
        width:70%;
        color:#fff;
        border-radius:.4rem;
        margin:.5rem auto;
    }

    /*分类列表*/
    .user .u_lists{
        width:85%;
        margin:0 auto;
        height:2.5rem;
        line-height:2.5rem;
        box-sizing: border-box;
        border-bottom:1px solid #f0f0f0;
    }
    .user .u_lists>img{
        width:1.2rem;
        height:1.2rem;
        vertical-align: middle;
    }
    .user .u_lists>span:nth-child(2){
        display:inline-block;
        font-size:.7rem;
        width:70%;
        box-sizing: border-box;
        padding:0 1rem;
    }
</style>