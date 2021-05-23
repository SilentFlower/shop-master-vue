<!--首页用来展示商品-->
<template>
  <el-row class="master">
    <Carousel2></Carousel2>
<!--    热门商品 -->
    <hotGood style="margin-top: 20px"></hotGood>
<!--    商品分类1 -->
    <classGood1 style="margin-top: 20px"></classGood1>
    <!--    商品分类2 -->
    <classGood2 style="margin-top: 20px"></classGood2>
    <!--    商品分类3 -->
    <classGood3 style="margin-top: 20px"></classGood3>
  </el-row>
</template>
<style>
  .master{
    margin: 0 auto;
    width: 1524px;
    padding: 30px 150px 30px 150px;
  }
</style>

<script>
  import Carousel2 from "../../components/nav/Carousel2"
  import hotGood from "../../components/nav/hotGood"
  import classGood1 from "../../components/nav/classGood1";
  import classGood2 from "../../components/nav/classGood2";
  import classGood3 from "../../components/nav/classGood3";
  export default {
    data() {
      return {

      }
    },
    mounted() {

    },
    methods:{
      register(){
        this.$emit("register")
      },
    },
    components: {
      Carousel2,
      hotGood,
      classGood1,
      classGood2,
      classGood3,
    },
  }
</script>
