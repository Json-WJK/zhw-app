<template>
    <div class="footer">
        <div>
            <div><img src="http://127.0.0.1:1997/app/index_1.png" alt=""><span>首页</span></div>
            <div><img src="http://127.0.0.1:1997/app/lease_0.png" alt=""><span>租号</span></div>
            <div><img src="http://127.0.0.1:1997/app/app_0.png" alt=""><span>App</span></div>
            <div><img src="http://127.0.0.1:1997/app/my_0.png" alt=""><span>我的</span></div>  
        </div>
    </div>
</template>
<script>
    
</script>
<style>
    .footer>div{
        border-top:1px solid #aaaaaa;
        display:flex;
        justify-content:space-around;
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