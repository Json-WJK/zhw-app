<template>
    <div>
        <div class="sseeks">
            <div class="sseek">
                <span>租号大厅</span>
                <div>
                    <input @keyup.enter="seeks()" type="text" placeholder="请输入关键字" v-model="seek">
                    <span @click="seeks()"><img src="http://127.0.0.1:1997/app/sousuo.png" alt=""></span>
                </div>
            </div>
        </div>
        <div class="results">
            <a class="items" v-for="list in lists" @click="details(list.game_id,list.game_family_id)" :key="list.id">
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
    </div>
</template>
<script>
import {Toast} from "mint-ui"
import { Indicator } from 'mint-ui';
    export default{
        data(){
            return{
                lists:[],
                seek:"",
                pno:0,
                isseek:false,
            } 
        },
        methods:{
            all(){
                setTimeout(() => {
                    if(this.$store.state.seek_r==undefined){//默认显示
                    if(this.isseek==true){//搜索提示
                        Toast('未能找到该商品信息')
                        this.isseek=false
                    } 
                    var url="search/classifylist"
                    this.$http.get(url+"?pno="+this.pno+"&game_family_id="+this.game_family_id).then(result=>{
                        if(result.body.products.length==0){//如果没有显示默认
                                var url="search/gamelist";
                                this.$http.get(url+"?pno="+this.pno).then(result=>{
                                    this.lists=result.body.products
                                })
                        }else{//显示搜索结果
                            this.lists=result.body.products
                        }  
                        })
                //搜索结果
                }else if(this.$store.state.seek_r.length>0){
                    this.lists=this.$store.state.seek_r
                }
                }, 300);
                
            },
            getify() {
                // this.tpify = this.$route.params.tpify
                // console.log(this.$route.params.tpify)
                },
            details(id,fid){
                this.$router.push({path:"/select/details",query:{game_id:id,game_family_id:fid}})
            },
            seeks(){
                Indicator.open('玩命加载中...');
                setTimeout(() => {
                    Indicator.close();
                    if(this.seek!=""){//搜索请求
                    this.isseek=true;
                    var url="search/seek"
                    this.$http.get(url+"?kwords="+this.seek+"&pno="+this.pno).then(result=>{
                        this.$store.state.seek_r=result.body.products
                        this.all()
                    })
                    }
                }, 500);
               
            },
        },
        created(){
            this.seek=this.$store.state.seek
            this.all()
            this.getify()
            this.seeks() 
        },
        props:["game_family_id"]
    }
   
</script>
<style>
    .results{
        
    }

    /*搜索框*/
    .sseeks{
        height:3rem;
    }
    .sseek{
        display:flex;
        height:3rem;
        width:100%;
        max-width: 768px;
        box-sizing: border-box;
        padding:0.5rem 0;
        justify-content:space-around;
        position:fixed;
        z-index:999;
        background:#fff;
    }
    .sseek>span{
        width:25%;
        height: 1.5rem;
        line-height: 1.5rem;
        text-align: left;
        font-size: .6rem;
        padding-left:1.0rem;
    }
    .sseek>div{
        display:flex;
        width:75%;
        height: 2rem;
    }
    .sseek>div>input[type='text']{
        width:80%;
        color:#0894ec;
        height:1.5rem;
        line-height: 1.5rem;
        text-align:left;
        font-size: .6rem;
        border: none;
        outline: none;
        background:#f5f5f5;
        border-top-right-radius:none;
        border-bottom-right-radius:none;
    }
    .sseek>div>span{
        display:block;
        width:14%;
        background:#f5f5f5;
        height:1.5rem;
        line-height:1.5rem;
        border-top-right-radius:5px;
        border-bottom-right-radius:5px;
        margin-left:-2px;
        box-sizing:border-box;
        padding-left:3px;
        padding-top:.4rem;
    }
    .sseek>div>span>img{
        max-width:1rem;
        float:left;
    }
    .sseek>div>input[type='text']::-webkit-input-placeholder{
        color:#999;;   
    }


    /*返回结果*/
    .results>.items{
        width:100%;
        height:7.5rem;
        display: flex;
        justify-content: space-around;
        color:#ccc;
        box-sizing:border-box;
        padding:.5rem;
        border-bottom:1px solid #eee;
    }
    .results>.items>div:nth-child(1){
        width:28%;
        height:100%;
        box-sizing: border-box;
        padding:1rem 0;
    }
    .results>.items>div:nth-child(2){
        width:55%;
        height:100%;
    }
    .results>.items>div:nth-child(3){
        width:25%;
        height:100%;
        box-sizing: border-box;
        padding-top:.3rem;
    }
    .results>.items>div:nth-child(1)>img{
        width:4.5rem;
        height:4.5rem;
    }
    .results>.items>div:nth-child(2)>h1{
        font-size:.8rem;
        height:2rem;
        line-height:1rem;
        color:#666;
        overflow: hidden;
        font-weight:none;
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