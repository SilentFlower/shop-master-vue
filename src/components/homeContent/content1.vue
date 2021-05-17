<template>
  <div class="content1">
    <el-row class="mytitle">解决安全性欠缺且用户体验差的问题</el-row>
    <el-row class="mytitle2">入驻星荧，享受卡密自动交易，提高你的睡后收入</el-row>
    <el-row style="margin-top: 60px">
      <el-col :span="12">
        <el-row class="mytitle3">企业级专属发卡平台</el-row>
        <el-row class="myspan1">成立5年已为上万用户提供优质、稳定、便捷的虚拟商品卡密</el-row>
        <el-row style="margin-top: 20px">
          <el-col :offset="6" :span="1">
            <img src="static/content1-1.png">
          </el-col>
          <el-col :span="12" style="margin-top: 20px">
            <el-row class="myspan2">
              极速入驻，低门槛
            </el-row>
            <el-row class="myspan2">
              超简入驻流程，满100元自动提现，低门槛
            </el-row>
          </el-col>
        </el-row>

        <el-row style="margin-top: 20px">
          <el-col :offset="6" :span="1">
            <img src="static/content1-2.png">
          </el-col>
          <el-col :span="12" style="margin-top: 20px">
            <el-row class="myspan2">
              便捷销售，优质体验
            </el-row>
            <el-row class="myspan2">
              支持IOS/安卓APP，实时订单APP消息推送
            </el-row>
          </el-col>
        </el-row>

        <el-row style="margin-top: 20px">
          <el-col :offset="6" :span="1">
            <img src="static/content1-3.png">
          </el-col>
          <el-col :span="12" style="margin-top: 20px">
            <el-row class="myspan2">
              真'智能'发卡，广受好评
            </el-row>
            <el-row class="myspan2">
              AI识别拦截DDOS、CC攻击，全网最长运营年限，无差评
            </el-row>
          </el-col>
        </el-row>
      </el-col>

      <el-col :span="12">
        <el-image :span="12" src="static/content1-4.png"></el-image>
      </el-col>
    </el-row>
  </div>
</template>
<style>
  .content1{
    margin-top: 20px;
    background-color: #FBFCFF;
    height: 600px;
    padding-top: 100px;
    padding-left: 100px;
    padding-right: 100px;
  }
  .content1 .mytitle{
    color: #545454;
    font-weight: 700;
    font-size: 30px;
  }
  .content1 .mytitle2{
    margin-top: 8px;
    color: #999;
    font-weight: 400;
    font-size: 16px;
  }
  .content1 .mytitle3{
    font-weight: 700;
    font-size: 20px;
    color: #545454;
  }
  .content1 .myspan1{
    color: #545454;
    font-size: 14px;
    font-weight: 400;
    line-height: 25px;
    margin-top: 9px;
  }
  .content1 .myspan2{
    margin-left: 40px;
    color: #545454;
    font-size: 14px;
    font-weight: 400;
  }
</style>
