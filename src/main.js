import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'mint-ui/lib/style.css'
Vue.config.productionTip = false
//5: 设置请求的根路径 
//Vue.http.options.root = "http://127.0.0.1/vue_ser/";
//6:全局设置post 时候表音的数据组织格式为 application/x-www-form-urlencoded
//Vue.http.options.emulateJSON = true;
// 导入 MUI 的样式表， 和 Bootstrap 用法一样
import './lib/mui/css/mui.css'
// 导入 MUI 的样式表，扩展图标样式，购物车图标
// 还需要加载图标字体文件
import './lib/mui/css/icons-extra.css'

/*日期格式过滤器 */
Vue.filter("datetimeFilter",function(val){
  var date =new Date(val);
  var y = date.getFullYear();
  var m = date.getMonth()+1;
  var d = date.getDate();
  var h = date.getHours();
  var min = date.getMinutes();
  var s = date.getSeconds();
  m<10&&(m="0"+m);
  d<10&&(d="0"+d);
  return `${y}-${m}-${d} ${h}:${min}:${s}`;
})



//-引入指定组件

import {Swipe,SwipeItem,InfiniteScroll} from "mint-ui";//-注册当前项目中 <mt-header> 
Vue.component(Swipe.name,Swipe);
Vue.component(SwipeItem.name,SwipeItem);
Vue.use(InfiniteScroll);


//2:引入vue-resource 发送ajax
//-引入vue-resource  库所有组件
import VueResource from "vue-resource";
//-将所有组件注册
Vue.use(VueResource);

/*vuex*/ 
import Vuex from 'vuex'
Vue.use(Vuex)
var store=new Vuex.Store({
    state:{
      islogin:0,
      uname:"",
      seek:"",
      seek_r:undefined,
    },
    mutations:{
      islg(state,is){
        state.islogin=is
      },
      r_uname(state,rn){
        state.uname=rn
      },
      seeks(state,s){
        state.seek=s
      }
    },
    getters:{
      as:function(state){
        return state.a
      }
      
    }
})

Vue.http.options.root = "http://127.0.0.1:1997/"
Vue.http.options.emulateHTTP=true;
Vue.http.options.emulateJSON=true;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


