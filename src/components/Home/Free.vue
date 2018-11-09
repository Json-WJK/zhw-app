<template>
    <div class="free">
        <div class="free-header">
            <img src="http://localhost:1997/app/experience.png" alt="">
            <span>免费体验</span>
            <a href="">进入专区</a>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
        return {
        
        }  
        },
    }
</script>
<style>
    .free{
        background:#fff;
        margin-top:1rem;
    }
    .free-header{
        width:95%;
        margin:0 auto;
        font-size:.9rem;
        font-weight:bold;
        height:2.5rem;
    }  
    .free-header>span{
        font-weight:bold;
        margin-top:.6rem;
    } 
    .free-header>a{
        font-weight:bold;
        color:#ffd005;
        float:right;
        margin-top:.6rem;
    }  
    .free-header>img{
        width:.75rem;
        margin:.6rem .3rem 0 .3rem;
    } 
</style>