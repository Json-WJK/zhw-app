<template>
    <div class="select">
        <results :game_family_id="this.game_family_id"></results>
    </div>
</template>
<script>
    import sseek from "./Select/SSeek.vue"
    import results from "./Select/Results.vue"
    export default{
        data(){
            return{
                game_family_id:this.$route.query.game_family_id//获取hot传的id
            }
        },
        components:{
            "sseek":sseek,
            "results":results,
        },
        methods:{
            
        },
        created(){
            
        },
        
    }
</script>
<style>
    .select{
        background:#fff;
    }
</style>