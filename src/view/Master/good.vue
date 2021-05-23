<!--显示商品信息用的-->
<template>
  <el-row>
<!--    信息栏-->
    <el-row class="good" ref="wwwccc">
      <el-row class="detailed" type="flex">
        <el-col style="border: 2px solid #F9F9F9 ">
          商品图片
        </el-col>
        <el-col>
          <el-row>
            <span>商品标题</span>
          </el-row>
          <el-row>
            <span>描述</span>
            <span>￥价格</span>
          </el-row>
          <el-row>
            库存:??
          </el-row>
          <el-row>
            选择规格:??
          </el-row>
          <el-row>
            选择数量:??
          </el-row>
        </el-col>

      </el-row>
      <goodInfo style="margin-top: 20px"></goodInfo>
      <recommend style="margin-top: 20px">
      </recommend>
    </el-row>
<!--    购买栏-->
    <el-row class="bottomBuy" type="flex" align="middle" :class="{'boob':addPositionStatus}">
      <el-col>
        你已经选择
      </el-col>
      <el-col>
        <div>坚果 R2¥ 2,699.00</div>
        <div>浅黑色 | 8G + 128GB</div>
      </el-col>
      <el-col>
        <span>¥ 2,699.00</span>
        <el-button>现在购买</el-button>
        <el-button>加入购物车</el-button>
      </el-col>
    </el-row>
  </el-row>


</template>
<style>
  .good{
    margin: 0 auto;
    width: 1524px;
    padding: 30px 150px 30px 150px;
  }
  .good .detailed{
    height: 463px;
    background-color: #FFFFFF;
    border-radius: 10px;
  }
  .bottomBuy{
    border-bottom: 1px solid #ffffff;
    color: #e6e6e6;
    border-top: 1px solid #e3e3e3;
    box-shadow: 0 -1px 3px rgba(0,0,0,.04);
    height:60px;
    width: 100%;
    bottom: 0;
    background-color: #37405E;
    z-index: 1999;
  }
  .boob{
    position: fixed!important;
  }
</style>

<script>
  import goodsList from "../../components/nav/goodsList";
  import goodInfo from "../../components/nav/goodInfo";
  import recommend from "../../components/nav/recommend";
  export default {
    data() {
      return {
        addPositionStatus: true
      }
    },
    mounted() {
      window.addEventListener('scroll',this.handleScroll)
    },
    methods:{
      handleScroll(e){
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        let maxHeight = this.getBottomHeight();
        console.log(maxHeight)
        if (scrollTop > maxHeight) {
          this.addPositionStatus = false
        }else{
          this.addPositionStatus = true
        }
      },
      getBottomHeight(){
        return this.$refs.wwwccc.$el.scrollHeight-520;
      }

    },
    components: {
      goodsList,
      goodInfo,
      recommend,
    },
    destroyed() {
      window.removeEventListener('scroll', this.handleScroll)
    },
  }
</script>
