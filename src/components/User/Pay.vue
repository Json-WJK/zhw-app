<template>
    <div class="pay">
        <h1>
            <span class="mui-icon mui-icon-arrowleft" @click="retreat()"></span>
            <span>充值</span>
        </h1>
        <div class="hint">温馨提示：充值可能有延迟，长时间未到账请联系<font>租号玩</font>在线客服！</div>
        <div class="sum">
            <div><span>充值金额（￥）</span><input v-model="val" type="text" placeholder="请填写充值金额" onkeyup="value=value.replace(/[^\d]/g,'')"></div>
            <div>支付方式</div>
            <div class="select">
                <img src="http://127.0.0.1:1997/app/wx.png" alt="">
                <div>
                    <span>微信支付</span><br>
                    <font>使用微信支付，安全快捷</font>
                </div>
                <input type="radio" v-model="wxs" @click="wx()">
            </div>
            <div class="select">
                <img src="http://127.0.0.1:1997/app/pay.png" alt="">
                <div>
                    <span>支付宝支付</span><br>
                    <font>便捷支付</font>
                </div>
                <input type="radio" v-model="pays" @click="pay()">
            </div>
        </div>
        <button @click="button()">确认充值</button>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import { Indicator } from 'mint-ui';
export default {
    data(){
        return{
            wxs:false,
            pays:false,
            val:""
        }
    },
    methods:{
        retreat(){//点击返回
            this.$router.push("/user")
        },
        wx(){
            if(this.wxs==false) this.wxs=true
            else this.wxs=false
            this.pays=false;
        },
        pay(){
            if(this.pays==false) this.pays=true
            else this.pays=false
            this.wxs=false;  
        },
        button(){//确认充值
            if(this.val=="") Toast("请填写充值金额")
            else if(this.wxs==false&&this.pays==false) Toast("请选择支付方式")
            else{
                var uname=this.$store.state.uname
                var up=this.val
                var url="user/recharge";
                
                MessageBox.prompt('请输入支付密码',{inputType:"password"}).then(({ value, action,}) => {
                    Indicator.open({
                           spinnerType: 'triple-bounce'
                    });
                    this.$http.post(url,{up,uname}).then(result=>{
                    if(result.body.affectedRows>0){
                        setTimeout(() => {
                            Indicator.close();
                            this.$router.push("/user")
                            MessageBox('提示', '充值成功');
                        }, 500);
                    }
                })
                });
                
            }
        }
    },
    created(){
        
    }
}
</script>
<style>
    /*页头*/
    .pay>h1{
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
    .pay>h1>span:nth-child(1){
        color:#ccc;
        font-size:1.5rem;
    }
    .pay>h1>span:nth-child(2){
        font-size:1rem;
        line-height:1.5rem;
        color:#666;
        font-weight:400;
        width:90%;
    }
    .pay>h1>img{
        width:1rem;
        height:1rem;
    }

    /*温馨提示*/
    .pay>.hint{
        margin-top:2.5rem;
        max-height:3rem;
        font-size:.8rem;
        color:#555;
        text-align:center;
        padding:.5rem .5rem;
    }
    .pay>.hint>font{
        color: rgb(255, 0, 0);
    }
    /*充值金额*/
    .pay>.sum{
        background:#fff;
        color:#3d4145;
        font-size:.7rem;
        padding:0 .7rem;
    }
    .pay>.sum>div:nth-child(1)>input{
        float:right;
        width:35%;
        height:1rem;
        font-size:.7rem;
        border:none;
        color:#000;
    }
    .pay>.sum>div:nth-child(1),
    .pay>.sum>div:nth-child(2){
        padding:.7rem 0;
        font-size:.8rem;
    }
    /*选择支付方式*/
    .pay>.sum>.select{
        padding:.8rem 0;
        position:relative;
        border-top:1px solid #ddd;
    }
    .pay>.sum>.select>img{
        float: left;
        width:2rem;
        height:2rem;
        vertical-align:middle;
        margin-top:.2rem;
        margin-right:.5rem;
    }
    .pay>.sum>.select>div>font{
        color:#aaa;
    }
    .pay>.sum>.select>input{
        position: absolute;
        top:40%;
        right:.5rem;
    }
    /*充值按钮*/
    .pay>button{
        display: block;
        width:90%;
        height:2.5rem;
        border-radius: 7px;
        margin:1rem auto;
        background:#3fba5a;
        color:#fff;
    }
    
</style>
