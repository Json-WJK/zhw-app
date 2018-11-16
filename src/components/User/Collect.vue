<template>
    <div class="collect">
        <h1>
            <span class="mui-icon mui-icon-arrowleft" @click="retreat()"></span>
            <span>我的收藏</span>
        </h1>
        <a class="items" v-for="(list,i) in lists" @click="details(list.game_id,list.game_family_id)" :key="i">
            <div class="status"><span>编号：2208339</span><font>{{ishire[i]}}</font></div>
            <div class="select">
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
            </div>
            <div class="delete"><span>可租时段：0:00-24:00</span><button>删除</button></div>
        </a>
    </div>
</template>
<script>
export default {
    data(){
        return{
            lists:[],
            name:[],
            ishire:[],
            game_id:[],//收藏的账号id
        }
    },
    methods:{
        collect(){/*收藏列表*/
            var uname=this.$store.state.uname
            var url="user/enshrine"
            this.$http.post(url,{uname}).then(result=>{
                this.lists=result.body.account
                this.name=result.body.name
                // console.log(this.lists)
                for(var item of result.body.account){
                    this.game_id.push(item.game_id)
                }
            })
        },
        retreat(){//点击返回
            this.$router.push("/user")
        },
        status(){//当前账号状态
            var uname=this.$store.state.uname
            var url="user/lease"
            this.$http.post(url,{uname}).then(result=>{
                // console.log(result.body.account)//判断账号当前状态
                for(var i=0;i<result.body.account.length;i++){
                    for(var y=0;y<this.game_id.length;y++){
                        if(result.body.account[i].game_id==this.game_id[y]) this.ishire[y]="出租中";
                        else this.ishire[y]="待租"
                    }
                }
            })
        }
        
    },
    created(){
        this.collect()
        this.status()
        console.log(this.ishire)
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
        display:block;
        width:100%;
        color:#ccc;
        box-sizing:border-box;
        padding:.5rem;
    }
    .collect>.items>.select{
        display: flex;
        justify-content: space-around;
        border-bottom:1px solid #eee;
        border-top:1px solid #eee;
    }
    .collect>.items>.select>div:nth-child(1){
        width:28%;
        box-sizing: border-box;
        padding:1rem 0;
    }
    .collect>.items>.select>div:nth-child(2){
        width:55%;
        height:100%;
    }
    .collect>.items>.select>div:nth-child(3){
        width:25%;
        height:100%;
        box-sizing: border-box;
        padding-top:.3rem;
    }
    .collect>.items>.select>div:nth-child(1)>img{
        width:4.5rem;
        height:4.5rem;
    }
    .collect>.items>.select>div:nth-child(2)>h1{
        font-size:.8rem;
        height:2rem;
        line-height:1rem;
        color:#666;
        overflow: hidden;
        font-weight:none;
    }
    .collect>.items>.select>div:nth-child(2)>p{
        margin:0
    }
    .collect>.items>.select>div:nth-child(2)>p>span{
        padding:.05rem .5rem;
        box-sizing: border-box;
        border:1px solid #ff6868;
        color:#ff6868;
        font-size:.7rem;
        border-radius: .2rem;
    }
    .collect>.items>.select>div:nth-child(2)>span:nth-child(3){
        font-size:.8rem;
    }
    .collect>.items>.select>div:nth-child(2)>div:nth-child(4)>span{
        display: inline-block;
        font-size:.7rem;
        background:#ccc;
        color:#fff;
        box-sizing: border-box;
        padding:.05rem .3rem;
        margin:0 .1rem;
    }
    .collect>.items>.select>div:nth-child(3){
        text-align:right;
    }
    .collect>.items>.select>div:nth-child(3)>div:nth-child(1){
        font-size:1rem;
        color:#ff6868;
        font-weight: bold;
    }
    .collect>.items>.select>div:nth-child(3)>div:nth-child(2){
        font-size:.8rem;
    }
    .collect>.items>.select>div:nth-child(3)>div:nth-child(3){
        margin-top:2.5rem;
    }
    .collect>.items>.select>div:nth-child(3)>div:nth-child(3)>span{
        font-size:.7rem;
        box-sizing: border-box;
        padding:.1rem .2rem;
        color:#fff;
        border-radius: .2rem;
        margin:0 .1rem;
    }
    .collect>.items>.select>div:nth-child(3)>div:nth-child(3)>span:nth-child(1){
        background:#ff782e;
    }
    .collect>.items>.select>div:nth-child(3)>div:nth-child(3)>span:nth-child(2){
        background:#ffca00;
    }
    .collect>.items>.select>div:nth-child(3)>div:nth-child(3)>span:nth-child(3){
        background:#23bbff;
    }
    /*状态 与 删除*/
    .collect>.items>.delete,
    .collect>.items>.status{
        height:1.5rem;
        font-size:.7rem;
        color:#000;
        font-weight:bold;
        line-height:1.5rem;
        margin:.5rem 0;
    }
    .collect>.items>.delete>button,
    .collect>.items>.status>font{
        float:right;
    }
    .collect>.items>.status>font{
        color:#ffca00;
    }
    .collect>.items>.delete>button{
        background:#ff6868;
        border:none;
        border-radius:5px;
        color:#fff;
        width:4rem;
        height:1.5rem;
        line-height:1.5rem;
        padding:0;
    }
</style>
