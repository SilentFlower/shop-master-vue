<!--商品类别一-->
<template>
  <el-row class="classGood1">
    <el-row class="ww2" type="flex" align="middle">
      <span class="ww1 el-icon-s-shop">商品类一</span>
      <span class="ww3 el-icon-more">更多推荐</span>
    </el-row>
    <el-row>
      <el-row  style="height: 858px;">
        <el-row style="height: 429px">
          <el-col :span="12" style="border: 2px solid #F9F9F9;height: 100%">
            <div>类别图片</div>
          </el-col>

          <el-col :span="6" style="border: 2px solid #F9F9F9;height: 100%">
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

          <el-col :span="6" style="border: 2px solid #F9F9F9;height: 100%">
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
        <el-row style="height: 429px">
          <el-col :span="6" style="border: 2px solid #F9F9F9;height: 100%">
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
          <el-col :span="6" style="border: 2px solid #F9F9F9;height: 100%">
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
          <el-col :span="6" style="border: 2px solid #F9F9F9;height: 100%">
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
          <el-col :span="6" style="border: 2px solid #F9F9F9;height: 100%">
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

      </el-row>
    </el-row>
  </el-row>
</template>
<style>
  .classGood1{
    overflow: hidden;
    border-radius: 10px;
    background-color: #FFFFFF;
  }
  .classGood1 .ww2{
    background-color: #FAFAFA;
    border-bottom: 2px solid #E4E4E4;
  }
  .classGood1 .ww1{
    float: left;
    margin-left: 25px;
    font-weight: bolder;
    font-size: 18px;
    line-height: 60px;
    color: #666;
  }
  .classGood1 .ww3{
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

  }
</script>
