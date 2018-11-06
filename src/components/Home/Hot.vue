<template>
    <div class="hot">
        <div class="hot-header">
            <img src="http://localhost:1997/app/icon_hot.png" alt="">
            <span>热门游戏</span>
            <a href="">全部游戏</a>
        </div>
        <ul class="hot-game">
            <li v-for="img in imgs" :key="img.id"><img :src="img[0]" alt=""><span>{{img[1]}}</span></li>
        </ul>
    </div>
</template>
<script>
    export default {    
     data(){
       return {
           classfiy:[],
           imgs:[
               ["http://localhost:1997/app/58eb65cc7987b.jpg","绝地求生"],
               ["http://localhost:1997/app/58eb65cc7987b.jpg","绝地求生"],
               ["http://localhost:1997/app/58eb65cc7987b.jpg","绝地求生"],
               ["http://localhost:1997/app/58eb65cc7987b.jpg","绝地求生"],
               ["http://localhost:1997/app/58eb65cc7987b.jpg","绝地求生"],
               ["http://localhost:1997/app/58eb65cc7987b.jpg","绝地求生"],
               ["http://localhost:1997/app/58eb65cc7987b.jpg","绝地求生"],
               ["http://localhost:1997/app/58eb65cc7987b.jpg","绝地求生"],
               ["http://localhost:1997/app/58eb65cc7987b.jpg","绝地求生"],
               ["http://localhost:1997/app/58eb65cc7987b.jpg","绝地求生"],
               ["http://localhost:1997/app/58eb65cc7987b.jpg","绝地求生"],
               ["http://localhost:1997/app/58eb65cc7987b.jpg","绝地求生"],
           ]
           }
     },
    methods:{
        getify(){
            var url="search/classifylist"
            this.$http.get().then(result=>{
                // this.imglist=result.body
                console.log(result.body)
            })
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
    }
    .hot-game>li>span{
        display: inline-block;
        width:100%;
        text-align:center;
        font-size:.7rem;
    }
</style>