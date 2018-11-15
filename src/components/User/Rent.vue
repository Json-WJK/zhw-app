<template>
    <div class="rent">
        <h1>
            <span class="mui-icon mui-icon-arrowleft" @click="retreat()"></span>
            <span>租赁订单</span>
        </h1>
        <div class="ify_top">
            <span @click="ify_cuts(1)" :class='ify_cut==1?"bg_cut":""'>全部</span>
            <span @click="ify_cuts(2)" :class='ify_cut==2?"bg_cut":""'>正常</span>
            <span @click="ify_cuts(3)" :class='ify_cut==3?"bg_cut":""'>预约</span>
            <span @click="ify_cuts(4)" :class='ify_cut==4?"bg_cut":""'>投诉</span>
            <span @click="ify_cuts(5)" :class='ify_cut==5?"bg_cut":""'>记录</span>
            <span @click="ify_cuts(6)" :class='ify_cut==6?"bg_cut":""'>撤单</span>  
        </div>
        <div class="divs" :class="ify_cut==1?'ify_block':''">
            <div v-for="(list,i) in lists" :key="i">
                <a class="items">
                    <div><img :src="list.game_overall_img" alt=""></div>
                    <div>
                        <h1>{{list.game_describe}}</h1>
                        <p>
                            <!-- <span>{{list.game_starting}}小时起租</span>
                            <span>免押金</span> -->
                        </p>
                        <span>角色名：{{name[i].game_name}}</span>
                        <div>
                            <span>绝地求生</span>
                            <span>全区</span>
                            <span>全服</span>
                        </div>
                    </div>
                    <div>
                        <div>￥{{list.game_prices}}</div>
                        <div>/小时</div>
                        <div></div>
                        <div>
                            <span>商</span>
                            <span>陪</span>
                            <span>顶</span>
                        </div>
                    </div>
                </a>
                <div class="times">
                    <span>下单时间：
                        <b>{{duration.starting_date | datetimeFilter}}</b>
                    </span>
                    <span>押金：
                        <b>￥{{list.game_hire}}</b>
                    </span>
                </div>
            </div>
        </div>
        <div class="divs" :class="ify_cut==2?'ify_block':''">暂无数据</div>
        <div class="divs" :class="ify_cut==3?'ify_block':''">暂无数据</div>
        <div class="divs" :class="ify_cut==4?'ify_block':''">暂无数据</div>
        <div class="divs" :class="ify_cut==5?'ify_block':''">
            <div v-for="(list,i) in lists_over" :key="i">
                <a class="items">
                    <div><img :src="list.game_overall_img" alt=""></div>
                    <div>
                        <h1>{{list.game_describe}}</h1>
                        <p>
                            <!-- <span>{{list.game_starting}}小时起租</span>
                            <span>免押金</span> -->
                        </p>
                        <span>角色名：{{name_over[i].game_name}}</span>
                        <div>
                            <span>绝地求生</span>
                            <span>全区</span>
                            <span>全服</span>
                        </div>
                    </div>
                    <div>
                        <div>￥{{list.game_prices}}</div>
                        <div>/小时</div>
                        <div></div>
                        <div>
                            <span>商</span>
                            <span>陪</span>
                            <span>顶</span>
                        </div>
                    </div>
                </a>
                <div class="times">
                    <span><!-- 下单时间：
                        <b>{{duration.starting_date | datetimeFilter}}</b> -->
                    </span>
                    <span>押金：
                        <b>￥{{list.game_hire}}</b>
                    </span>
                </div>
            </div>
        </div>
        <div class="divs" :class="ify_cut==6?'ify_block':''">暂无数据</div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            lists:[],
            duration:"",
            name:[],
            ify_cut:1,
            lists_over:[],
            name_over:[],
        }
    },
    methods:{//正在租用的账号
        rent(){
            var uname=this.$store.state.uname//通过vuex中的uname进行查询
            var url="user/lease"
            this.$http.post(url,{uname}).then(result=>{
                this.lists=result.body.account
                this.duration=result.body.duration[0]
                this.name=result.body.name
                console.log(this.duration)
            })
            //租用历史记录
            var url="user/often"
            this.$http.post(url,{uname}).then(result=>{
                this.lists_over=result.body.account
                this.name_over=result.body.name
                // console.log(result.body)
            })
        },
        ify_cuts(n){
            this.ify_cut=n
        },
        retreat(){//返回上一级
            this.$router.push("/user")
        }
    },
    created(){
        this.rent()
    },
    
}
</script>
<style>
    .rent{
        background:#fff;
    }
    /*页头*/
    .rent>h1{
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
    .rent>h1>span:nth-child(1){
        color:#ccc;
        font-size:1.5rem;
    }
    .rent>h1>span:nth-child(2){
        font-size:1rem;
        line-height:1.5rem;
        color:#666;
        font-weight:400;
        width:90%;
    }
    .rent>h1>img{
        width:1rem;
        height:1rem;
    }
    /*分类页头*/
    .rent>.ify_top{
        padding:.5rem 0;
        margin-top:2.5rem;
        display: flex;
    }
    .rent>.ify_top>span{
        width:16.6%;
        font-size:.9rem;
        text-align:center;
        height:2rem;
        border-bottom:2px solid #eee;
    }
    .rent .bg_cut{
        border-bottom:2px solid #ff782e !important;
        color:#ffca00;
    }
    /*信息列表*/
    .rent>div>div>.items{
        width:100%;
        height:7.5rem;
        display: flex;
        justify-content: space-around;
        color:#ccc;
        box-sizing:border-box;
        padding:.5rem;  
        background:#fff;
    }
    .rent>div>div>.items>div:nth-child(1){
        width:28%;
        height:100%;
        box-sizing: border-box;
        padding:1rem 0;
    }
    .rent>div>div>.items>div:nth-child(2){
        width:55%;
        height:100%;
    }
    .rent>div>div>.items>div:nth-child(3){
        width:25%;
        height:100%;
        box-sizing: border-box;
        padding-top:.3rem;
    }
    .rent>div>div>.items>div:nth-child(1)>img{
        width:4.5rem;
        height:4.5rem;
    }
    .rent>div>div>.items>div:nth-child(2)>h1{
        font-size:.8rem;
        height:2rem;
        line-height:1rem;
        color:#666;
        overflow: hidden;
        font-weight:none;
        margin-top:.8rem;
    }
    .rent>div>div>.items>div:nth-child(2)>p{
        margin:0
    }
    .rent>div>div>.items>div:nth-child(2)>p>span{
        padding:.05rem .5rem;
        box-sizing: border-box;
        border:1px solid #ff6868;
        color:#ff6868;
        font-size:.7rem;
        border-radius: .2rem;
    }
    .rent>div>div>.items>div:nth-child(2)>span:nth-child(3){
        font-size:.8rem;
    }
    .rent>div>div>.items>div:nth-child(2)>div:nth-child(4)>span{
        display: inline-block;
        font-size:.7rem;
        background:#ccc;
        color:#fff;
        box-sizing: border-box;
        padding:.05rem .3rem;
        margin:0 .1rem;
    }
    .rent>div>div>.items>div:nth-child(3){
        text-align:right;
        margin-top:.3rem;
    }
    .rent>div>div>.items>div:nth-child(3)>div:nth-child(1){
        font-size:1rem;
        color:#ff6868;
        font-weight: bold;
    }
    .rent>div>div>.items>div:nth-child(3)>div:nth-child(2){
        font-size:.8rem;
    }
    .rent>div>div>.items>div:nth-child(3)>div:nth-child(3){
        margin-top:1.5rem;
    }
    .rent>div>div>.items>div:nth-child(3)>div:nth-child(4)>span{
        font-size:.7rem;
        box-sizing: border-box;
        padding:.1rem .2rem;
        color:#fff;
        border-radius: .2rem;
        margin:0 .1rem;
    }
    .rent>div>div>.items>div:nth-child(3)>div:nth-child(4)>span:nth-child(1){
        background:#ff782e;
    }
    .rent>div>div>.items>div:nth-child(3)>div:nth-child(4)>span:nth-child(2){
        background:#ffca00;
    }
    .rent>div>div>.items>div:nth-child(3)>div:nth-child(4)>span:nth-child(3){
        background:#23bbff;
    }
    /*时间*/
    .rent .times{
        background:#fff;
        border-top:1px dashed #eee;
        border-bottom:1px dashed #eee;
        width:95%;
        margin:0 auto;
        height:3rem;
        line-height:3rem;
        display: flex;
        justify-content:space-between;
    }
    .rent .times>span{
        font-size:.8rem;
        color:#888;
    }
    .rent .times>span>b{
        font-size:.7rem;
        color:#000;
    }

    /*控制显示隐藏*/
    .ify_block{
        display:block !important;
        margin-bottom:3rem !important;
    }
    .rent>.divs{
        display: none;
    }
    .rent>.divs:not(:nth-child(1)){
        text-align:center;
        font-size:.7rem
    }
</style>
