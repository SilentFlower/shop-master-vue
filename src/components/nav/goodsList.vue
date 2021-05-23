<!--商品列表-->
<template>
  <el-row class="goodList">
    <el-col :span="6" style="border: 2px solid #F9F9F9;height: 429px;cursor: pointer" @click.native="gotoGood">
      <el-row style="height: 216px">
        <div>图片</div>
      </el-row>
      <el-row style="height:47px">
        <div>标题</div>
        <div>描述</div>
      </el-row>
      <el-row style="float: bottom">
        <div>价格</div>
      </el-row>
    </el-col>

    <el-col :span="6" style="border: 2px solid #F9F9F9;height: 429px">
      <el-row style="height: 216px">
        <div>图片</div>
      </el-row>
      <el-row style="height:47px">
        <div>标题</div>
        <div>描述</div>
      </el-row>
      <el-row style="float: bottom">
        <div>价格</div>
      </el-row>
    </el-col>

    <el-col :span="6" style="border: 2px solid #F9F9F9;height: 429px">
      <el-row style="height: 216px">
        <div>图片</div>
      </el-row>
      <el-row style="height:47px">
        <div>标题</div>
        <div>描述</div>
      </el-row>
      <el-row style="float: bottom">
        <div>价格</div>
      </el-row>
    </el-col>

    <el-col :span="6" style="border: 2px solid #F9F9F9;height: 429px">
      <el-row style="height: 216px">
        <div>图片</div>
      </el-row>
      <el-row style="height:47px">
        <div>标题</div>
        <div>描述</div>
      </el-row>
      <el-row style="float: bottom">
        <div>价格</div>
      </el-row>
    </el-col>

    <el-col :span="6" style="border: 2px solid #F9F9F9;height: 429px">
      <el-row style="height: 216px">
        <div>图片</div>
      </el-row>
      <el-row style="height:47px">
        <div>标题</div>
        <div>描述</div>
      </el-row>
      <el-row style="float: bottom">
        <div>价格</div>
      </el-row>
    </el-col>

    <el-col :span="6" style="border: 2px solid #F9F9F9;height: 429px">
      <el-row style="height: 216px">
        <div>图片</div>
      </el-row>
      <el-row style="height:47px">
        <div>标题</div>
        <div>描述</div>
      </el-row>
      <el-row style="float: bottom">
        <div>价格</div>
      </el-row>
    </el-col>

    <el-col :span="6" style="border: 2px solid #F9F9F9;height: 429px">
      <el-row style="height: 216px">
        <div>图片</div>
      </el-row>
      <el-row style="height:47px">
        <div>标题</div>
        <div>描述</div>
      </el-row>
      <el-row style="float: bottom">
        <div>价格</div>
      </el-row>
    </el-col>

  </el-row>
</template>
<style>
  .goodList{
    overflow: hidden;
    border-radius: 10px;
    background-color: #FFFFFF;
  }
  .goodList .ww2{
    background-color: #FAFAFA;
    border-bottom: 2px solid #E4E4E4;
  }
  .goodList .ww1{
    float: left;
    margin-left: 25px;
    font-weight: bolder;
    font-size: 18px;
    line-height: 60px;
    color: #666;
  }
  .goodList .ww3{
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
        gotoGood() {
          this.$router.push({
            name:'商品'
          })
        },

      };
    },
    methods:{

    },

  }
</script>
