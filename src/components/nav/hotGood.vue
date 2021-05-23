<!--热门商品-->
<template>
  <el-row class="hotGood">
    <el-row class="ww2" type="flex" align="middle">
      <span class="ww1 el-icon-thumb">热门商品</span>
      <div style="margin-left: 20px">
        <el-button type="primary" icon="el-icon-caret-left" size="mini" :disabled="!leftStatus" @click="leftClick" circle></el-button>
        <el-button type="primary" icon="el-icon-caret-right" size="mini" :disabled="!rightStatus" @click="rightClick" circle></el-button>
      </div>
    </el-row>
    <el-row style="overflow: hidden;">
      <el-row  type="flex" justify="flex-start" style="height: 429px;
               transform: translate3d(0px,0px,0px);
               transition: 0.4s;transition-timing-function:cubic-bezier(0.31, -0.105, 0.43, 1.59);"
               ref="all"
               :style="{transform:changePosition}"
               class="ww3">
        <el-col style="border: 2px solid #F9F9F9;">
          <el-row class="ww3">
            <el-row style="height: 216px">
              <div>图片</div>
            </el-row>
            <el-row style="height:47px">
              <div>标题</div>
              <div>描述</div>
            </el-row>
            <el-row style="float: bottom">
              <div>价格</div>
            </el-row>
          </el-row>
        </el-col>

        <el-col style="border: 2px solid #F9F9F9;">
          <el-row class="ww3">
            <el-row style="height: 216px">
              <div>图片</div>
            </el-row>
            <el-row style="height:47px">
              <div>标题</div>
              <div>描述</div>
            </el-row>
            <el-row style="float: bottom">
              <div>价格</div>
            </el-row>
          </el-row>
        </el-col>

        <el-col style="border: 2px solid #F9F9F9;">
          <el-row class="ww3">
            <el-row style="height: 216px">
              <div>图片</div>
            </el-row>
            <el-row style="height:47px">
              <div>标题</div>
              <div>描述</div>
            </el-row>
            <el-row style="float: bottom">
              <div>价格</div>
            </el-row>
          </el-row>
        </el-col>

        <el-col style="border: 2px solid #F9F9F9;">
          <el-row class="ww3">
            <el-row style="height: 216px">
              <div>图片</div>
            </el-row>
            <el-row style="height:47px">
              <div>标题</div>
              <div>描述</div>
            </el-row>
            <el-row style="float: bottom">
              <div>价格</div>
            </el-row>
          </el-row>
        </el-col>

        <el-col style="border: 2px solid #F9F9F9;">
          <el-row class="ww3">
            <el-row style="height: 216px">
              <div>图片</div>
            </el-row>
            <el-row style="height:47px">
              <div>标题</div>
              <div>描述</div>
            </el-row>
            <el-row style="float: bottom">
              <div>价格</div>
            </el-row>
          </el-row>
        </el-col>


      </el-row>
    </el-row>
  </el-row>
</template>
<style>
  .hotGood{
    overflow: hidden;
    border-radius: 10px;
    background-color: #FFFFFF;
  }
  .hotGood .ww2{
    background-color: #FAFAFA;
    border-bottom: 2px solid #E4E4E4;
  }
  .hotGood .ww1{
    float: left;
    margin-left: 25px;
    font-weight: bolder;
    font-size: 18px;
    line-height: 60px;
    color: #666;
  }
  .hotGood .ww3 {
    width: 306px;
    height: 100%;
  }
</style>
<script>
  export default {
    data() {
      return {
        x:0,
        clickCount: 0,
        between:306,
        leftStatus:false,
        rightStatus:true,
      };
    },
    methods:{
      //左键触发
      leftClick(){
        this.clickCount--
        this.x = this.x - this.between
      },
      //右键触发
      rightClick(){
        this.clickCount++
        this.x = this.x + this.between
      }
    },
    watch:{
      "clickCount"(val,oldValue){
        if (val == 0) {
          this.leftStatus = false;
        }else{
          this.leftStatus = true;
        }
        if (val + 4 >= this.$refs.all.$children.length) {
          this.rightStatus = false;
        }else{
          this.rightStatus = true;
        }
      }
    },
    computed: {
      changePosition(){
        return 'translate3d(-'+this.x+'px, 0px, 0px)';
      }
    },

  }
</script>

