import Vue from 'vue'
import Router from 'vue-router'
import home from "./components/Home.vue"
import select from "./components/Select.vue"
import details from "./components/Select/Details.vue"
import order from "./components/Select/Order.vue"
import download from "./components/Download/Download.vue"
import login from "./components/Login.vue"
import user from "./components/User.vue"
import rent from "./components/User/Rent.vue"
import collect from "./components/User/Collect.vue"
import pay from "./components/User/Pay.vue"
Vue.use(Router)

export default new Router({
  routes: [
    {path:'/',component:home},
    {path:'/home',component:home},
    {path:'/select',name:"select",component:select},
    {path:'/select/details',component:details},
    {path:'/select/order',name:"order",component:order},
    {path:'/d_app',component:download},
    {path:'/login',component:login},
    {path:'/user',component:user},
    {path:'/user/rent',component:rent},
    {path:'/user/collect',component:collect},
    {path:'/user/pay',component:pay},
  ]
})
