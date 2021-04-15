<template>
  <el-carousel :interval="5000" height="355.2px"  arrow="always" style="background-color:#D6E1EE ">
    <el-carousel-item v-for="item in imgList" :key="item">
      <p>测试</p>
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

</style>
<script>
  export default {
    data() {
      return {
        //去服务器查询图片地址
        imgList:[
          '',
          ''
        ]

      }
    }

  }
</script>
