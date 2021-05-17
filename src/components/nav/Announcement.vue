<template>
  <div class="paneDiv" style="margin-top: 10px;display: flex;justify-content: center;position: relative">
    <el-button type="success" icon="el-icon-caret-left" class="leftButton" :disabled="!leftStatus" @click="leftClick" circle></el-button>
    <el-button type="success" icon="el-icon-caret-right" class="rightButton" :disabled="!rightStatus" @click="rightClick" circle></el-button>
    <el-tabs type="card" class="myTabs">
      <el-tab-pane  class="myPane" style="overflow: hidden;width: 1400px;">
        <span slot="label"><i class="el-icon-date"></i> 系统公告</span>
        <el-row type="flex" justify="flex-start"
                ref="all"
                style="margin-left: 5px;
                transform: translate3d(0px,0px,0px);
                transition: 0.4s;transition-timing-function:cubic-bezier(0.31, -0.105, 0.43, 1.59);"
                :style="{transform:changePosition}">
          <el-col>
            <el-card shadow="always">
              <span>更新公告标题</span>
              <span>更新公告内容</span>
            </el-card>
          </el-col>

          <el-col>
            <el-card shadow="always">
              <span>更新公告标题</span>
              <span>更新公告内容</span>
            </el-card>
          </el-col>

          <el-col>
            <el-card shadow="always">
              <span>更新公告标题</span>
              <span>更新公告内容</span>
            </el-card>
          </el-col>

          <el-col>
            <el-card shadow="always">
              <span>更新公告标题</span>
              <span>更新公告内容</span>
            </el-card>
          </el-col>

          <el-col>
            <el-card shadow="always">
              <span>更新公告标题</span>
              <span>更新公告内容</span>
            </el-card>
          </el-col>

          <el-col>
            <el-card shadow="always">
              <span>更新公告标题</span>
              <span>更新公告内容</span>
            </el-card>
          </el-col>

        </el-row>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-date"></i> 其他公告</span>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        x:0,
        clickCount: 0,
        between:352,
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

<style>
  .myTabs{
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 60px;
    padding-right: 60px;
  }
  .myPane .el-card{
    margin-right: 40px;
    width: 310px;
    height: 110px;
  }
  .myPane .el-card span{
    display: block;
  }
  .leftButton {
    position: absolute;
    left: 10px;
    top: 50%;
  }

  .rightButton{
    position: absolute;
    right: 15px;
    top: 50%;
  }
  .paneDiv{
    background-color: #FFFFFF;
  }

</style>
