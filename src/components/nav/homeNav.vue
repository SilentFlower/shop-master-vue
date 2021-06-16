<template>
  <el-row  style="height: 80px" type="flex" align="middle"  class="wtfNav">

    <el-col class="make-center auto" :offset="2" :span="2">
      <a href="/" class="auto">
        <img class="logo auto" style="height: 80px;width: 90px" src="static/logo.png">
      </a>
    </el-col>

    <el-col class="make-center" style="margin-left: 40px" :span="13">

      <el-menu
        :default-active="activeChoose"
        mode="horizontal"
        class="mainMenu"
        background-color="#FFFFFF"
        text-color="#6A6A6A"
        active-text-color="#4F6EED"
        style="text-align: center;border: 0px;">
        <el-menu-item class="nav"  index="1" @click="gotoHome">首页</el-menu-item>
        <el-submenu index="2">
          <template style="font-size: 20px" slot="title">最新活动</template>
          <el-menu-item index="2-1">活动1</el-menu-item>
          <el-menu-item index="2-2">活动2</el-menu-item>
          <el-menu-item index="2-3">活动3</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item class="nav" index="3" disabled>消息中心</el-menu-item>
        <el-menu-item class="nav" index="4"><a href="https://www.ele.me" target="_blank" style="text-decoration-line: none">订单管理</a></el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="4">

      <el-input prefix-icon="el-icon-search" placeholder="请输入搜索的商品" v-model="searchValue" @keyup.enter.native="searchGood">

      </el-input>
    </el-col>

    <el-col v-if="buttonStatus && wtfVisible" class="make-center buttonGroup" style="justify-content: flex-end;margin-right: 20px"  :span="6">
      <div class="login_click" style="margin-right: 20px">
        <a  href="javascript:void(0);" @click="dialogVisible2 = true">登 录</a>
      </div>
      <div class="register_click">
        <a class="auto" href="javascript:void(0);" @click="dialogVisible = true">快速注册</a>
      </div>
    </el-col>

    <el-col v-if="!buttonStatus && wtfVisible" class="make-center buttonGroup" style="justify-content: flex-end;margin-right: 20px"  :span="6">
      <div class="login_click" style="margin-right: 20px">
        <a  href="javascript:void(0);" @click="personalCenter">个人中心</a>
      </div>
    </el-col>


    <register :dialogVisible="dialogVisible" @close="dialogVisible = false" @openLogin="openLogin"></register>
    <login :dialogVisible="dialogVisible2" @close="dialogVisible2 = false" @openRegister="openRegister"></login>

  </el-row>

</template>

<script>
  import register from "../form/register"
  import login from "../form/login"
  import Auth from '@/utils/auth.js'
  export default {
    data() {
      return {
        activeChoose: null,//默认选择
        //注册
        dialogVisible: false,
        //登陆
        dialogVisible2: false,
        //判断是否登陆
        buttonStatus: null,
        //渲染与否
        wtfVisible: false,
        //商品搜索内容
        searchValue:null,
      }
    },
    mounted() {
      if (!this.$auth.getFirstFlag()) {
        if (this.$auth.getToken() != null && this.$auth.getToken() != "") {
          this.buttonStatus = false;
        }else{
          this.buttonStatus = true;
        }
        this.wtfVisible = true;
        this.wtfVisible = true
      }
    },
    methods:{
      //搜索商品页面
      searchGood(){
        this.$router.push({
          name: '搜索',
          query:{
            searchValue: this.searchValue
          }
        })
      },
      //商城首页
      gotoHome(){
        this.$router.push({
          name:'首页'
        });
      },
      //子组件登陆调用方法,登陆页面跳转注册页面
      openRegister(){
        this.dialogVisible = true
      },
      //子组件登陆调用方法,注册页面跳转登陆页面
      openLogin(){
        this.dialogVisible2 = true
      },
      personalCenter() {
        this.$router.push("/personalCenter");
      },
    },
    computed: {
      listenFlag() {
        return this.$auth.getFirstFlag();
      }
    },
    watch:{
      listenFlag:function(old,newd){
        if (old == false) {
          if (this.$auth.getToken() != null && this.$auth.getToken() != "") {
            this.buttonStatus = false;
          }else{
            this.buttonStatus = true;
          }
          this.wtfVisible = true;
        }
      },
    },
    components:{
      register,
      login
    }

  }
</script>
<style>

  .wtfNav{
    font-size:14px;
    font-family: 微软雅黑,宋体,Arial,Helvetica,Verdana,sans-serif;
    font-weight:bold;
    position: fixed!important;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: 999;
    border: 0;
    box-shadow: 0 4px 20px 2px rgba(40,112,220,.08);
    background-color: #FFFFFF;
  }

  .wtfNav .login_click a
  {
    text-decoration:none;
    background:#2f435e;
    color:#f2f2f2;

    padding: 10px 30px 10px 30px;
    font-size:14px;
    font-family: 微软雅黑,宋体,Arial,Helvetica,Verdana,sans-serif;
    font-weight:bold;
    border-radius:3px;

    -webkit-transition:all linear 0.30s;
    -moz-transition:all linear 0.30s;
    transition:all linear 0.30s;

  }
  .wtfNav .login_click a:hover { background:#385f9e; }

  .wtfNav .register_click a
  {
    text-decoration:none;
    background:#FB7299;
    color:#f2f2f2;

    padding: 10px 30px 10px 30px;
    font-size:16px;
    font-family: 微软雅黑,宋体,Arial,Helvetica,Verdana,sans-serif;
    font-weight:bold;
    border-radius:3px;

    -webkit-transition:all linear 0.30s;
    -moz-transition:all linear 0.30s;
    transition:all linear 0.30s;

  }
  .wtfNav .register_click a:hover { background:#73C9E5; }

  .wtfNav .auto{
    max-width: 100%;
    height: 100%;
    caret-color: transparent;
  }

  .wtfNav .buttonGroup button:last-child {
    background-color: #F16B6F;
    color: #ffffff;
    border: 0px;
  }

  .wtfNav .mainMenu>*{
    margin-right: 20px !important;
  }

  .el-menu-item{
    font-size: 16px;
  }

  .el-submenu__title{
    font-size: 16px;
  }


  .wtfNav .make-center{
    display: flex;
    align-items: center;
  }

  .make-all-center{
    display: flex;
    justify-content: center;
    align-items: center;
  }


</style>
