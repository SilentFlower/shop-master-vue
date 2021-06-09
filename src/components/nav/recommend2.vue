<!--店铺其他商品推荐-->
<template>
  <el-row class="recommend2">
    <el-row class="ww2" type="flex" align="middle">
      <span class="ww1 el-icon-s-opportunity">相关推荐</span>
    </el-row>
    <el-row>
      <el-row  style="height: 858px;">

        <el-col :span="6" v-for="item in recommend.goods" :key="item.goodsId"
                style="border: 2px solid #EDEDED;cursor: pointer;height: 429px" @click.native="gotoGoodsBuy(item.goodsId,item.shopId)">
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
  .recommend2{
    overflow: hidden;
    border-radius: 10px;
    background-color: #FFFFFF;
  }
  .recommend2 .ww2{
    background-color: #FAFAFA;
    border-bottom: 2px solid #E4E4E4;
  }
  .recommend2 .ww1{
    float: left;
    margin-left: 25px;
    font-weight: bolder;
    font-size: 18px;
    line-height: 60px;
    color: #666;
  }
  .recommend2 .ww3{
    margin-left: 20px;
    cursor: pointer;
    font-size: 14px;
    color: #666;
  }
  .recommend2 .ii1{
    font-size: 14px;
    font-weight: 700;
    margin: 0 8px;
    color: #333;
  }
  .recommend2 .ii2{
    margin-top: 10px;
    font-size: 12px;
    color: #999;
    padding-right: 20px;
    padding-left: 20px;
  }
  .recommend2 .ii22{
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
  .recommend2 .ii3{
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
        recommend:{},
      };
    },
    methods:{
      init() {
        this.getRecommend();
      },
      gotoGoodsBuy(goodsId,shopId){
        this.$router.push({
          name:'商品',
          query:{
            goodsId: goodsId,
            shopId: shopId
          }
        })
      },
      getRecommend(){
        this.$http.get('/type/getClassGoodForHome?num=8&typeId='+this.typeId)
          .then(res => {
            if (res.code === 10000) {
              this.recommend = res.data;
              console.log(res.data)
            }
          });
      }
    },
    mounted() {
      this.init();
    },
    props:{
      typeId:String
    }

  }
</script>
