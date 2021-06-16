<!--我的优惠券-->
<template>
  <el-row class="myCoupon" style="padding: 30px 30px 30px 60px;height: 800px">
    <el-row style="border-bottom: 2px solid #F4F7FE;padding-bottom: 20px" type="flex" justify="space-between">
      <div class="mm4">我的优惠券</div>
      <el-select v-model="queryFormForCoupon.unavailable" @change="changeCoupon">
        <el-option  :value="0" label="可使用的优惠券"/>
        <el-option  :value="1" label="不可使用的优惠券"/>
      </el-select>
    </el-row>
    <el-row style="padding-right: 20px;padding-left: 20px;padding-top: 30px;padding-bottom:30px;background-color: #ffffff">
      <div v-if="coupon.length < 1" class="el-icon-discount" style="color:#d9d9d9;font-size: 30px"></div>
      <div v-if="coupon.length < 1" style="color:#d9d9d9;font-size: 24px">暂无优惠券</div>
      <el-col style="margin-top: 20px;" :offset="2" :span="6"
              v-for="item in coupon"
              :key="item.couponId"
              class="base-coupons">
        <el-row style="height: 100%" :class="{'canClick':true}" @click.native="gotoGoods(item)">
          <el-col  :span="6" style="height: 100%">
            <el-row style="height: 100%" type="flex" justify="center" align="middle">
              <span v-if="item.status == 1">可使用</span>
              <span v-else-if="item.status == 0">已使用</span>
              <span v-else>已过期</span>
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

</template>
<style>
  .myCoupon .canClick{
    cursor: pointer;
  }
  .myCoupon .base-coupons {
    width: 250px;
    height: 100px;
    position: relative;
    background: radial-gradient(circle at right top, transparent 10px,  #EDEDED 0) top left / 60px 51% no-repeat,
    radial-gradient(circle at right bottom, transparent 10px, #EDEDED 0) bottom left /60px 51% no-repeat,
    radial-gradient(circle at left top, transparent 10px, #EDEDED 0) top right /190px 51% no-repeat,
    radial-gradient(circle at left bottom, transparent 10px, #EDEDED 0) bottom right /190px 51% no-repeat;
    filter: drop-shadow(3px 3px 3px rgba(0,0,0,.3));
  }

  .myCoupon .base-coupons::before {
    content: '';
    height: 80px;
    border: 1px dashed #000000;
    position: absolute;
    left: 60px;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  .myCoupon .base-coupons::after {
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
  .myCoupon .mm4{
    float: left;
    display: inline-block;
    font-size: 18px;
    font-weight: 800;
    color: #68728c;
  }
</style>

<script>
  export default {
    data() {
      return {
        //商品详细信息
        sts:1,
        coupon:[],
        queryFormForCoupon:{
          userId:null,
          couponFlag:1,
          unavailable:0,
        }
      }
    },
    created() {
      this.queryFormForCoupon.userId = this.$auth.getUser().id;
    },
    mounted() {
      this.init();
    },
    methods:{
      changeCoupon(){
        this.getCoupon();
      },
      gotoGoods(item){
        if (item.goodsId == null) {
          this.$router.push({
            name:'店铺',
            query:{
              shopId: item.shopId
            }
          });
        }else{
          //跳转至商品页面
          this.$router.push({
            name:'商品',
            query:{
              goodsId: item.goodsId,
              shopId: item.shopId
            }
          });
        }
      },
      getCoupon(){
        this.$http.post('/coupon/getCanUseCoupon', this.queryFormForCoupon)
          .then(res => {
            if (res.code === 10000) {
              this.coupon = res.data;
            }
          });
      },
      //初始化
      init(){
        this.getCoupon();
      },
    },
    computed:{
      totalPrice(){
        let all = 0;
        all = this.priceStr * this.buyNum;
        return all
      }
    },
    components: {
    },
  }
</script>
