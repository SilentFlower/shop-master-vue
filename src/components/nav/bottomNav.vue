<template>
  <div class="bottomNav">
    <div style="padding-top: 30px">
      <el-row class="contactDetails" type="flex">

        <el-col :span="6">
          <p class="contact">企业联系方式</p>
          <div style="margin-top: 20px">
            <a href="javascript:void(0)" class="qq">
                  <img src="static/qq.png" style="width: 23px;height: 28px">  747671555
            </a>
          </div>
          <p class="other" style="margin-top: 20px">服务时间00:00 - 24:00</p>
          <p class="other" style="margin-top: 20px">企业邮箱:huajiwuyan@gmail.com</p>
        </el-col>

        <el-col style="display: flex" :span="6">
          <el-col>
            <el-row style="margin-top: 20px">
              <img src="static/qrCode1.png" height="80px" width="80px">
            </el-row>
            <el-row>
              扫码下载APP
            </el-row>
          </el-col>
          <el-col>
            <el-row style="margin-top: 20px">
              <img src="static/qrCode1.png" height="80px" width="80px">
            </el-row>
            <el-row>
              扫码关注公众号
            </el-row>
          </el-col>
        </el-col>

        <el-col style="display: flex" :span="8" :offset="2">
          <el-col>
            <el-row class="mybuttonTitle">
              卖家服务
            </el-row>
            <el-row class="mybutton">
              订单查询
            </el-row>
            <el-row class="mybutton">
              订单投诉
            </el-row>
            <el-row class="mybutton">
              投诉查询
            </el-row>
            <el-row class="mybutton">
              帮助中心
            </el-row>
          </el-col>

          <el-col>
            <el-row class="mybuttonTitle">
              商户服务
            </el-row>
            <el-row class="mybutton">
              商户登陆
            </el-row>
            <el-row class="mybutton">
              注册商户
            </el-row>
            <el-row class="mybutton">
              个人中心
            </el-row>
            <el-row class="mybutton">
              APP下载
            </el-row>
          </el-col>

          <el-col>
            <el-row class="mybuttonTitle">
              法律条款
            </el-row>
            <el-row class="mybutton">
              隐私政策
            </el-row>
            <el-row class="mybutton">
              商品发布条例
            </el-row>
            <el-row class="mybutton">
              平台服务协议
            </el-row>
            <el-row class="mybutton">
              风控公示
            </el-row>
          </el-col>
          <el-col>
            <el-row class="mybuttonTitle">
              关于星荧
            </el-row>
            <el-row class="mybutton">
              联系我们
            </el-row>
            <el-row class="mybutton">
              产品服务
            </el-row>
            <el-row class="mybutton">
              禁售商品
            </el-row>
          </el-col>
        </el-col>
      </el-row>

      <el-row class="CopyrightInformation" type="flex" style="padding-bottom: 60px;margin-top: 20px;padding-right: 20px;padding-right: 20px">
        <el-col :span="4" :offset="1">
          <img src="static/bottom-1.png">
        </el-col>

        <el-col :span="20" style="padding-right: 160px">
          <el-row>
            <span class="mspan">
              手机版请访问：xingying.747698.xyz    版权所有： © 2011-2021 All rights reserved 星荧科技有限公司    企业邮箱：747671555@qq.com
            </span>
          </el-row>

          <el-row style="margin-top: 28px">
            <span class="mspan2">
              ICP备案证书号：xICP备xxxxxxx号-x 　百度实名认证主体识别码：BDV-xxxxxxx 　网络文化经营许可证：x网文[2011]xxxx-2021号 产品名称:星荧商城
            </span>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<style>
  .bottomNav{
    background-color: #37405E;
    color: #F4FBFF;
  }
  .contact{
    font-size: 16px;
    font-weight: 700;
  }
  .qq{
    font-size: 20px;
    font-weight: 700;
    text-decoration:none;
    color:#ffffff;
  }
  .other{
    margin-top: 14px;
    font-size: 14px;
    font-weight: 400;
    opacity: .5;
  }
  .bottomNav .mybuttonTitle{
    display: block;
    margin-bottom: 26px;
    color: #ffffff;
    font-size: 14px;
    cursor: pointer;
    -webkit-transition: color .5s;
    transition: color .5s;
    font-weight: 700;
  }

  .bottomNav .mybutton{
    margin-top: 15px;
    display: block;
    margin-bottom: 26px;
    color: #FFFFFF;
    font-size: 14px;
    cursor: pointer;
    -webkit-transition: color .5s;
    transition: color .5s;
  }
  .bottomNav .mybuttonTitle:hover {
    color: #4e7dff;
  }
  .bottomNav .mybutton:hover {
    color: #4e7dff;
  }
  .bottomNav .CopyrightInformation .mspan{
    text-align: center;
    font-size: 12px;
    font-weight: 400;
    color: #ffffff;
    display: block;
  }
  .bottomNav .CopyrightInformation .mspan2{
    text-align: center;
    font-size: 12px;
    font-weight: 400;
    color: #b8c1d9;
    display: block;
  }
</style>
