<!--个人中心页面-->
<template xmlns:el-col="http://www.w3.org/1999/html">
  <el-row class="personalCenter">
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
            <img src="/static/logo.png" width="80px" height="60px" alt="测试" style="margin-left: 50px"/>
            <el-button ref="lockMenuButton" style="border: none;font-size: 18px;" :icon="iconName" plain @click="lockMenu"></el-button>
          </div>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-home"></i>
              <span>我的账户</span>
            </template>
            <el-menu-item index="1-1">信息汇总</el-menu-item>
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
    <el-col :span="21" :style="{'margin-left':wide}">
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
          <el-button icon="el-icon-headset" style="border: none;font-size: 16px;background:none;">联系客服</el-button>
          <el-button icon="el-icon-message" style="border: none;font-size: 16px;background:none;">意见反馈</el-button>
          <div style="position: relative;display: inline-block;"
               @mouseover="itemMouseover">
            <el-button icon="el-icon-bangzhu" style="border: none;font-size: 16px;background:none;"
            >便捷操作
            </el-button>
            <el-row v-if="hoverStatus1" style="position: absolute;top: 100%;left: -150%;z-index: 999" class="hoverState"
                    type="flex"
                    justify="center"
                    align="center"
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
            <span style="margin-left: 5px">huajiwuyan98</span>
            <el-row v-if="hoverStatus2"
                    style="position: absolute;top: 100%;left: 0;width: 140px;flex-flow: column;z-index: 999"
                    class="hoverState"
                    type="flex"
                    justify="center"
            >
              <el-row class="wttttt">
                <i class="el-icon-key" style="font-size: 16px"/>
                修改密码
              </el-row>
              <el-row class="wttttt" style="margin-top: 10px">
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
  </el-row>
</template>
<style>
  .personalCenter .cebian{
    position: fixed;
    overflow: scroll;
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
  #leftNav{
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
  export default {
    data() {
      return {
        observer: null,
        wide:null,
        //锁定对应的图标
        iconName:'el-icon-lock',
        //是否折叠
        collStatus:false,
        //
        hoverStatus1:false,
        //
        hoverStatus2:false
      };
    },
    mounted() {
      this.getWidth();
    },
    methods:{
      //获取宽度
      getWidth(){
        this.wide = document.getElementById("leftNav").offsetWidth + "px"
      },
      //跳转至我的消息页面
      myMessage(){
        this.$router.push('/myMessage')

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
