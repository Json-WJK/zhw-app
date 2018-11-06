<template>
    <div class="hcarousel">
        <mt-swipe :auto="4000">
            <mt-swipe-item>
                <img src="http://localhost:1997/app/pifu.jpg" />
            </mt-swipe-item>
            <mt-swipe-item>
                <img src="http://localhost:1997/app/sina.jpg" />
            </mt-swipe-item>
            <mt-swipe-item>
                <img src="http://localhost:1997/app/lol-m.png" />
            </mt-swipe-item>        
        </mt-swipe>
        <div class="notice">
            <img src="http://localhost:1997/app/icon_horn.png" alt="">
            <span>最新公告：</span>
            <div>
                <a href="notices">游戏活动助手上线</a>
            </div>
            <a href="">更多>></a>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
        return {
           
        }  //创建data属性保存数据
        },
    }
</script>
<style>
    .hcarousel{
        width:100%;
        background:url(http://localhost:1997/app/swiper_bg.png) no-repeat 0 50px;
        background-size: 100% 166px;
        padding-top:50px;
    }
    .hcarousel>.mint-swipe{
        height:150px;
        width:95%;
        margin:0 auto;
    }
    .mint-swipe-items-wrap{
        width:100%;
        border-radius:5px; 
    }
    .hcarousel>.mint-swipe img{
        height:150px;
        width:100%;
    }
    .notice{
        display: flex;
        font-size:0.6rem;
        padding:.5rem 0 .5rem 1rem;
        box-sizing: border-box;
        background:#fff;
        margin-top:.7rem;
    }
    .notice>img{
       width:.8rem;
       height:.8rem;
       vertical-align:middle;
       margin-right:.2rem;
    }
    .notice>span{
       font-weight: 600;
    }
    /*轮播消息*/
    .notice>div{
       width:65%;
    }
    .notice>a{
        
    }
</style>