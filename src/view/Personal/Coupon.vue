<!-- 生成优惠券 -->
<template>
  <el-row class="Coupon">
    <el-row style="border-bottom: 2px solid #F4F7FE;padding-bottom: 20px">
      <el-row style="float: left">
        <span class="tit">生成优惠券</span>
      </el-row>
    </el-row>
    <el-row style="margin-top: 20px;padding-left: 150px;" type="flex" justify="flex-start">
      <el-form label-position="left" label-width="140px" :model="Coupon">
        <el-form-item label="优惠券类型">
          <el-button>店铺优惠券</el-button>
          <el-button>商品优惠券</el-button>
        </el-form-item>
        <el-form-item label="商品类别">
          <el-select v-model="Coupon.name">
            <el-option value="test" label="测试类"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品列表">
          <el-input placeholder="请填写店铺网站，将出现在店铺页面" v-model="Coupon.name"></el-input>
        </el-form-item>
        <el-form-item label="价值类型">
          <el-button>折扣优惠券</el-button>
          <el-button>满减优惠券</el-button>
        </el-form-item>
        <el-form-item label="券价值">
          <el-input placeholder="请填写店铺网站，将出现在店铺页面" v-model="Coupon.name"></el-input>
        </el-form-item>
        <el-form-item label="使用次数">
          <el-input placeholder="请填写店铺网站，将出现在店铺页面" v-model="Coupon.name"></el-input>
        </el-form-item>
        <el-form-item label="准用金额">
          <el-input placeholder="请填写店铺网站，将出现在店铺页面" v-model="Coupon.name"></el-input>
        </el-form-item>
        <el-form-item label="有效期">
          <el-input placeholder="请填写店铺网站，将出现在店铺页面" v-model="Coupon.name"></el-input>
        </el-form-item>
        <el-form-item label="生成张数">
          <el-input placeholder="请填写店铺网站，将出现在店铺页面" v-model="Coupon.name"></el-input>
        </el-form-item>
      </el-form>
    </el-row>
    <el-button type="success">保存</el-button>



  </el-row>
</template>
<style>
  .Coupon {
    padding: 20px 50px 20px 50px;
  }
  .Coupon .tit {
    width: 95%;
    font-size: 21px;
    font-weight: 700;
    color: #68728c;
    padding: 29px 13px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-bottom: -2px;
  }
  .Coupon .setting{
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
  .Coupon .ww1{
    vertical-align: middle;
    display: inline-block;
    color: #a2a9ba;
    font-size: 15px;
    font-weight: 500;
    margin-left: 16px;
  }
  .Coupon .ww2{
    display: block;
    margin-top: 20px;
    margin-left: 50px;
    color: #68728c;
    font-size: 30px;
    font-weight: 700;
    margin-top: 14px;
    text-indent: 51px;
  }
  .Coupon .ww3{
    margin-left: 13px;
    font-weight: 700;
    color: #68728c;
    font-size: 14px;
  }
  .Coupon .ww4{
    font-size: 12px;
    font-weight: 500;
    color: #a2a9ba;
  }
  .Coupon .ww5{
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
  .Coupon .bb2{
    color: #fff;
    background: #b7c3cd;
    border-radius: 5px;
  }
  .Coupon .bb1{
    color: #fff;
    background: #386cfa;
    border-radius: 5px;
  }
</style>
<script>
  export default {
    data() {
      return {
        //优惠券表单
        Coupon:{
          name:null
        },

      }
    },
    mounted() {

    },
    methods:{

    }

  }
</script>
