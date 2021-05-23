<!--提现页面-->
<template>
  <el-row class="withdraw">
    <el-row style="border-bottom: 2px solid #F4F7FE;padding-bottom: 20px">
      <el-row style="float: left">
        <span class="tit">申请提现</span>
        <el-button class="setting">提现设置</el-button>
      </el-row>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-alert
        title="请在9:00-21:00之间申请结算，其他时间可能不能及时到账"
        type="info"
        show-icon>
      </el-alert>
    </el-row>
    <el-row style="border-bottom: 2px solid #F4F7FE;padding-bottom: 40px;margin-top: 30px">
      <el-row style="float: left;width: 500px" type="flex">
        <el-col>
          <el-row>
            <i class="el-icon-money" style="font-size: 36px">
            </i>
            <span class="ww1">账户余额</span>
          </el-row>
          <el-row class="ww2">0.00</el-row>
        </el-col>
        <el-col>
          <el-row>
            <i class="el-icon-loading" style="font-size: 36px"></i>
            <span class="ww1">冻结余额</span>
          </el-row>
          <el-row class="ww2">0.00</el-row>
        </el-col>
      </el-row>
    </el-row>
    <el-row style="margin-top: 30px;padding-left: 55px">
      <el-row>
        <span style="float: left" class="ww3">申请提现（提现金额只能为整数）</span>
      </el-row>
      <el-row style="margin-top: 15px">
        <el-input v-model="withdraw" @input="changeInput" placeholder="输入提现金额(整数)" type="text" style="width: 400px;float: left">
        </el-input>
      </el-row>
      <el-row style="margin-top: 15px">
        <span style="float: left" class="ww4">不足100元扣费2元,超过部分每100元扣费2元,最低申请结算10元</span>
      </el-row>
      <el-row style="margin-top: 15px">
        <el-button :disabled="withdrawButton" ref="withdrawBt1" style="float: left" :class="{'bb2':withdrawButton,'bb1':!withdrawButton}" class="ww5">提现</el-button>
      </el-row>
    </el-row>
  </el-row>
</template>
<style>
  .withdraw {
    padding: 20px 50px 20px 50px;
  }
  .withdraw .tit {
    width: 95%;
    font-size: 21px;
    font-weight: 700;
    color: #68728c;
    padding: 29px 13px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-bottom: -2px;
  }
  .withdraw .setting{
    margin-left: 50px;
    font-weight: 700;
    font-size: 14px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    height: 34px;
    width: 100px;
    color: #fff;
    background: #386cfa;
    border: none;
    border-radius: 6px;
  }
  .withdraw .ww1{
    vertical-align: middle;
    display: inline-block;
    color: #a2a9ba;
    font-size: 15px;
    font-weight: 500;
    margin-left: 16px;
  }
  .withdraw .ww2{
    display: block;
    margin-top: 20px;
    margin-left: 50px;
    color: #68728c;
    font-size: 30px;
    font-weight: 700;
    margin-top: 14px;
    text-indent: 51px;
  }
  .withdraw .ww3{
    margin-left: 13px;
    font-weight: 700;
    color: #68728c;
    font-size: 14px;
  }
  .withdraw .ww4{
    font-size: 12px;
    font-weight: 500;
    color: #a2a9ba;
  }
  .withdraw .ww5{
    font-weight: 700;
    width: 167px;
    border-radius: 5px;
    height: 50px;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    cursor: pointer;
    font-weight: 700;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    transition: background .8s;
  }
  .withdraw .bb2{
    color: #fff;
    background: #b7c3cd;
    border-radius: 5px;
  }
  .withdraw .bb1{
    color: #fff;
    background: #386cfa;
    border-radius: 5px;
  }
</style>
<script>
  export default {
    data() {
      return {
        //提现金额
        withdraw:null,
        withdrawButton: true,
      }
    },
    mounted() {

    },
    methods:{
      //输入框变化时候
      changeInput() {
        let numReg = /^[1-9]\d*$/;
        let numRe = new RegExp(numReg)
        if (!numRe.test(this.withdraw)) {
          this.$message.error("请输入整数")
          this.withdrawButton = true
        }else{
          this.withdrawButton = false
        }
      }

    }

  }
</script>

