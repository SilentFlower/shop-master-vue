<!--主页-->
<template>
  <el-row>
    <Carousel @register="register"></Carousel>
    <Announcement></Announcement>
    <content1></content1>
    <content2></content2>
    <content3></content3>
  </el-row>
</template>
<script>
  import Carousel from "../../components/nav/Carousel"
  import Announcement from "../../components/nav/Announcement"
  import content3 from "../../components/homeContent/content3"
  import content2 from "../../components/homeContent/content2"
  import content1 from "../../components/homeContent/content1"
  export default {
    data() {
      return {

      }
    },
    methods:{
      register(){
        this.$emit("register")
      },
    },
    components: {
      Carousel,
      Announcement,
      content3,
      content2,
      content1
    },
  }
</script>
