<template>
    <div class="order">
        <!-- 页头 -->
        <h1>
            <span class="mui-icon mui-icon-arrowleft" @click="retreat(game_id)"></span>
            <span>我要租</span>
        </h1>
        <!-- 账号名称及主要信息 -->
        <a class="items">
            <div><img :src="img.game_md" alt=""></div>
            <div>
                <h1>{{detail[0].details_name}}</h1>
                <p></p>
                <div>
                    此账号号主已开启到时不下线
                </div> 
                <div>
                </div>
            </div>
            <div class="as">
                <div>
                    <span>商</span>
                    <span>陪</span>
                    <span>顶</span>
                </div>
            </div>
        </a>
        <!-- 账号租金情况 -->
        <ul class="price">
            <li @click="cut(1)"><span :class="cutn==1?'bg_cut':''">时租</span><span :class="cutn==1?'bg_cut':''">{{detail[0].hour}}元</span></li>
            <li @click="cut(2)"><span :class="cutn==2?'bg_cut':''">日租</span><span :class="cutn==2?'bg_cut':''">{{detail[0].hours}}元</span></li>
            <li @click="cut(3)"><span :class="cutn==3?'bg_cut':''">包夜</span><span :class="cutn==3?'bg_cut':''">{{detail[0].morning}}元</span></li>
            <li @click="cut(4)"><span :class="cutn==4?'bg_cut':''">10小时</span><span :class="cutn==4?'bg_cut':''">{{detail[0].night}}元</span></li>
            <li @click="cut(5)"><span :class="cutn==5?'bg_cut':''">周租</span><span :class="cutn==5?'bg_cut':''">{{detail[0].week}}元</span></li>
        </ul>
        <ul class="choice">
            <li><span>可租时段与时长</span><span>0:00-24:00;4-300(小时)</span></li>
            <li>
                <span>租号时长</span>
                <span>
                    <img src="http://127.0.0.1:1997/app/minu1.png" alt="" @click="isadd(-1)">
                    <font>{{hire}}</font>
                    <img src="http://127.0.0.1:1997/app/add.png" alt="" @click="isadd(+1)">
                </span>
            </li>
            <li>下单后，是从当前时间开始计算，与预约时间冲突则不可租赁。</li>
            <li><span>红包</span><span>暂无可用红包</span></li>
            <li><span>租金</span><font>{{prices}}</font></li>
            <li class="yjs">
                <span>押金</span><font>0.00</font>
                <div>(押金会在订单完成后24小时内退回至您的租号玩账户)</div>
            </li>
            <li><input type="checkbox" v-model="isck" @click="iscks()">我已阅读并同意<a>《租号玩服务协议》</a></li>
        </ul>
        <div class="o_footer">
            实付总金额 
            <font>￥{{prices}}</font>  
            <button @click="balance()">立即租用</button>
        </div>
    </div>
</template>
<script>
import {Toast} from "mint-ui"
import { MessageBox } from 'mint-ui';
import { Indicator } from 'mint-ui';
    export default{
        data(){
            return{
                game_id:this.$route.query.game_id,
                detail:[],
                img:{},
                cutn:1,//样式切换
                hire:0,//最低租号时长
                isck:false,//是否选中
                DateTime:""//当前时间
            }
        },
        methods:{
            details(){
                var url="detail/details";
                this.$http.get(url+"?game_id="+this.game_id).then(result=>{
                    this.detail=result.body
                    this.hire=this.detail[0].hire
                })
            },
            imgs(){
            var url="detail/gamegallery";
            this.$http.get(url+"?game_id="+this.game_id).then(result=>{
                this.img=result.body[0]
            })
            },
            cut(li){//样式切换
                this.cutn=li;
            },
            retreat(game_id){//返回传参
                this.$router.push({path:"/select/details",query:{game_id}})
            },
            isadd(n){//限制最低租用时长
                if(this.detail[0].hire<=this.hire){
                    if(this.detail[0].hire==this.hire){
                        if(n==1) this.hire++ 
                        else Toast('不能低于最低租号时长');
                    }else{
                        this.hire+=n
                    }
                }else{
                    Toast('不能低于最低租号时长');
                }
            },
            balance(){//判断余额是否充足
                var url="user/data";
                var uname=this.$store.state.uname;     
                this.$http.post(url,{uname},{emulateJSON:true}).then(result=>{
                    if(this.isck==false)    MessageBox('提示','请同意租号玩协议')
                    else if(uname=="")  Toast("请登录后操作")  
                    else if(result.body[0].balance<this.prices) Toast("余额不足")
                    else if(result.body[0].balance>=this.prices) this.game_add()
                    else result   
                })
            },
            game_add(){//租号成功
                var uname=this.$store.state.uname;
                var game_id=this.game_id;
                this.DateTimes()
                var DateTime=this.DateTime;
                var duration=this.hire;
                var url="order/add";
                this.$http.post(url,{uname,game_id,DateTime,duration},{emulateJSON:true}).then(result=>{
                    Indicator.open('下单中...');
                    setTimeout(() => {
                        Indicator.close();
                    }, 1000);
                    setTimeout(() => {
                        MessageBox('提示','下单成功')
                        this.$router.push("/home")
                    }, 1200);
                })
                /*完成扣费 */
                var url="order/fee"
                var down=this.prices
                this.$http.post(url,{down,uname},{emulateJSON:true}).then(result=>{                  
                })
            },
            iscks(){
                this.isck==!this.isck;
            },
            DateTimes(){//获取当前时间
                var myDate = new Date();
                var year=myDate.getFullYear();//年
                var month=myDate.getMonth()+1;//月
                var date=myDate.getDate();//日
                var hour=myDate.getHours();//时
                var minute=myDate.getMinutes();//分
                var second=myDate.getSeconds();//秒
                var m=myDate.getMinutes(); 
                var h=myDate.getHours(); 
                var DateTime=year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
                this.DateTime=DateTime
            },
        },
        computed:{
            prices(){//计算总价格
                var sum=0;
                return sum=(this.hire*this.detail[0].hour).toFixed(2)
            }
        },
        created(){
            this.details()
            this.imgs()
        },
    }
</script>
<style>
/*选择租用时长*/
    .order .choice{
        background:#fff;
        width:100%;
        font-size:.8rem;
        padding:.5rem 1rem;
    }
    .order .choice>li{
        height:2.5rem;
        width:100%;
        color:#3d4145;
    }
    .order .choice>li:not(:last-child){
        border-bottom:1px solid #eee;
    }
    .order .choice>li{
        height:2.5rem;
        width:100%;
        line-height:2.5rem;
    }
    .order .choice>li:nth-child(1)>span:nth-child(2){
        color:#ccc;
        font-size:.7rem;
        margin-left:1rem;
    }
    .order .choice>li:nth-child(2)>span:nth-child(2){
        color:#ccc;
        font-size:.7rem;
        float:right;
    }
    .order .choice>li:nth-child(2)>span:nth-child(2){
        color:#ccc;
        font-size:.7rem;
        float:right;
    }
    .order .choice>li:nth-child(2)>span:nth-child(2)>img{
        width:1.5rem;
        height:1.5rem;
        vertical-align: middle;
        margin:0 1rem;
    }
    .order .choice>li:nth-child(2)>span:nth-child(2)>img:nth-child(3){
        margin-right:0;
    }
    .order .choice>li:nth-child(2)>span:nth-child(2)>font{
        display: inline-block;
        color:#000;
    }
    .order .choice>li:nth-child(3){
        color:#febe05;
        font-size:.7rem;
    }
    .order .choice>li:nth-child(4)>span:nth-child(2){
        float: right;
        color:#ccc;
    }
    .order .choice>li:nth-child(5)>font:nth-child(2),
    .order .choice>li:nth-child(6)>font:nth-child(2)
    {
        float: right;
        color:#e8292e;
    }
    .order .choice>li:nth-child(7){
        text-align:right;
    }
    .order .choice>li:nth-child(7)>a:nth-child(2){
        font-size:.7rem;
    }
    /*页头*/
    .order>h1{
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
    .order>h1>span:nth-child(1){
        color:#ccc;
        font-size:1.5rem;
    }
    .order>h1>span:nth-child(2){
        font-size:1rem;
        line-height:1.5rem;
        color:#333;
        font-weight:400;
        width:90%;
    }
    .order>h1>img{
        width:1rem;
        height:1rem;
    }
    /*账号名称  价格*/
    .order>.items{
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
    .order>.items>div:nth-child(1){
        width:28%;
        height:100%;
        box-sizing: border-box;
        padding:1rem 0;
    }
    .order>.items>div:nth-child(2){
        width:55%;
        height:100%;
        margin-top:1rem;
    }
    .order>.items>div:nth-child(3){
        width:25%;
        height:100%;
        box-sizing: border-box;
        padding-top:.3rem;
    }
    .order>.items>div:nth-child(1)>img{
        width:5rem;
        height:5rem;
    }
    .order>.items>div:nth-child(2)>h1{
        width:140%;
        font-size:.8rem;
        height:2rem;
        line-height:1rem;
        color:#666;
        overflow: hidden;
        font-weight:none;
    }
    .order>.items>div:nth-child(2)>p{
        margin:0
    }
    .order>.items>div:nth-child(2)>p>span{
        padding:.05rem .5rem;
        box-sizing: border-box;
        border:1px solid #ff6868;
        color:#ff6868;
        font-size:.7rem;
        border-radius: .2rem;
    }
    .order>.items>div:nth-child(2)>div:nth-child(3){
        width:140%;
        font-size:.6rem;
        color:#ff6868;
    }
    .order>.items>div:nth-child(2)>div:nth-child(4){
        font-size:.8rem;
    }
    /* .order>.items>div:nth-child(2)>div:nth-child(4)>span{
        display: inline-block;
        font-size:.7rem;
        background:#ccc;
        color:#fff;
        box-sizing: border-box;
        padding:.05rem .3rem;
        margin:0 .1rem;
    } */
    .order>.items>div:nth-child(3){
        text-align:right;
        padding-top:5rem;
    }
    .order>.items>div:nth-child(3)>div:nth-child(1){
        color:#fff;
    }
    .order>.items>div:nth-child(3)>div:nth-child(2){
        font-size:.8rem;
    }
    .order>.items>div:nth-child(3)>div:nth-child(3){
        margin-top:2.0rem;
    }
    .order>.items>.as>div>span{
        font-size:.7rem;
        box-sizing: border-box;
        padding:.1rem .2rem;
        color:#fff;
        border-radius: .2rem;
        margin:0 .1rem;
    }
    .order>.items>.as>div>span:nth-child(1){
        background:#ff782e;
    }
    .order>.items>.as>div>span:nth-child(2){
        background:#ffca00;
    }
    .order>.items>.as>div>span:nth-child(3){
        background:#23bbff;
    }

    /*账号租用价格*/
    .order>.price{
        font-size:.9rem;
        text-align:center;
        width:95%;
        margin:.7rem auto;
    }
    .order>.price::after{/*清除租用价格区域浮动*/
        content:"";
        display: block;
        clear:both;
    }
    .order>.price>li{
        float:left;
        width:20%;
        border-left:1px solid #ccc;
    }
    .order>.price>li:nth-child(1){
        border-left:none;
    }
    .order>.price>li>span{
        display: block;
        height:2.3rem;
        line-height: 2.3rem;
    }
    .order>.price>li>span:nth-child(1){
        background-color: #fff;
        color:#3d4145;
        border-top:2px solid #febe05;
    }
    .order>.price>li>span:nth-child(2){
        font-size:.8rem;
        color: #999;
        border-top: 1px dashed #cecece;
        background-color: #e5e5e5;
    }

    /*底部立即租用*/
    .order .o_footer{
        width:100%;
        max-width:768px;
        height:3rem;
        background:#fff;
        z-index: 999;
        position:fixed;
        bottom:0;
        text-align: right;
        line-height:3rem;
    }
    .order .o_footer font{
        color:#e8292e;
    }
    .order .o_footer>button{
        width:35%;
        background:#0894ec;
        border:none;
        height:3rem;
        color:#fff;
        margin-left:.5rem;
        font-size:1rem;
        border-radius:0;
    }

    /*押金红字定位*/
    .order .yjs{
        position: relative;
        height:3rem !important;
        
    }
    .order .yjs>div{
        position: absolute;
        font-size:.7rem;
        bottom:-.7rem;
        right:0rem;
        color:#e8292e;
    }

    /*点击样式切换*/
    .order .bg_cut{
        background:#ffce05 !important;
        color:#fff !important;
        border-bottom:1px solid #fff;
    }
</style>