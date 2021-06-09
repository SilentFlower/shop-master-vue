<!--官网-->
<template>
  <div style="background-color: #EDEDED;overflow-x:hidden">
    <homeNav id="header" ref="homeNav" v-resize="getHeight"></homeNav>
    <div :style="{'margin-top':topHeight}"></div>
    <el-row>
      <transition name="fade-transform" mode="out-in">
        <router-view class="view" @register="register"></router-view>
      </transition>
    </el-row>
    <right-menu></right-menu>
    <bottomNav id="bot" ref="bot"></bottomNav>
  </div>
</template>
<style scoped>
  /*
  enter-active 定义进入过渡的结束状态
  leave-active 定义离开过渡的结束状态
   */
  .fade-transform-leave-active,
  .fade-transform-enter-active {
    transition: all 0.5s;
  }

  /*
  enter定义进入过渡的开始状态
   */
  .fade-transform-enter {
    opacity: 0;
    transform: translateX(-30px);
  }
  /*
  leave-to离场动画结束后的状态
   */
  .fade-transform-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
</style>

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
