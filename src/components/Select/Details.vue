<template>
    <div class="details">
        <!-- 页头 -->
        <h1>
            <span class="mui-icon mui-icon-arrowleft" @click="retreat(game_family_id)"></span>
            <span>账号详情</span>
            <img src="http://127.0.0.1:1997/app/fenxiang.png" alt="">
        </h1>
        <!-- 账号名称及主要信息 -->
        <a class="items">
            <div><img :src=img.game_md alt=""></div>
            <div>
                <h1>{{detail.details_name}}</h1>
                <p></p>
                <div>
                    此账号号主已开启到时不下线功能，直到下一位租客租用时才下线
                </div> 
                <div>
                    {{detail.adds}}次交易共{{detail.duration}}小时
                </div>
            </div>
            <div>
                <div>￥{{detail.hour}}</div>
                <div>/小时</div>
                <div>
                    <span>商</span>
                    <span>陪</span>
                    <span>顶</span>
                </div>
            </div>
        </a>
        <!-- 账号租金情况 -->
        <ul class="price">
            <li><span>时租</span><span>{{detail.hour}}元</span></li>
            <li><span>日租</span><span>{{detail.hours}}元</span></li>
            <li><span>包夜</span><span>{{detail.night}}元</span></li>
            <li><span>10小时</span><span>{{detail.morning}}元</span></li>
            <li><span>周租</span><span>{{detail.week}}元</span></li>
        </ul>
        <!-- 账号状态 -->
        <ul class="status">
            <li class="status_a"><span>账号状态</span><span>待租</span></li>
            <li class="status_b"><span>游戏区服</span><span>绝地求生</span><span>全区</span><span>全服</span></li>
            <li class="status_c"><span>租号条件</span><span>{{detail.hire}}小时起租</span><span>免押金</span></li>
            <li class="status_d"><span>可租时段与时长</span><span>0:00-24:00 5-999(小时)</span></li>
            <li class="status_e"><span>上号方式</span><span>上号器上号</span></li>
        </ul>
        <!-- 账号信息 -->
        <div class="table">
            <table>
                <thead>
                    <tr><td colspan="2">账号信息</td></tr>
                </thead>
                <tbody>
                    <tr>
                        <td><span>角色：</span>ASDASDASDA</td>
                        <td><span>等级/段位：</span>无</td>
                    </tr>
                    <tr>
                        <td><span>皮肤：</span>0</td>
                        <td><span>段位框：</span>无框/框</td>
                    </tr>
                    <tr>
                        <td><span>英雄：</span>无</td>
                        <td><span>符文：</span>无</td>
                    </tr>
                    <tr>
                        <td><span>最短租期</span>2小时</td>
                        <td><span>可租时间段：</span>0:00-24:00</td>
                    </tr>
                    <tr>
                        <td><span>押金：</span>0元</td>
                        <td><span>排位赛：</span>无</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="d_describe">
            <div>账号描述</div>
            <div>【注意事项2】登号时遇到密码错误或账号冻结的情况，绝对不是账号密码错误，可能是其他原因或操作不当导致的，可以联系平台客服解决，请别轻易投诉撤单。 </div>
        </div>
        <div class="discuss">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>                                                                                               
        <div class="d_footer">
            <div>
                <img :src="iscollect==true?'http://127.0.0.1:1997/app/sc1.png':'http://127.0.0.1:1997/app/shoucang1.png'" alt=""><br>
                <span @click="collect()">收藏</span>
            </div>
            <router-link to="" tag="div">分享得积分</router-link>
            <router-link :to="ismay==true?'/select/order?game_id='+this.game_id:''" tag="div" :style="ismay==true?'':'background:#aaa'">{{ismayC}}</router-link>
        </div>
    </div>
</template>
<script>
import {Toast} from "mint-ui"
import { MessageBox } from 'mint-ui';
export default {
    data(){
        return{
            detail:{details_name:''},
            img:{},
            game_id:this.$route.query.game_id,
            game_family_id:this.$route.query.game_family_id,
            ismay:true,
            ismayC:"我要租",
            iscollect:false,
        }
    },
    methods:{
        details(){
            /*商品详情 */
            var url="detail/details";
            this.$http.get(url+"?game_id="+this.game_id).then(result=>{
                this.detail=result.body[0]
            })
            /*是否被该用户收藏 */
            var url="detail/isenshrines"
            var game_id=this.game_id
            var uname=this.$store.state.uname
            this.$http.post(url,{game_id,uname}).then(result=>{
                if(result.body==1) this.iscollect=true
            })
            /*是否可租 */
            var url="detail/lease"//查询该账号被租用状态
            this.$http.get(url+"?game_id="+this.game_id).then(result=>{
                if(result.body.length==0) return           
                var time=result.body[0].starting_date.replace(/T/,' ').replace('.000Z','');
                //页面打开时调用
                this.timeFn(time,result.body[0].duration);
            })
            
        },
        //更改该账号目前状态
        timeFn(d1,duration){  
            var dateBegin = new Date(d1);
            var dateEnd = new Date();
            var dateDiff = (dateBegin.getTime()+(8+duration)*60*60*1000)-dateEnd.getTime()  ;//时间差的毫秒数
            console.log(dateDiff)
            if(dateDiff>0){//更改按钮样式 并禁用
                this.ismay=false;
                this.ismayC="出租中"
            }else if(dateDiff<=0){//时间达到到期时间  更改该商品状态为可租
                var url="detail/remove"
                console.log(this.game_id)
                this.$http.get(url+"?game_id="+this.game_id).then(result=>{
                    
                })
            }
        //更改从数据库调出的时间格式                    
        },                                                                     
        imgs(){ /*商品图片 */
            var url="detail/gamegallery";
            this.$http.get(url+"?game_id="+this.game_id).then(result=>{
                this.img=result.body[0]
            })
        },
        retreat(id){
            this.$router.push({path:"/select",query:{game_family_id:id}})
        },
        collect(){
            if(this.$store.state.uname==""){
                Toast("请先登录后操作")
                setTimeout(() => {
                    this.$router.push("/login")
                }, 300);
                return
            }
            if(this.iscollect){
                Toast({
                    message: '账号已收藏',
                    position: 'bottom',
                    duration: 1500
                });
                return
            }
            var url="user/enshrines"
            var game_id=this.game_id
            var uname=this.$store.state.uname
            this.$http.post(url,{game_id,uname}).then(result=>{
                if(result.body) MessageBox('提示', '收藏成功');
                this.details()
            })
        }
    },
    created(){
        this.details()
        this.imgs()
    },
}
</script>

<style>
    

/*整体*/
.details{
    margin-bottom:4rem;
}
/*页头*/
    .details>h1{
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
    .details>h1>span:nth-child(1){
        color:#ccc;
        font-size:1.5rem;
    }
    .details>h1>span:nth-child(2){
        font-size:1rem;
        line-height:1.5rem;
        color:#666;
        font-weight:400;
        width:90%;
    }
    .details>h1>img{
        width:1rem;
        height:1rem;
    }
    /*账号名称  价格*/
    .details>.items{
        margin-top:2.5rem;
        width:100%;
        height:7.5rem;
        display: flex;
        justify-content: space-around;
        color:#ccc;
        background:#fff;
        box-sizing:border-box;
        padding:.5rem;
        border-bottom:1px solid #eee;
    }
    .details>.items>div:nth-child(1){
        width:28%;
        height:100%;
        box-sizing: border-box;
        padding:1rem 0;
    }
    .details>.items>div:nth-child(2){
        width:55%;
        height:100%;
    }
    .details>.items>div:nth-child(3){
        width:25%;
        height:100%;
        box-sizing: border-box;
        padding-top:.3rem;
    }
    .details>.items>div:nth-child(1)>img{
        width:4.5rem;
        height:4.5rem;
    }
    .details>.items>div:nth-child(2)>h1{
        font-size:.8rem;
        height:2rem;
        line-height:1rem;
        color:#666;
        overflow: hidden;
        font-weight:none;
    }
    .details>.items>div:nth-child(2)>p{
        margin:0
    }
    .details>.items>div:nth-child(2)>p>span{
        padding:.05rem .5rem;
        box-sizing: border-box;
        border:1px solid #ff6868;
        color:#ff6868;
        font-size:.7rem;
        border-radius: .2rem;
    }
    .details>.items>div:nth-child(2)>div:nth-child(3){
        width:140%;
        font-size:.6rem;
        color:#ff6868;
    }
    .details>.items>div:nth-child(2)>div:nth-child(4){
        font-size:.8rem;
    }
    /* .details>.items>div:nth-child(2)>div:nth-child(4)>span{
        display: inline-block;
        font-size:.7rem;
        background:#ccc;
        color:#fff;
        box-sizing: border-box;
        padding:.05rem .3rem;
        margin:0 .1rem;
    } */
    .details>.items>div:nth-child(3){
        text-align:right;
    }
    .details>.items>div:nth-child(3)>div:nth-child(1){
        font-size:1rem;
        color:#ff6868;
        font-weight: bold;
    }
    .details>.items>div:nth-child(3)>div:nth-child(2){
        font-size:.8rem;
    }
    .details>.items>div:nth-child(3)>div:nth-child(3){
        margin-top:2.0rem;
    }
    .details>.items>div:nth-child(3)>div:nth-child(3)>span{
        font-size:.7rem;
        box-sizing: border-box;
        padding:.1rem .2rem;
        color:#fff;
        border-radius: .2rem;
        margin:0 .1rem;
    }
    .details>.items>div:nth-child(3)>div:nth-child(3)>span:nth-child(1){
        background:#ff782e;
    }
    .details>.items>div:nth-child(3)>div:nth-child(3)>span:nth-child(2){
        background:#ffca00;
    }
    .details>.items>div:nth-child(3)>div:nth-child(3)>span:nth-child(3){
        background:#23bbff;
    }

    /*账号租用价格*/
    .details>.price{
        font-size:.9rem;
        text-align:center;
        width:95%;
        margin:.7rem auto;
    }
    .details>.price::after{/*清除租用价格区域浮动*/
        content:"";
        display: block;
        clear:both;
    }
    .details>.price>li{
        float:left;
        width:20%;
        border-left:1px solid #ccc;
    }
    .details>.price>li:nth-child(1){
        border-left:none;
    }
    .details>.price>li>span{
        display: block;
        height:2.3rem;
        line-height: 2.3rem;
    }
    .details>.price>li>span:nth-child(1){
        background-color: #fff;
        color:#3d4145;
        border-top:2px solid #febe05;
    }
    .details>.price>li>span:nth-child(2){
        font-size:.8rem;
        color: #999;
        border-top: 1px dashed #cecece;
        background-color: #e5e5e5;
    }

    /*账号状态*/
    .details>.status{
        background:#fff;
        width:100%;
    }
    .details>.status>li{
        width:100%;
        padding:0 .7rem;
        height:2.5rem;
        line-height:2.5rem;
        font-size:.7rem;
        border-bottom:1px solid #eee;
    }
    .details>.status>li>span{
        margin:0 .2rem;
    }
    /*状态左侧头*/
    .details>.status>li>span:nth-child(1){
        color:#3d4145
    }
    /*右侧第一行*/
    .details>.status>.status_a>span:nth-child(2){
        display: inline-block;
        color:#fff;
        background:#febe05;
        height:1.2rem;
        line-height:1.2rem;
        width:2.5rem;
        text-align:center;
        border-radius: .5rem;
    }
    /*第二行*/
    .details>.status>.status_b>span:not(:nth-child(1)){
        display: inline-block;
        color:#fff;
        background:#ccc;
        height:1.2rem;
        line-height:1.2rem;
        padding:0 .3rem;
        text-align:center;
    }
    /*第三行*/
    .details>.status>.status_c>span:not(:nth-child(1)){
        display: inline-block;
        color: #e8292e;
        border: 1px solid #e8292e;  
        height:1.2rem;
        line-height:1.2rem;
        padding:0 .3rem;
        text-align:center;
        border-radius: .3rem;
    }
    /*第三行*/
    .details>.status>.status_d>span:not(:nth-child(1)),
    .details>.status>.status_e>span:not(:nth-child(1)){
            color: #999;
    }
    /*账号信息部分*/
    .details>div.table{
        background:#fff;
        margin:.5rem 0;
        padding:1rem 0;
    }
    .details>div>table{
        width:90%;
        margin:0 auto;
        font-size:.7rem;
    }
    .details>div>table>tbody{  
    }
    .details>div>table>tbody>tr>td{
        width:50%;
        border:1px solid #ddd;
        height:2rem;
        padding-left:1rem;
    }
    .details>div>table>tbody>tr>td>span{
        color:#999999;
    }

    /*账号描述*/
    .d_describe{
        background:#fff;
        font-size:.7rem;
        padding:0 1rem;
        color:#999;
    }

    /*底部按钮*/
.d_footer{
    width:100%;
    background:#fff;
    display:flex;
    justify-content:space-around;
    text-align:center;
    font-size:.9rem;
    height:3rem;
    position:fixed;
    bottom:0;
    z-index: 999;
    max-width:768px;
    margin:0 auto;
}
.d_footer>div{
    
}
.d_footer>div:nth-child(1)>img{
    vertical-align: middle;
    width:1.2rem;
    height:1rem;
}
.d_footer>div:nth-child(1){
    width:20%;
    padding-top:.3rem;
    font-size:.7rem;
}
.d_footer>div:nth-child(2){
    width:40%;
    background:#45c059;
    color:#fff;
    padding-top:.8rem;
}
.d_footer>div:nth-child(3){
    width:40%;
    background:#ffca05;
    color:#fff;
    padding-top:.8rem;
}


</style>
