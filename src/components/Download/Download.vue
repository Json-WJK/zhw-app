<template>
    <div class="download" id="download">
        <img src="http://127.0.0.1:1997/app/app_d.png" alt="">
        <div class="texts">
            <p>发布账号&nbsp;订单处理</p>
            <p>投诉理赔&nbsp;更多功能</p>
        </div>
        <div class="buttons">
            <span>下载APP</span>
            <span @click="tohome()">回到首页</span>    
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
            tohome(){
                this.$router.push('/home');
            }
        },
        mounted:function (){
            //获取屏幕高度
            var Height = document.documentElement.clientHeight
            console.log(Height)
            document.getElementById('download').style.height = Height + 'px';
        },
    }
</script>
<style>
    .download{
        width:100%;
        max-width:768px;
        background: #fff;
        z-index: 999;
        position:fixed;
    }
    .download>img{
        width:100%;
    }
    .download>.texts{
        width:100%;
        text-align:center;
        margin:1rem auto;
    }
    .download>.texts>p{
        font-size:1.2rem;
        color:#3d4145; 
    }
    .download>.buttons{
        width:100%;
        margin:0 auto;
    }
    .download>.buttons>span{
        display:block;
        width:90%;
        height:2.5rem;
        margin:.1rem auto;
        text-align:center;
        border-radius:25px;
        line-height:2.5rem;
    }
    .download>.buttons>span:nth-child(1){
        background-image: linear-gradient(to right, #ff6f43, #ff3e01);
        color:#fff;
        border:1px solid #fff;
    }    
    .download>.buttons>span:nth-child(2){
        background:#fff;
        color:#ff6f43;
        border:1px solid #ff6f43;
    }    
    /* .footer{
        display:none;
    } */
</style>