<!--商品类别一-->
<template>
  <el-row class="classGood3">
    <el-row class="ww2" type="flex" align="middle">
      <span class="ww1 el-icon-s-shop">充值卡</span>
      <span class="ww3 el-icon-more">更多推荐</span>
    </el-row>
    <el-row>
      <el-row  style="height: 858px;">
        <el-row style="height: 429px">
          <el-col :span="12" style="border: 2px solid #EDEDED;height: 100%;overflow:hidden">
            <img :src="classGood.typePic"  width="612px" height="429px" style="object-fit: cover;object-position: 0% 0%;" alt="">
          </el-col>

          <el-col :span="6" v-for="item in classGood.goods" :key="item.goodsId"
                  style="border: 2px solid #EDEDED;cursor: pointer;height: 429px" @click.native="gotoGoods(item.goodsId,item.shopId)">
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
  </el-row>
</template>
<style>
  .classGood3{
    overflow: hidden;
    border-radius: 10px;
    background-color: #FFFFFF;
  }
  .classGood3 .ww2{
    background-color: #FAFAFA;
    border-bottom: 2px solid #E4E4E4;
  }
  .classGood3 .ww1{
    float: left;
    margin-left: 25px;
    font-weight: bolder;
    font-size: 18px;
    line-height: 60px;
    color: #666;
  }
  .classGood3 .ww3{
    margin-left: 20px;
    cursor: pointer;
    font-size: 14px;
    color: #666;
  }
  .classGood3 .ii1{
    font-size: 14px;
    font-weight: 700;
    margin: 0 8px;
    color: #333;
  }
  .classGood3 .ii2{
    margin-top: 10px;
    font-size: 12px;
    color: #999;
    padding-right: 20px;
    padding-left: 20px;
  }
  .classGood3 .ii22{
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
  .classGood3 .ii3{
    font-family: Arial;
    font-size: 18px;
    font-weight: bolder;
    color: #d44d44;
    margin: 50px 0;
    -webkit-transition: all .1s ease-out;
    transition: all .1s ease-out;
  }
</style>
<script>
  export default {
    data() {
      return {
        classGood: {
          typePic:null,
        },
      };
    },
    mounted() {
      this.init();
    },
    methods:{
      gotoGoods(goodsId,shopId){
        this.$emit('gotoGoodsBuy',goodsId,shopId)
      },
      init(){
        this.getClassGood3();
      },
      getClassGood3(){
        //获取类别信息
        this.$http.get('/type/getClassGoodForHome?typeName=充值卡&num=6')
          .then(res => {
            if (res.code === 10000) {
              this.classGood = res.data
            }
          });

      },

    },

  }
</script>
