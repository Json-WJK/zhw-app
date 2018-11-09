import Vue from 'vue'
import Router from 'vue-router'
import home from "./components/Home.vue"
import select from "./components/Select.vue"
import download from "./components/Download/Download.vue"
import login from "./components/Login.vue"
import user from "./components/User.vue"
Vue.use(Router)

export default new Router({
  routes: [
    {path:'/',component:home},
    {path:'/home',component:home},
    {path:'/select',component:select},
    {path:'/d_app',component:download},
    {path:'/login',component:login},
    {path:'/user',component:user},
  ]
})
