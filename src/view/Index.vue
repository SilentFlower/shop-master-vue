<template>
  <div>
    <homeNav id="header"></homeNav>
    <Carousel :style="{'margin-top':topHeight}"></Carousel>
    <right-menu></right-menu>
    <div style="height: 1000px"></div>
  </div>
</template>

<style>

</style>

<script>
  import homeNav from "../components/nav/homeNav";
  import rightMenu from "../components/menu/rightMenu";
  import Carousel from "../components/nav/Carousel"
  export default {
    data() {
      return {
        topHeight:null,
        dialogVisible: true
      }
    },
    mounted() {
      // 获取导航栏高度
      this.getHeight();
      window.addEventListener('resize', this.getHeight);
    },
    methods:{
      getHeight(){
        this.topHeight = document.getElementById("header").clientHeight + "px"
      }
    },
    components: {
      homeNav,
      rightMenu,
      Carousel,
    },
    destroyed() {
      window.removeEventListener('resize', this.getHeight)
    }
  }
</script>

