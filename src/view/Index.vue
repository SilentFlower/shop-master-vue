<!--官网-->
<template>
  <div style="background-color: #F5F5F9;">
    <homeNav id="header" ref="homeNav" v-resize="getHeight"></homeNav>
    <Carousel :style="{'margin-top':topHeight}" @register="register"></Carousel>
    <Announcement></Announcement>
    <content1></content1>
    <content2></content2>
    <content3></content3>
    <right-menu></right-menu>
    <bottomNav></bottomNav>
  </div>
</template>

<script>
  import homeNav from "../components/nav/homeNav";
  import rightMenu from "../components/menu/rightMenu";
  import Carousel from "../components/nav/Carousel"
  import Announcement from "../components/nav/Announcement"
  import bottomNav from "../components/nav/bottomNav"
  import content3 from "../components/homeContent/content3"
  import content2 from "../components/homeContent/content2"
  import content1 from "../components/homeContent/content1"
  export default {
    data() {
      return {
        topHeight:null,
        dialogVisible: true,
        buttonStatus: false,
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
      },
    },
    components: {
      homeNav,
      rightMenu,
      Carousel,
      Announcement,
      bottomNav,
      content3,
      content2,
      content1
    },
  }
</script>
<style>
  body{
    min-width: 1400px;
  }
</style>

