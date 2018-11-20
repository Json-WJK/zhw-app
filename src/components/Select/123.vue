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
            <ul class="s_ify">
                <li :class="li_click==1?'li_bg':''" @click="li_bgs(1)"><span>排序</span><span>▼</span></li>
                <li :class="li_click==2?'li_bg':''" @click="li_bgs(2)"><span>游戏</span><span>▼</span></li>
                <li :class="li_click==3?'li_bg':''" @click="li_bgs(3)"><span>状态</span><span>▼</span></li>
                <li :class="li_click==4?'li_bg':''" @click="li_bgs(4)"><span>免费体验</span></li>
            </ul>
            <div class="down" :class="li_click==1?'flex':''">
                <ul class="li_down">
                    <li v-for="(item,i) in down_list" :key="i" :class="li_down==i?'li_bg':''" @click="li_downs(i)">{{item}}</li>
                    <!-- <li :class="li_down==1?'li_bg':''" @click="li_downs(1)">综合</li>
                    <li :class="li_down==2?'li_bg':''" @click="li_downs(2)">销量</li>
                    <li :class="li_down==3?'li_bg':''" @click="li_downs(3)">价格</li>
                    <li :class="li_down==4?'li_bg':''" @click="li_downs(4)">时间</li>
                    <li :class="li_down==5?'li_bg':''" @click="li_downs(5)">收藏</li>
                    <li :class="li_down==6?'li_bg':''" @click="li_downs(6)">到时不下线</li>
                    <li :class="li_down==7?'li_bg':''" @click="li_downs(7)">新手专区</li> -->
                </ul>
                <ul class="r_down">
                    <li :class="li_down==1?'li_block':''">从高到低</li>
                    <li :class="li_down==1?'li_block':''">从低到高</li>
                    <li :class="li_down==2?'li_block':''">从高到低</li>
                    <li :class="li_down==2?'li_block':''">从低到高</li>
                    <li :class="li_down==3?'li_block':''">最新发布</li>
                    <li :class="li_down==3?'li_block':''">今日更新</li>
                    <li :class="li_down==4?'li_block':''">从低到高</li>
                    <li :class="li_down==4?'li_block':''">从高到低</li>
                    <li :class="li_down==5?'li_block':''">是</li>
                </ul>
            </div>
        </div>
        <div 
            class="results"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10"
        >
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
            <div class="upload">{{upload}}.</div>
        </div>
    </div>
</template>
<script>
import {Toast} from "mint-ui"
import {Indicator} from 'mint-ui';
    export default{
        data(){
            return{
                lists:[],
                listall:[],
                seek:"",
                pno:0,
                down_list:["综合","销量","价格","时间","收藏","到时不下线","新手专区"],
                li_click:0,//搜索栏下的4大分类
                li_down:1,//下拉列表
                isseek:false,//是否为搜索跳转
                loading:false,//无限加载组件属性
                isall:false,//判定是否加载完全
                upload:"正在加载...",//判断是否为底部
            } 
        },
        methods:{
            all(){//is  seek最终执行函数
                setTimeout(() => {//等待  玩命加载中...   提示消失
                    if(this.$store.state.seek_r==undefined){//如果vueX中没有搜索返回结果或没查找到该类型账号
                        if(this.isseek==true){//判定为搜索跳转
                            Toast('未能找到该商品信息')
                            this.isseek=false //更改显示方式为非搜索跳转
                        }
                        //执行分类跳转
                        var url="search/classifylist"
                        this.$http.get(url+"?pno="+this.pno+"&game_family_id="+this.game_family_id).then(result=>{
                            if(result.body.products.length==0){//如果没有显示默认
                                    var url="search/gamelist";
                                    this.$http.get(url+"?pno="+this.pno).then(result=>{
                                        this.lists=result.body.products.slice(0,10)
                                        this.listall=result.body.products
                                    })
                            }else{//如果有该类型账号
                                this.lists=result.body.products.slice(0,10)
                                this.listall=result.body.products
                            }  
                            })
                 //搜索结果 如果vueX中有搜索返回结果
                    }else if(this.$store.state.seek_r.length>0){
                        this.lists=this.$store.state.seek_r.slice(0,10)//只显示10条数据
                        this.listall=this.$store.state.seek_r
                    }
                }, 300);    
            },
            details(id,fid){//跳转详情页并传参
                this.$router.push({path:"/select/details",query:{game_id:id,game_family_id:fid}})
            },
            seeks(){//搜索 页面加载完成默认执行一次
                Indicator.open('玩命加载中...');
                setTimeout(() => {
                    Indicator.close();
                    if(this.seek!=""){//搜索请求
                    this.isseek=true;//更改isseek   显示模式为：搜索
                    var url="search/seek"
                    this.$http.get(url+"?kwords="+this.seek+"&pno="+this.pno).then(result=>{
                        this.$store.state.seek_r=result.body.products//将结果赋值到vueX对象中
                        this.all()
                    })
                    }
                }, 500);
               
            },
            loadMore() {//下滑加载更多
                if(this.isall==true) return
                this.loading = true;
                setTimeout(() => {
                    for (let i = 1; i <= 5; i++) {
                        let last = this.listall[this.lists.length];
                        if(last==undefined){
                            Toast({
                                message: '好像没有了哎！',
                                position: 'bottom',
                                duration: 1000
                            });
                            this.isall=true
                            this.upload="--------------我也是有底线的--------------"
                            break
                        }
                        this.lists.push(last);
                    }
                    this.loading = false;
                }, 2000);
            },
            li_bgs(i){//搜索框下  四大分类
                if(this.li_click==i){
                    this.li_click=0
                }else{
                    this.li_click=i
                }
            },
            li_downs(i){
                this.li_down=i
            }
        },
        created(){
            this.seek=this.$store.state.seek//默认等于home搜索框的seek
            this.all()
            this.seeks() 
        },
        props:["game_family_id"]//接收父组件传递的id
    }
   
</script>
<style>
    .results{
        margin-bottom:3rem;
        margin-top:2rem;
    }
    /*底部正在加载*/
    .results .upload{
        text-align:center;
        background:#eee;
        color:#aaa;
        font-size:.8rem;
    }
    /*搜索框*/
    .sseeks{
        height:3rem;
        position: relative;
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
    /*搜索框下 分类展开列表*/
    .sseeks>.s_ify{
        position:fixed;
        width:100%;
        max-width:768px;
        top:3rem;
        text-align:center;
        font-size:.8rem;
        color:#777;
        height:2rem;
        border-bottom:1px solid #ddd;
        background:#fff;
    }
    .sseeks>.s_ify>li{
        width:25%;
        float:left;
        height:100%;
    }
    /*点击添加样式*/
    .li_bg{
        color:#ffca00;
    }
    /*下拉列表*/
    .sseeks .down{
        position: fixed;
        top:5rem;
        width:100%;
        max-width: 768px;
        display: none;
    }
    .sseeks .flex{
        display: flex !important;
    }
    .sseeks .li_down{
        background:#f0f0f0;
        font-size:.7rem;
        color:#000;
        width:25%;
        max-width:192px;
        text-align: center;
    }
    .sseeks .li_down>li{
        width:100%;
        height:2.5rem;
        line-height:2.5rem;
    }
    .sseeks .li_down>li:not(:last-child){
        border-bottom:1px solid #fff;
    }

    /*下拉右侧*/
    .sseeks .r_down{
        background:#fff;
        width:75%;
        max-width:576px;
        height:17.5rem;
        padding:0 1.5rem;
        font-size:.7rem;
    }
    .sseeks .r_down>li{
        height:2.5rem;
        line-height:2.5rem;
        border-bottom:1px solid #eee;
        display: none;
    }
    .sseeks .li_block{
        display: block !important;
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