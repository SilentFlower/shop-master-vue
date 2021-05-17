<template>
  <el-row style="position: fixed;right: 0px;top: 25%;z-index: 888">
    <el-button v-model="isCollapse" :icon="iconName" @click="iconChange"></el-button>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo my-el-menu" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">导航一</span>
        </template>
        <el-menu-item-group>
          <span slot="title">个人中心</span>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <span slot="title">选项4</span>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-shopping-cart-full"></i>
        <span slot="title">购物车</span>
      </el-menu-item>
      <el-menu-item index="4" @click="toTop">
        <i class="el-icon-top"></i>
        <span slot="title">返回顶部</span>
      </el-menu-item>
    </el-menu>
  </el-row>

</template>
<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .my-el-menu {
    border: solid 1px #e6e6e6;
  }


</style>

<script>
  export default {
    data() {
      return {
        isCollapse: true,
        iconName: 'el-icon-s-fold',
      };
    },
    methods: {
      //返回顶部
      toTop(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      },
      iconChange() {
        console.log("111");
        this.isCollapse = !this.isCollapse;
        if (this.isCollapse) {
          this.iconName = 'el-icon-s-fold'
        }else{
          this.iconName = 'el-icon-s-unfold'
        }
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
