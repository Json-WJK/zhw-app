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

 

//-引入指定组件
import {Swipe,SwipeItem} from "mint-ui";//-注册当前项目中 <mt-header> 
Vue.component(Swipe.name,Swipe);
Vue.component(SwipeItem.name,SwipeItem);
//2:引入vue-resource 发送ajax
//-引入vue-resource  库所有组件
import VueResource from "vue-resource";
//-将所有组件注册
Vue.use(VueResource);



Vue.http.options.root = "http://127.0.0.1:1997/"
Vue.http.options.emulateHTTP=true;
Vue.http.options.emulateJSON=true;
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
