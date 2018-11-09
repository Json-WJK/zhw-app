<template>
    <div class="select">
        <sseek></sseek>
        <results></results>
    </div>
</template>
<script>
    import sseek from "./Select/SSeek.vue"
    import results from "./Select/Results.vue"
    export default{
        data(){
            return{

            }
        },
        components:{
            "sseek":sseek,
            "results":results,
        }
    }
</script>
<style>
    .select{
        background:#fff;
    }
</style>