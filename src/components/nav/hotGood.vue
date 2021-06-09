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

        <el-col v-for="item in hotGoods" :key="item.goodsId"
                style="border: 2px solid #EDEDED;cursor: pointer" @click.native="gotoGoods(item.goodsId,item.shopId)">
          <el-row class="ww3">
            <el-row style="height: 216px;margin-top: 30px">
              <div>
                <img width="216px" height="216px" :src="item.goodsPic" alt="">
              </div>
            </el-row>
            <el-row style="height:47px;margin-top: 20px">
              <div class="ii1">{{item.goodsName}}</div>
              <el-popover placement="top-start" title="" trigger="hover">
                <div class="ii2" style="overflow: hidden">{{item.goodsMemo}}</div>
                <div slot="reference" class="ii22">{{item.goodsMemo}}</div>
              </el-popover>
            </el-row>
            <el-row>
              <div class="ii3">{{item.lowPrice}}~{{item.highPrice}}元</div>
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
  .hotGood .ii1{
    font-size: 14px;
    font-weight: 700;
    margin: 0 8px;
    color: #333;
  }
  .hotGood .ii2{
    margin-top: 10px;
    font-size: 12px;
    color: #999;
    padding-right: 20px;
    padding-left: 20px;
  }
  .hotGood .ii22{
    margin-top: 20px;
    font-size: 12px;
    color: #999;
    padding-right: 20px;
    padding-left: 20px;
    white-space: nowrap;
    text-overflow:ellipsis;
    text-overflow: ellipsis;
    overflow:hidden;
  }
  .hotGood .ii3{
    font-family: Arial;
    font-size: 18px;
    font-weight: bolder;
    color: #d44d44;
    margin: 50px 0;
    -webkit-transition: all .1s ease-out;
    transition: all .1s ease-out;
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
        hotGoods:[],
        x:0,
        clickCount: 0,
        between:306,
        leftStatus:false,
        rightStatus:true,
      };
    },
    mounted() {
      this.init();
    },
    methods:{
      //初始化
      init(){
        this.getHotGoods();
      },
      gotoGoods(goodsId,shopId){
        this.$emit('gotoGoodsBuy',goodsId,shopId)
      },
      //查找热门商品
      getHotGoods(){
        this.$http.get('/hotGoods/getHotGoodsForHome')
          .then(res => {
            if (res.code === 10000) {
              this.hotGoods = res.data;
            }
          });
      },
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

