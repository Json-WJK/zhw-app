<template>
    <div class="home">
        <hseek></hseek>
        <carousel></carousel>
        <hot></hot>
        <free></free>
        <p>点击访问电脑版</p>
    </div>
</template>
<script>
    import hseek from "./Home/HSeek.vue"
    import carousel from "./Home/Carousel.vue"
    import hot from "./Home/Hot.vue"
    import free from "./Home/Free.vue"
    export default{
        data(){
            return{

            }
        },
        components:{
            "hseek":hseek,
            "carousel":carousel,
            "hot":hot,
            "free":free,
        }
    }
</script>
<style>
    .home>p{
        width:100%;
        text-align:center;
    }
</style>