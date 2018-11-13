<template>
    <div class="collect">
        <h1>
            <span class="mui-icon mui-icon-arrowleft" @click="retreat()"></span>
            <span>我的收藏</span>
        </h1>
        <a class="items" v-for="list in lists" @click="details(list.game_id,list.game_family_id)" :key="list.game_id">
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
export default {
    data(){
        return{
            lists:[],
            name:[],
        }
    },
    methods:{
        collect(){/*收藏 */
            var uname=this.$store.state.uname
            var url="user/enshrine"
            this.$http.post(url,{uname}).then(result=>{
                this.lists=result.body.account
                this.name=result.body.name
            })
        },
        retreat(){//点击返回
            this.$router.push("/user")
        }
    },
    created(){
        this.collect()
    }
}
</script>
<style>
    .collect{
        background:#fff;
    }

/*页头*/
    .collect>h1{
        background:#fff;
        margin:0 auto;
        display: flex;
        text-align:center;
        box-sizing: border-box;
        padding:.5rem .5rem;
        padding-bottom:0;
        width:100%;
        height:2.5rem;
        position:fixed;
        top:0;
        max-width:768px;
    }
    .collect>h1>span:nth-child(1){
        color:#ccc;
        font-size:1.5rem;
    }
    .collect>h1>span:nth-child(2){
        font-size:1rem;
        line-height:1.5rem;
        color:#666;
        font-weight:400;
        width:90%;
    }
    .collect>h1>img{
        width:1rem;
        height:1rem;
    }

    /*返回结果*/
    .collect>a.items:nth-child(2){
       margin-top:2.5rem;
    }
    .collect>.items{
        width:100%;
        height:7.5rem;
        display: flex;
        justify-content: space-around;
        color:#ccc;
        box-sizing:border-box;
        padding:.5rem;
        border-bottom:1px solid #eee;
    }
    .collect>.items>div:nth-child(1){
        width:28%;
        height:100%;
        box-sizing: border-box;
        padding:1rem 0;
    }
    .collect>.items>div:nth-child(2){
        width:55%;
        height:100%;
    }
    .collect>.items>div:nth-child(3){
        width:25%;
        height:100%;
        box-sizing: border-box;
        padding-top:.3rem;
    }
    .collect>.items>div:nth-child(1)>img{
        width:4.5rem;
        height:4.5rem;
    }
    .collect>.items>div:nth-child(2)>h1{
        font-size:.8rem;
        height:2rem;
        line-height:1rem;
        color:#666;
        overflow: hidden;
        font-weight:none;
    }
    .collect>.items>div:nth-child(2)>p{
        margin:0
    }
    .collect>.items>div:nth-child(2)>p>span{
        padding:.05rem .5rem;
        box-sizing: border-box;
        border:1px solid #ff6868;
        color:#ff6868;
        font-size:.7rem;
        border-radius: .2rem;
    }
    .collect>.items>div:nth-child(2)>span:nth-child(3){
        font-size:.8rem;
    }
    .collect>.items>div:nth-child(2)>div:nth-child(4)>span{
        display: inline-block;
        font-size:.7rem;
        background:#ccc;
        color:#fff;
        box-sizing: border-box;
        padding:.05rem .3rem;
        margin:0 .1rem;
    }
    .collect>.items>div:nth-child(3){
        text-align:right;
    }
    .collect>.items>div:nth-child(3)>div:nth-child(1){
        font-size:1rem;
        color:#ff6868;
        font-weight: bold;
    }
    .collect>.items>div:nth-child(3)>div:nth-child(2){
        font-size:.8rem;
    }
    .collect>.items>div:nth-child(3)>div:nth-child(3){
        margin-top:2.5rem;
    }
    .collect>.items>div:nth-child(3)>div:nth-child(3)>span{
        font-size:.7rem;
        box-sizing: border-box;
        padding:.1rem .2rem;
        color:#fff;
        border-radius: .2rem;
        margin:0 .1rem;
    }
    .collect>.items>div:nth-child(3)>div:nth-child(3)>span:nth-child(1){
        background:#ff782e;
    }
    .collect>.items>div:nth-child(3)>div:nth-child(3)>span:nth-child(2){
        background:#ffca00;
    }
    .collect>.items>div:nth-child(3)>div:nth-child(3)>span:nth-child(3){
        background:#23bbff;
    }
</style>
