<!--显示店铺-->
<template>
  <el-row>
    <!--    信息栏-->
    <el-row class="myShop" ref="wwwccc">
      <el-row class="ww2" type="flex" style="justify-content: space-between;margin-top: 20px" align="middle">
        <span class="ww1 el-icon-shopping-cart-1">店铺</span>
      </el-row>
      <el-row class="dd" type="flex">
        <el-col style="border: 2px solid #EDEDED;display: flex;justify-content: center;align-items: center" >
          <img :src="shop.shopPicUrl" width="256px" height="256px">
        </el-col>
        <el-col style="padding-left: 10px;padding-right: 10px;">
          <el-row style="margin-top: 25px;border-bottom: 2px solid #EDEDED;padding-bottom: 10px">
            <span class="title">{{shop.shopName}}</span>
          </el-row>
          <el-row style="margin-top: 25px;padding-bottom: 10px;">
            <span style="font-size: 20px">店铺介绍</span>
            <div style="margin-top: 20px;margin-left:20px;text-align: left" class="title">{{shop.shopMemo}}</div>
          </el-row>
        </el-col>
      </el-row>
      <el-row class="ww2" type="flex" style="justify-content: space-between;margin-top: 20px" align="middle">
        <span class="ww1 el-icon-shopping-cart-1">店铺公告</span>
      </el-row>
      <el-row class="dd" type="flex">
        <el-row style="margin-top: 25px;padding-bottom: 10px;">
          <div style="margin-top: 20px;margin-left:20px;text-align: left" class="title">{{shop.shopNotice}}</div>
        </el-row>
      </el-row>

      <el-row class="ww2" type="flex" style="justify-content: space-between;margin-top: 20px" align="middle">
        <span class="ww1 el-icon-shopping-cart-1">店铺优惠券</span>
      </el-row>
      <el-row style="padding-right: 20px;padding-left: 20px;padding-top: 30px;padding-bottom:30px;background-color: #ffffff">
        <div v-if="coupon.length < 1" class="el-icon-discount" style="color:#d9d9d9;font-size: 24px"></div>
        <div v-if="coupon.length < 1" style="color:#d9d9d9;">暂无优惠券</div>
        <el-col style="margin-top: 20px;" :offset="2" :span="6"
                v-for="item in coupon"
                :key="item.couponId"
                class="base-coupons">
          <el-row style="height: 100%">
            <el-col  :span="6" :class="{'canClick':item.haveUseCount == 0}" style="height: 100%" @click.native="pullCoupon(item)">
              <el-row style="height: 100%" type="flex" justify="center" align="middle">
                <span v-if="item.haveUseCount > 0">已领取</span>
                <span v-else-if="item.couponNum <= 0">已领完</span>
                <span v-else>领取</span>
              </el-row>
            </el-col>
            <el-col :span="18">
              <el-row style="margin-top: 5px">
                <el-col>
                  <div style="color: #FF495B">{{item.couponName}}</div>
                </el-col>
              </el-row>
              <el-row style="margin-top: 5px">
                <el-col>
                  <div style="font-size: 12px;color: #4B79FA">{{item.couponUseType}}</div>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <div style="color: #089a4c">{{item.couponValue}}
                    <span v-if="item.couponUseType == '折扣优惠券'">折</span>
                    <span v-else>元</span>
                  </div>
                </el-col>
              </el-row>
              <el-row style="margin-top: 5px">
                <el-col>
                  <div style="color: #73C9E5">满{{item.couponLimit}}<span>元可用</span></div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-row>
  </el-row>


</template>
<style>
  .myShop .canClick{
    cursor: pointer;
  }
  .myShop .base-coupons {
    width: 250px;
    height: 100px;
    position: relative;
    background: radial-gradient(circle at right top, transparent 10px,  #EDEDED 0) top left / 60px 51% no-repeat,
    radial-gradient(circle at right bottom, transparent 10px, #EDEDED 0) bottom left /60px 51% no-repeat,
    radial-gradient(circle at left top, transparent 10px, #EDEDED 0) top right /190px 51% no-repeat,
    radial-gradient(circle at left bottom, transparent 10px, #EDEDED 0) bottom right /190px 51% no-repeat;
    filter: drop-shadow(3px 3px 3px rgba(0,0,0,.3));
  }

  .myShop .base-coupons::before {
    content: '';
    height: 80px;
    border: 1px dashed #000000;
    position: absolute;
    left: 60px;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  .myShop .base-coupons::after {
    content: '';
    position: absolute;
    height: 100%;
    width:5px;
    top: 0;
    right: -5px;
    background-image: linear-gradient(to bottom, #EDEDED 5px, transparent 5px, transparent),
    radial-gradient(10px circle at 5px 10px, transparent 5px, #EDEDED 5px);
    background-size: 5px 15px;
  }
  .myShop .ww2{
    background-color: #FAFAFA;
    border-bottom: 2px solid #E4E4E4;
  }
  .myShop .ww1{
    float: left;
    margin-left: 25px;
    font-weight: bolder;
    font-size: 18px;
    line-height: 60px;
    color: #666;
  }
  .myShop{
    margin: 0 auto;
    width: 1524px;
    padding: 30px 150px 30px 150px;
    font-family: 微软雅黑,宋体,Arial,Helvetica,Verdana,sans-serif;
    font-weight: bold;
    border: 0;
    -webkit-box-shadow: 0 4px 20px 2px rgba(40,112,220,.08);
    box-shadow: 0 4px 20px 2px rgba(40,112,220,.08);
  }
  .myShop .dd{
    height: 463px;
    background-color: #FFFFFF;
    border-radius: 10px;
  }
</style>

<script>
  export default {
    data() {
      return {
        shopId:null,
        shop:{},
        coupon:[],
        queryFormForCoupon:{
          pageSize:100,
          pageNumber:1,
          data:{
            shopId:null,
            goodsId:null,
            userId:null,
            expiredFlag:0,
            couponFlag:1,
            haveUseCount:1,
          },
        }
      }
    },
    created() {
      this.shopId = this.$route.query.shopId;
      this.queryFormForCoupon.data.shopId = this.shopId;
      this.queryFormForCoupon.data.userId = this.$auth.getUser().id;
    },
    mounted() {
      this.init();
    },
    methods:{
      pullCoupon(item){
        if (item.haveUseCount == 0 && item.couponNum > 0) {
          this.$http.post('/couponUser/addCouponUser', {couponId: item.couponId})
            .then(res => {
              if (res.code === 10000) {
                this.$message.success("领取成功");
                this.getCoupon();
              }else{
                this.$message.success("领取失败,请刷新");
              }
            });
        }
      },
      //初始化
      init(){
        this.getShopInfo();
        this.getCoupon();
      },
      getCoupon(){
        this.$http.post('/coupon/getListByPage', this.queryFormForCoupon)
          .then(res => {
            if (res.code === 10000) {
              this.coupon = res.data.list;
            }
          });
      },
      getShopInfo(){
        this.$http.get('/shop/getShop?shopId=' + this.shopId)
          .then(res => {
            if (res.code === 10000) {
              this.shop = res.data;
            }
          });
      }

    },
  }
</script>
