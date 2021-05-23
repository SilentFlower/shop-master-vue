<!--官网-->
<template>
  <div style="background-color: #EDEDED;overflow-x:hidden">
    <homeNav id="header" ref="homeNav" v-resize="getHeight"></homeNav>
    <div :style="{'margin-top':topHeight}"></div>
    <el-row>
      <router-view class="view" @register="register"></router-view>
    </el-row>
    <right-menu></right-menu>
    <bottomNav id="bot" ref="bot"></bottomNav>
  </div>
</template>

<script>
  import homeNav from "../components/nav/homeNav";
  import rightMenu from "../components/menu/rightMenu";
  import bottomNav from "../components/nav/bottomNav"
  export default {
    data() {
      return {
        topHeight:null,
        dialogVisible: true,
        buttonStatus: false,
        heightScroll:null,
      }
    },
    mounted() {
      // 获取导航栏高度
      this.getHeight();
    },
    methods:{
      getHeight(){
        this.topHeight = document.getElementById("header").clientHeight + "px"
      },
      register(){
        this.$refs.homeNav.openRegister();
      }
    },
    components: {
      homeNav,
      rightMenu,
      bottomNav,
    },
  }
</script>
<style>
  body{

  }
</style>

