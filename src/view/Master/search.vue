<!--搜索商品用的-->
<template>
  <el-row class="search">
    <el-row style="text-align: left;margin-left: 20px">
      <span class="el-icon-d-caret" style="color: #5683ea;font-size: 12px;">综合排序</span>
      <span class="cc1 el-icon-caret-top">价格低到高</span>
      <span class="cc1 el-icon-caret-bottom">价格高到低</span>
    </el-row>
    <goodsList style="margin-top: 20px"></goodsList>
  </el-row>
</template>
<style>
  .search{
    margin: 0 auto;
    width: 1524px;
    padding: 30px 150px 30px 150px;
  }
  .search .cc1{
    font-size: 12px;
    cursor: pointer;
    color: #999;
  }
  .search .cc1:hover{
    color: #5079d9;
    cursor: pointer;
    -webkit-transition: all .15s ease-out;
    transition: all .15s ease-out;
  }
</style>

<script>
  import goodsList from "../../components/nav/goodsList";
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
      goodsList,
    },
  }
</script>
