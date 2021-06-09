<!--商品的产品信息一-->
<template>
  <el-row class="goodInfo">
    <el-row class="ww2" type="flex" align="middle">
      <span class="ww1 el-icon-s-shop">产品信息</span>
    </el-row>
    <el-row>
      <el-row  style="height: 858px;">
        <div style="padding-top: 20px" class="info">
          {{info}}
        </div>
      </el-row>
    </el-row>
  </el-row>
</template>
<style>
  .goodInfo .info{
    font-size: 24px;
    font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
  }
  .goodInfo{
    overflow: hidden;
    border-radius: 10px;
    background-color: #FFFFFF;
  }
  .goodInfo .ww2{
    background-color: #FAFAFA;
    border-bottom: 2px solid #E4E4E4;
  }
  .goodInfo .ww1{
    float: left;
    margin-left: 25px;
    font-weight: bolder;
    font-size: 18px;
    line-height: 60px;
    color: #666;
  }
  .goodInfo .ww3{
    margin-left: 20px;
    cursor: pointer;
    font-size: 14px;
    color: #666;
  }
</style>
<script>
  export default {
    data() {
      return {

      };
    },
    methods:{

    },
    props:{
      info:String,
    }

  }
</script>
