import Vue from 'vue'
import Router from 'vue-router'
import Index from '../view/Index'
import Test from '../view/test'
import PersonalCenter from '../view/Personal/PersonalCenter'
import MyMessage from'../view/Personal/MyMessage'
import EditPwd from "../view/Personal/EditPwd";
import InformationSummary from "../view/Personal/InformationSummary";
import Withdraw from "../view/Personal/Withdraw";
import Master from "../view/Master/master";
import Home from "../view/Master/home";
import Search from "../view/Master/search";
import Good from "../view/Master/good";
import ShopCart from "../view/Master/shoppingCart";
import LoginLog from "../view/Personal/LoginLog";
import MerchantInformation from "../view/Personal/MerchantInformation";
import FundingChanges from "../view/Personal/FundingChanges";
import AddGood from "../view/Personal/AddGood";
import EditGood from "../view/Personal/EditGood";
import TransactionRecord from "../view/Personal/TransactionRecord"
import ComplaintOrder from "../view/Personal/ComplaintOrder"
import Coupon from "../view/Personal/Coupon"
import EditCoupon from "../view/Personal/EditCoupon"
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
      component: Index,
      children: [
        {
          path: '/',
          name: '主页',
          component: Home
        },
        {
          path: '/master',
          name: '首页',
          component: Master
        },
        {
          path: '/search',
          name: '搜索',
          component: Search
        },
        {
          path: '/good',
          name: '商品',
          component: Good
        },
        {
          path: '/shopCart',
          name: '购物车',
          component: ShopCart
        }
      ]
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
        },
        {
          path: '/loginLog',
          name: '登录日志',
          component: LoginLog
        },
        {
          path: '/merchantInformation',
          name: '商户信息',
          component: MerchantInformation
        },
        {
          path: '/fundingChanges',
          name: '资金变动',
          component: FundingChanges
        },
        {
          path: '/addGood',
          name: '添加商品',
          component: AddGood
        },
        {
          path: '/editGood',
          name: '商品列表',
          component: EditGood
        },
        {
          path:'/transactionRecord',
          name:'交易记录',
          component:TransactionRecord
        },
        {
          path:'/complaintOrder',
          name:'投诉管理',
          component:ComplaintOrder
        },
        {
          path:'/coupon',
          name:'生成优惠券',
          component:Coupon
        },
        {
          path:'/editCoupon',
          name:'优惠券管理',
          component:EditCoupon
        }

      ]
    },
  ]
});
router.beforeEach((to, from, next) => {
  next();
});
export default router
