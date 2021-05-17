import Vue from 'vue'
import Router from 'vue-router'
import Index from '../view/Index'
import Test from '../view/test'
import PersonalCenter from '../view/Personal/PersonalCenter'
import MyMessage from'../view/Personal/MyMessage'
import Auth from "../utils/auth";
import store from '@/store/index.js'

Vue.use(Router)

let router =  new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: '主页',
      component: Index
    },
    {
      path: '/test',
      name: '测试',
      component: Test
    },
    {
      path: '/personalCenter',
      name: '个人中心',
      component: PersonalCenter,
      children:[
        {
          path: '/myMessage',
          name: '我的消息',
          component: MyMessage
        }

      ]
    },
  ]
});
router.beforeEach((to, from, next) => {
  next();
});
export default router
