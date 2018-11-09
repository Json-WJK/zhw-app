<template>
    <div class="results">
        <a class="items" v-for="list in lists">
            <div><img :src="list.game_overall_img" alt=""></div>
            <div>
                <h1>{{list.game_describe}}</h1>
                <p>
                    <span>{{list.game_starting}}小时起租</span>
                    <span>免押金</span>
                </p>
                <span>近期出租{{list.game_number}}次</span>
                <div>
                    <span>绝地求生</span>
                    <span>全区</span>
                    <span>全服</span>
                </div>
            </div>
            <div>
                <div>￥{{list.game_prices}}</div>
                <div>/小时</div>
                <div>
                    <span>商</span>
                    <span>陪</span>
                    <span>顶</span>
                </div>
            </div>
        </a>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                lists:[],
                pno:1
            } 
        },
        methods:{
           all(){
                var url="search/gamelist";
                this.$http.get(url+"?pno="+this.pno).then(result=>{
                   this.lists=result.body.products
                   console.log(result.body.products)
                })
           }  
        },
        created(){
            this.all()
        },
    }
   
</script>
<style>
    .results{
        
    }
    .results>.items{
        width:100%;
        height:8rem;
        display: flex;
        justify-content: space-around;
        color:#ccc;
        box-sizing:border-box;
        padding:.5rem;
    }
    .results>.items>div:nth-child(1){
        width:25%;
        height:100%;
        box-sizing: border-box;
        padding:1rem 0;
    }
    .results>.items>div:nth-child(2){
        width:55%;
        height:100%;
    }
    .results>.items>div:nth-child(3){
        width:20%;
        height:100%;
    }
    .results>.items>div:nth-child(1)>img{
        width:5rem;
        height:5rem;
    }
    .results>.items>div:nth-child(2)>h1{
        font-size:.8rem;
        height:2rem;
        line-height:1rem;
        color:#333;
        overflow: hidden
    }
    .results>.items>div:nth-child(2)>p{
        margin:0
    }
    .results>.items>div:nth-child(2)>p>span{
        padding:.05rem .5rem;
        box-sizing: border-box;
        border:1px solid #ff6868;
        color:#ff6868;
        font-size:.7rem;
        border-radius: .2rem;
    }
    .results>.items>div:nth-child(2)>span:nth-child(3){
        font-size:.8rem;
    }
    .results>.items>div:nth-child(2)>div:nth-child(4)>span{
        display: inline-block;
        font-size:.7rem;
        background:#ccc;
        color:#fff;
        box-sizing: border-box;
        padding:.05rem .3rem;
        margin:0 .1rem;
    }
    .results>.items>div:nth-child(3){
        text-align:right;
    }
    .results>.items>div:nth-child(3)>div:nth-child(1){
        font-size:1rem;
        color:#ff6868;
        font-weight: bold;
    }
    .results>.items>div:nth-child(3)>div:nth-child(2){
        font-size:.8rem;
    }
    .results>.items>div:nth-child(3)>div:nth-child(3){
        margin-top:2.5rem;
    }
    .results>.items>div:nth-child(3)>div:nth-child(3)>span{
        font-size:.7rem;
        box-sizing: border-box;
        padding:.1rem .2rem;
        color:#fff;
        border-radius: .2rem;
        margin:0 .1rem;
    }
    .results>.items>div:nth-child(3)>div:nth-child(3)>span:nth-child(1){
        background:#ff782e;
    }
    .results>.items>div:nth-child(3)>div:nth-child(3)>span:nth-child(2){
        background:#ffca00;
    }
    .results>.items>div:nth-child(3)>div:nth-child(3)>span:nth-child(3){
        background:#23bbff;
    }
</style>