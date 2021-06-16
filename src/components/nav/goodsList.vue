<!--商品列表-->
<template>
  <el-row class="searchGood" v-if="!fullscreenLoading">
    <el-row style="background-color: #EDEDED" v-if="goods.length == 0">
      <el-row>
        <img src="/static/error.png">
      </el-row>
      <el-row>
        <span class="ll1">抱歉，没有搜索到与 “{{this.goodsName}}” 相关的商品</span>
      </el-row>
    </el-row>
    <el-col :span="6" v-for="item in goods" :key="item.goodsId"
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
</template>
<style>

  .searchGood .ll1{
    color: #333;
    font-size: 24px;
    font-weight: 700;
    margin: 40px auto 0;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .searchGood{
    overflow: hidden;
    border-radius: 10px;
    background-color: #FFFFFF;
  }
  .searchGood .ww2{
    background-color: #FAFAFA;
    border-bottom: 2px solid #E4E4E4;
  }
  .searchGood .ww1{
    float: left;
    margin-left: 25px;
    font-weight: bolder;
    font-size: 18px;
    line-height: 60px;
    color: #666;
  }
  .searchGood .ww3{
    margin-left: 20px;
    cursor: pointer;
    font-size: 14px;
    color: #666;
  }
  .searchGood .ii1{
    font-size: 14px;
    font-weight: 700;
    margin: 0 8px;
    color: #333;
  }
  .searchGood .ii2{
    margin-top: 10px;
    font-size: 12px;
    color: #999;
    padding-right: 20px;
    padding-left: 20px;
  }
  .searchGood .ii22{
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
  .searchGood .ii3 {
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
        goods:[],
        fullscreenLoading:false,
      }
    },
    mounted() {
      this.init();
    },
    props:{
      goodsName:String,
    },
    watch:{
      goodsName(val){
        this.getSearchGoods();
      },
    },
    methods:{
      init(){
        this.getSearchGoods();
      },
      getSearchGoods(){
        this.fullscreenLoading = true
        this.$http.get('/type/getClassGoodForHome'+'?goodsName='+this.goodsName+'&num=1000')
          .then(res => {
            if (res.code === 10000) {
              this.goods = res.data.goods;
              this.fullscreenLoading = false;
            }
          });
      },
      upchange(){
        this.goods.sort((a, b) => {
          return (a.lowPrice+a.highPrice)/2 - (b.lowPrice+b.highPrice)/2
        });
      },
      upchange2(){
        this.goods.sort((a, b) => {
          return (b.lowPrice+b.highPrice)/2 - (a.lowPrice+a.highPrice)/2
        });
      },
      gotoGoods(goodsId,shopId) {
        this.$router.push({
          name:'商品',
          query:{
            goodsId: goodsId,
            shopId: shopId
          }
        })
      },
    }

  }
</script>
