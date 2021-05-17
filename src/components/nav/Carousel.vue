<template>
  <el-carousel :interval="5000" height="553px"  arrow="always" style="background-color:#D6E1EE">
    <el-carousel-item style="background-color:#D6E1EE">
      <div v-on:mousemove="touchmove" style="height: 100%" ref="mouse">

        <el-row type="block" class="my-row">
          <el-col :span="12" style="margin-left: 120px;margin-top: 150px">
            <el-row>
              <div>
            <span class="h3_text">
            60万+卖家买家的选择
            </span>
                <span class="h3_text">
            值得信赖
            </span>
              </div>

              <div>
             <span class="h2_text">
            星荧商城提供优质虚拟物品一站式自动交易服务，平台系统功能齐全、便捷好用
            </span>
                <span class="h2_text">
              是您虚拟商品交易需求的最佳解决方案
             </span>
              </div>

              <div class="jiaru_btn" align="left" @click="startRegister">
                <span>注册成为会员</span>
              </div>
            </el-row>
          </el-col>

          <el-col :span="6"  class="pic-hover" style="justify-content: center;align-items: center;display: flex">
            <img src="/static/logo.png" width="180px" height="150px" alt="测试" :style="{transform:wtf}"   style="transform-style: preserve-3d;-webkit-backface-visibility: hidden;
backface-visibility: hidden;transition: 0.4s;transition-timing-function:cubic-bezier(0.31, -0.105, 0.43, 1.59);">
          </el-col>
        </el-row>

      </div>

    </el-carousel-item>
    <el-carousel-item style="background-color:#D6E1EE">
      <div v-on:mousemove="touchmove" style="height: 100%" ref="mouse">

        <el-row type="block" class="my-row">
          <el-col :span="12" style="margin-left: 120px;margin-top: 150px">
            <el-row>
              <div>
            <span class="h3_text">
            使用星荧商城
            </span>
                <span class="h3_text">
            体验更高效、更便捷购物体验
            </span>
              </div>

              <div>
             <span class="h2_text">
            率先使用人工智能
            </span>
                <span class="h2_text">
              为全球60万+用户提供便捷的虚拟商品交易解决方案
             </span>
              </div>

              <div class="jiaru_btn" align="left" @click="startRegister">
                <span>注册成为会员</span>
              </div>
            </el-row>
          </el-col>

          <el-col :span="6"  class="pic-hover" style="justify-content: center;align-items: center;display: flex">
            <img src="/static/logo.png" width="180px" height="150px" alt="测试" :style="{transform:wtf}"   style="transform-style: preserve-3d;-webkit-backface-visibility: hidden;
backface-visibility: hidden;transition: 0.4s;transition-timing-function:cubic-bezier(0.31, -0.105, 0.43, 1.59);">
          </el-col>
        </el-row>

      </div>

    </el-carousel-item>
  </el-carousel>
</template>

<style>
  .my-image {
    width: 100%;
    height: inherit;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .h3_text {
    text-align: left;
    display: block;
    color: #545454;
    font-weight: 700;
    font-size: 48px;
  }

  .h2_text {
    text-align: left;
    display: block;
    margin-top: 15px;
    color: #999;
    font-size: 16px;
    line-height: 27px;
    font-weight: 400;
  }

  .jiaru_btn {
    margin-top: 52px;
    width: 267px;
    display: block;
    text-align: center;
    background: -webkit-gradient(linear,left bottom,left top,from(#2a62ff),to(#4e7dff));
    background: linear-gradient(0deg,#2a62ff,#4e7dff);
    -webkit-box-shadow: 0 5px 6px 0 rgba(73,105,230,.22);
    box-shadow: 0 5px 6px 0 rgba(73,105,230,.22);
    border-radius: 6px;
    line-height: 63px;
    cursor: pointer;
  }
  .jiaru_btn span {
    color: #fff;
    font-weight: 500;
    font-size: 18px;
  }
  .my-row, .my-row .el-col{
    height: 100%;
  }


</style>
<script>
  export default {
    data() {
      return {
        x:0,
        y:0,
      };
    },
    methods:{
      //鼠标触发
      touchmove(e) {
        this.x = 100 - e.clientX *0.1
        this.y = 80 - e.clientY *0.2
      },
      //触发注册按钮
      startRegister(){
        this.$emit("register");
      }
    },
    computed: {
      wtf() {
        return 'translate3d('+this.x+'px, '+this.y+'px, 0px)';
      }
    },


  }
</script>
