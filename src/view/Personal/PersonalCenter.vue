<!--个人中心页面-->
<template xmlns:el-col="http://www.w3.org/1999/html">
  <el-row class="personalCenter" type="flex">
<!--    侧边栏-->
    <el-col :span="3" ref="wt"
            @mouseover.native="openMenu"
            @mouseleave.native="closeMenu"
            class="cebian"
            id="leftNav"
            v-resize="getWidth"
    >
        <el-menu
          mode="vertical"
          ref="menu"
          :collapse="collStatus"
          collapse-transition
          default-active="1-1"
          class="el-menu-vertical-demo">
          <div style="display: flex;justify-content: center;align-items: center;padding-top: 20px;padding-bottom: 20px;overflow: hidden;">
            <img src="/static/logo.png" width="80px" height="60px" alt="测试" style="margin-left: 50px;cursor: pointer" @click="gotoHome"/>
            <el-button ref="lockMenuButton" style="border: none;font-size: 18px;" :icon="iconName" plain @click="lockMenu"></el-button>
          </div>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-home"></i>
              <span>我的账户</span>
            </template>
            <el-menu-item index="1-1" @click="goToInfo">信息汇总</el-menu-item>
            <el-menu-item index="1-2">商户信息</el-menu-item>
            <el-menu-item index="1-3">付款方式</el-menu-item>
            <el-menu-item index="1-4">申请提现</el-menu-item>
            <el-menu-item index="1-5">资金变动</el-menu-item>
            <el-menu-item index="1-6">登陆日志</el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-goods"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="2-1">添加分类</el-menu-item>
            <el-menu-item index="2-2">商品分类</el-menu-item>
            <el-menu-item index="2-3">添加商品</el-menu-item>
            <el-menu-item index="2-4">商品列表</el-menu-item>
            <el-menu-item index="2-5">添加卡密</el-menu-item>
            <el-menu-item index="2-6">库存卡密</el-menu-item>
            <el-menu-item index="2-6">管理卡密</el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-sell"></i>
              <span>交易数据</span>
            </template>
            <el-menu-item index="3-1">交易记录</el-menu-item>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-s-management"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="4-1">销售统计</el-menu-item>
            <el-menu-item index="4-2">数据中心</el-menu-item>
            <el-menu-item index="4-3">收益统计</el-menu-item>
          </el-submenu>

          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-s-shop"></i>
              <span>店铺管理</span>
            </template>
            <el-menu-item index="5-1">店铺链接</el-menu-item>
            <el-menu-item index="5-2">店铺管理</el-menu-item>
            <el-menu-item index="5-3">收益统计</el-menu-item>
          </el-submenu>

          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-warning"></i>
              <span>投诉管理</span>
            </template>
            <el-menu-item index="6-1">投诉管理</el-menu-item>
          </el-submenu>

          <el-submenu index="7">
            <template slot="title">
              <i class="el-icon-s-ticket"></i>
              <span>优惠券</span>
            </template>
            <el-menu-item index="7-1">优惠券管理</el-menu-item>
            <el-menu-item index="7-2">优惠券生成</el-menu-item>
          </el-submenu>

          <el-submenu index="8">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>系统设置</span>
            </template>
            <el-menu-item index="8-1">系统设置</el-menu-item>
          </el-submenu>

        </el-menu>

    </el-col>
<!--    主体内容-->
    <el-col  :style="{'margin-left':wide}">
      <el-row style="padding-right: 20px;padding-left: 20px;border-bottom: 2px solid #F8F8F8;padding-top: 10px;padding-bottom: 10px"
              @mouseleave.native="itemMouseout">
        <el-col :span="5" :offset="1">
          <el-input class="search"
                    placeholder="请输入订单号/联系方式"
                    prefix-icon="el-icon-search"
                    @keyup.enter.native="searchHandler">
            <el-button slot="suffix" style="border: none;font-size: 12px;background:none;" plain @click="searchHandler">查询</el-button>
          </el-input>
        </el-col>

        <el-col :span="8" :offset="4" style="height: 100%">
          <el-button icon="el-icon-headset" style="border: none;font-size: 16px;background:none;" @click="contactWithUs">联系客服</el-button>
          <el-button icon="el-icon-message" style="border: none;font-size: 16px;background:none;" @click="openFeedBack">意见反馈</el-button>
          <div style="position: relative;display: inline-block;"
               @mouseover="itemMouseover">
            <el-button icon="el-icon-bangzhu" style="border: none;font-size: 16px;background:none;"
            >便捷操作
            </el-button>
            <el-row v-if="hoverStatus1" style="position: absolute;top: 100%;left: -150%;z-index: 999" class="hoverState"
                    type="flex"
                    justify="center"
                    align="middle"
            >
              <el-col :span="5" :offset="2" class="wtttf">
                <el-row>
                  <i class="el-icon-circle-plus" style="font-size: 24px"/>
                </el-row>
                <el-row style="font-size: 14px">
                  添加卡密
                </el-row>
              </el-col>

              <el-col :span="5" :offset="2" class="wtttf">
                <el-row>
                  <i class="el-icon-money" style="font-size: 24px"/>
                </el-row>
                <el-row style="font-size: 14px">
                  申请提现
                </el-row>
              </el-col>

              <el-col :span="5" :offset="2" class="wtttf">
                <el-row>
                  <i class="el-icon-bank-card" style="font-size: 24px"/>
                </el-row>
                <el-row style="font-size: 14px">
                  添加卡密
                </el-row>
              </el-col>
            </el-row>
          </div>
        </el-col>

        <el-col :span="6">
          <el-button icon="el-icon-bell" style="border: none;font-size: 24px;font-weight: bold;background:none;"
                    @click="myMessage"
          />
          <div style="position: relative;display: inline-block;cursor: pointer"@mouseover="itemMouseover2">
            <img src="/static/tou.png" alt="头像">
            <span style="margin-left: 5px">{{userName}}</span>
            <el-row v-if="hoverStatus2"
                    style="position: absolute;top: 100%;left: 0;width: 140px;flex-flow: column;z-index: 999"
                    class="hoverState"
                    type="flex"
                    justify="center"
            >
              <el-row class="wttttt" @click.native="editPwd">
                <i class="el-icon-key" style="font-size: 16px"/>
                修改密码
              </el-row>
              <el-row class="wttttt" style="margin-top: 10px" @click.native="logOut">
                <i class="el-icon-switch-button" style="font-size: 16px"/>
                退出登陆
              </el-row>
            </el-row>
          </div>
        </el-col>
      </el-row>

      <el-row>
        <router-view class="view"></router-view>
      </el-row>
    </el-col>

    <el-dialog :visible.sync="feedBackForm.feedBackFormStatus" width="35%" v-if="feedBackForm.feedBackFormStatus">
      <div slot="title" class="dialogTitle">
        意见反馈
      </div>
      <el-form :model="feedBackForm" :rules="rules" ref="feedBack" style="margin-top: 20px">
        <el-form-item style="height: 250px" prop="content">
          <el-input type="textarea"
                    style="height: 100px"
                    v-model="feedBackForm.content"
          placeholder="如果对星荧商城有任何建议和不满欢迎提出建议哦~

请写下宝贵的意见

如果是重要事情请联系客服QQ或公众号 QQ：747671555直接反馈">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="feedBackForm.feedBackFormStatus = false">取 消</el-button>
        <el-button type="primary" @click="submitFeedBack">提 交</el-button>
      </div>
    </el-dialog>

  </el-row>
</template>
<style>

  .personalCenter .el-textarea__inner{
    min-height: 250px!important;
  }
  .personalCenter .el-textarea{
    min-height: 250px!important;
  }
  .personalCenter .dialogTitle{
    float: left;
    color: #68728c;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: .5px;
  }
  .personalCenter .cebian{
    position: fixed;
    overflow: scroll;
    z-index: 999;
  }
  .personalCenter .cebian::-webkit-scrollbar{
    width: 0;
    height: 0;
    color: transparent;
  }
  html, body ,#app{
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }
  .personalCenter{
    height: 100%;
  }
  .personalCenter .el-col{
    height: 100%;
  }
  .personalCenter .el-col ul{
    height: 100%;
  }
  .personalCenter .mycolor1{
    color:#AEB4C4;
  }
  .personalCenter .mycolor2{
    color:#FF495B;
  }
  .personalCenter .el-submenu__title{
    font-weight: 700;
    font-size: 14px;
    height: 53px;
    line-height: 53px;
  }
  .personalCenter .el-menu-item{
    font-weight: 400;
    font-size: 14px;
  }
  /*#leftNav{*/
  /*  border-right:2px solid #F0F5FF;*/
  /*}*/
  .personalCenter .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: auto;
    min-height: 400px;
  }
  .personalCenter .el-menu-vertical-demo{
    border-right:2px solid #F0F5FF;
  }
  .personalCenter .search input{
    background-color: #F3F6FF;
    border-radius:20px 20px 20px 20px;
    height: 35px;
  }
  .personalCenter .hoverState {
    width: 290px;
    height: 105px;
    background: #fff;
    -webkit-box-shadow: 0 5px 9px 0 hsla(0, 0%, 77.3%, .4);
    box-shadow: 0 5px 9px 0 hsla(0, 0%, 77.3%, .4);
    border-radius: 10px;
  }
  .personalCenter .wtttf{
    color: #a2a9ba;
    cursor: pointer;
    display: flex;
    justify-content: center;
    flex-flow: column;
  }
  .personalCenter .wtttf:hover{
    color: #2a62ff;
  }
  .personalCenter .wttttt{
    color: #a2a9ba;
  }
  .personalCenter .wttttt:hover{
    color: #2a62ff;
  }
</style>
<script>
  import Auth from '@/utils/auth.js'
  export default {
    inject: ['reload'],
    data() {
      return {
        //用户的nickname
        userName: "",
        //反馈表内容
        feedBackForm:{
          content:null,
          feedBackFormStatus:false,
        },
        wide:null,
        //锁定对应的图标
        iconName:'el-icon-lock',
        //是否折叠
        collStatus:false,
        //
        hoverStatus1:false,
        //
        hoverStatus2:false,
        //表单验证
        rules:{
          content:[
            {required: true, message: '请输入相关内容', trigger: 'blur'},
          ]
        }
      };
    },
    mounted() {
      this.userName = this.$auth.getUser().username;
      this.getWidth();
      //默认跳至个人信息汇总
      this.goToInfo();
    },
    methods:{
      //返回首页
      gotoHome(){
        this.$router.push({
          name:'主页'
        });
      },
      //跳转至信息汇总
      goToInfo(){
        this.$router.push({
          name:'个人信息汇总'
        });
      },
      //退出登陆logOut
      logOut(){
        this.$http.post('/logout').then(res => {
          if (res.code === 11000) {
            this.reload();
            this.$router.push({
              name:'主页'
            });
          }
        });
      },
      //跳转至修改密码页面
      editPwd() {
        this.$router.push({
          name: '修改密码'
        });
      },
      //联系QQ客服
      contactWithUs(){
        location.href='tencent://message/?uin=747671555'
      },
      //提交反馈
      submitFeedBack(){
        this.$refs.feedBack.validate((valid) => {
          if (valid) {
            this.$http.post('/feedBack/addFeedBack', {feedbackContent: this.feedBackForm.content})
              .then(res => {
                if (res.code === 10000) {
                  this.$message.success("反馈成功");
                }else{
                  this.$message.success("反馈失败");
                }
                this.feedBackForm.feedBackFormStatus = false
              });
          }else{
            this.$message.error("请填写相关内容");
          }
        })

      },
      //打开意见反馈
      openFeedBack(){
        this.feedBackForm.feedBackFormStatus = true
      },
      //获取宽度
      getWidth(){
        this.wide = document.getElementById("leftNav").offsetWidth + "px"
      },
      //跳转至我的消息页面
      myMessage(url, indexPath){
        this.$router.push({
          name:'我的消息',
        })
      },
      itemMouseover(){
        this.hoverStatus1 = true
      },
      itemMouseover2(){
        this.hoverStatus2 = true
      },
      itemMouseout(){
        this.hoverStatus1 = false
        this.hoverStatus2 = false
      },
      //左侧边栏样式改变
      lockMenu(){
        if(this.iconName == 'el-icon-lock'){
          this.$refs.lockMenuButton.$el.classList.remove("mycolor2")
          this.$refs.lockMenuButton.$el.classList.add("mycolor1")
          this.iconName = 'el-icon-unlock'
        }else{
          this.$refs.lockMenuButton.$el.classList.remove("mycolor1")
          this.$refs.lockMenuButton.$el.classList.add("mycolor2")
          this.iconName = 'el-icon-lock'
        }
      },
      openMenu(){
        if(this.iconName == "el-icon-lock")
        this.$refs.wt.$el.classList.remove("el-col-1")
        this.$refs.wt.$el.classList.add("el-col-3")
        this.collStatus = false;
      },
      closeMenu(){
        if(this.iconName == "el-icon-unlock"){
          this.$refs.wt.$el.classList.remove("el-col-3")
          this.$refs.wt.$el.classList.add("el-col-1")
          this.collStatus = true;
        }
      },
      //搜索订单
      searchHandler(){

      }
    },
  }
</script>
