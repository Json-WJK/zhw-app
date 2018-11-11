<template>
    <div class="hot">
        <div class="hot-header">
            <img src="http://localhost:1997/app/icon_hot.png" alt="">
            <span>热门游戏</span>
            <a href="" @click.prevent="all()">全部游戏</a>
        </div>
        <ul class="hot-game">
            <li v-for="(ify,i) in classify" :key="i" @click="ifys(ify.game_family_id)">
                <img :src="ify.classify_app" alt=""><span>{{ify.game_names}}</span>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {    
     data(){
       return {
           classify:[],
           pno:0,
           tpify:[]
           }
     },
    methods:{
        getify(){
            var url="search/gameclassify"
            this.$http.get(url).then(result=>{
                // this.imglist=result.body
                this.classify=result.body.splice(0,12)       
            })
        },
        all(){
            this.$router.push('/select');
        },
        ifys(id){//查看某一类游戏
        //跳转前清空vueX
            this.$store.state.seek="",
            this.$store.state.seek_r=undefined,
            this.$router.push({path:"/select",query:{game_family_id:id}})
        }
    },
    created(){
            this.getify()
    },
    }
</script>
<style>
    .hot{
        background:#fff;
        margin-top:.8rem;
    }
    .hot-header{
        width:95%;
        margin:0 auto;
        font-size:.9rem;
        font-weight:bold;
        height:2.5rem;
        border-bottom:1px solid #ddd;
    }
    .hot-header>img{
        width:.75rem;
        margin:.6rem .3rem 0 .3rem;
    }
    .hot-header>a{
        color:#ffd005;
        float: right;
        margin-top:.6rem;
        margin-right:.3rem;
    }
    .hot-game{
        width:95%;
        margin:0 auto;
        display: flex;
        justify-content: space-around;
        flex-wrap:wrap;
        box-sizing: border-box;
        padding-top:1rem;
    }
    .hot-game>li{
        width:23%;
    }
    .hot-game>li>img{
        width:100%;
        height:70%;
    }
    .hot-game>li>span{
        display: inline-block;
        width:100%;
        text-align:center;
        font-size:.7rem; 
        overflow: hidden;
        white-space: nowrap;
    }
</style>