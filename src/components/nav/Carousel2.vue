<template>
  <el-carousel indicator-position="outside" height="553px">
    <el-carousel-item v-for="item in pic" :key="item">
      <img :src="item" alt="" height="553" width="100%">
    </el-carousel-item>
  </el-carousel>
</template>
<style>
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
       pic:[
         "https://resource.smartisan.com/resource/1f0f2209a141202179277019dd1eeec5.jpg?x-oss-process=image/resize,w_1525/format,webp/quality,Q_95",
         "https://resource.smartisan.com/resource/1c6c6b970fc8f773a6e37c25dd7d5789.png?x-oss-process=image/resize,w_1525/format,webp/quality,Q_95",
         "https://resource.smartisan.com/resource/fa808c10081b9fd3040bb7bfd12b891c.jpg?x-oss-process=image/resize,w_1525/format,webp/quality,Q_95"
       ]
      };
    },
    methods: {}
  }
</script>
