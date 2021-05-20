import Vue from 'vue'
import Router from 'vue-router'
import Index from '../view/Index'
import Test from '../view/test'
import PersonalCenter from '../view/Personal/PersonalCenter'
import MyMessage from'../view/Personal/MyMessage'
import EditPwd from "../view/Personal/EditPwd";
import InformationSummary from "../view/Personal/InformationSummary";
import Withdraw from "../view/Personal/Withdraw";
import Auth from "../utils/auth";
import store from '@/store/index.js'

Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}
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
        },
        {
          path: '/editPwd',
          name: '修改密码',
          component: EditPwd
        },
        {
          path: '/informationSummary',
          name: '个人信息汇总',
          component: InformationSummary
        },
        {
          path: '/withdraw',
          name: '提现',
          component: Withdraw
        }

      ]
    },
  ]
});
router.beforeEach((to, from, next) => {
  next();
});
export default router
