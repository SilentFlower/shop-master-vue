<!--显示商品信息用的-->
<template>
  <el-row>
<!--    信息栏-->
    <el-row class="good" ref="wwwccc">
      <el-row class="detailed" type="flex">
        <el-col style="border: 2px solid #EDEDED;display: flex;justify-content: center;align-items: center" >
          <img :src="goods.goodsPic" width="256px" height="256px">
        </el-col>
        <el-col style="padding-left: 10px;padding-right: 10px;">
          <el-row style="margin-top: 25px;border-bottom: 2px solid #EDEDED;padding-bottom: 10px">
            <span class="title">{{goods.goodsName}}</span>
          </el-row>
          <el-row style="margin-top: 50px;display:flex;justify-content: flex-start;align-items: center">
            <span style="padding-right: 20px">规格选择</span>
            <el-radio-group v-model="chooseSpec" size="medium" @change="changeAuto">
              <el-radio-button :label="item.goodsSpc"
                               v-for="item in goodsDetails"
                               :key="item.goodsSpc">{{item.goodsSpc}}
              </el-radio-button>
            </el-radio-group>
          </el-row>
          <el-row style="margin-top: 50px;display:flex;justify-content: flex-start;align-items: center">
            <span style="padding-right: 50px">数量</span>
            <div class="div_number">
              <el-input-number :min="1" :max="chooseNum" size="mini" v-model="buyNum" placeholder="0" :value="0">
              </el-input-number>
            </div>
            <span style="margin-left: 10px">件(库存{{chooseNum}}件)</span>

          </el-row>
          <el-row style="margin-top: 50px;float: left" >
            <span style="padding-right: 40px">单价</span>
            <span class="money">￥{{priceStr}}</span>
          </el-row>
        </el-col>

      </el-row>

      <el-row class="ww2" type="flex" style="justify-content: space-between;margin-top: 20px" align="middle">
        <span class="ww1 el-icon-shopping-cart-1">优惠券</span>
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
      <goodInfo style="margin-top: 20px" :info="goods.goodsMemo"></goodInfo>
      <recommend :shopId="shopId" style="margin-top: 20px">
      </recommend>
    </el-row>
<!--    购买栏-->
    <el-row class="bottomBuy" type="flex" align="middle" :class="{'boob':addPositionStatus}">
      <el-col>
        你已经选择
      </el-col>
      <el-col>
        <div>{{goods.goodsName}} ￥{{priceStr}}</div>
        <div>{{chooseSpec}}</div>
      </el-col>
      <el-col>
        <span>应付总额：￥{{totalPrice}}</span>
        <el-button type="success">现在购买</el-button>
        <el-button type="primary" @click="addShopCart">加入购物车</el-button>
      </el-col>
    </el-row>
  </el-row>


</template>
<style>
  .good .canClick{
    cursor: pointer;
  }
  .good .base-coupons {
    width: 250px;
    height: 100px;
    position: relative;
    background: radial-gradient(circle at right top, transparent 10px,  #EDEDED 0) top left / 60px 51% no-repeat,
    radial-gradient(circle at right bottom, transparent 10px, #EDEDED 0) bottom left /60px 51% no-repeat,
    radial-gradient(circle at left top, transparent 10px, #EDEDED 0) top right /190px 51% no-repeat,
    radial-gradient(circle at left bottom, transparent 10px, #EDEDED 0) bottom right /190px 51% no-repeat;
    filter: drop-shadow(3px 3px 3px rgba(0,0,0,.3));
  }

  .good .base-coupons::before {
    content: '';
    height: 80px;
    border: 1px dashed #000000;
    position: absolute;
    left: 60px;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  .good .base-coupons::after {
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
  .good .ww2{
    background-color: #FAFAFA;
    border-bottom: 2px solid #E4E4E4;
  }
  .good .ww1{
    float: left;
    margin-left: 25px;
    font-weight: bolder;
    font-size: 18px;
    line-height: 60px;
    color: #666;
  }
  .good{
    margin: 0 auto;
    width: 1524px;
    padding: 30px 150px 30px 150px;
    font-family: 微软雅黑,宋体,Arial,Helvetica,Verdana,sans-serif;
    font-weight: bold;
    border: 0;
    -webkit-box-shadow: 0 4px 20px 2px rgba(40,112,220,.08);
    box-shadow: 0 4px 20px 2px rgba(40,112,220,.08);
  }
  .good .money{
    color: #d44d44;
    font-size: 21px;
  }
  .good .title{
    font-size: 30px;
    color: #000;
    line-height: 1;
    float: left;
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
        chooseSpec:null,
        chooseNum:1,
        buyNum:1,
        priceStr:null,
        addPositionStatus: true,
        goodsId:null,
        shopId:null,
        addForm:{
          goodsNum:null,
          goodsId:null,
          goodsSpc:null,
        },
        //商品信息
        goods: {},
        //商品详细信息
        goodsDetails:[],
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
          },
        }
      }
    },
    created() {
      this.goodsId = this.$route.query.goodsId;
      this.shopId = this.$route.query.shopId;
      this.queryFormForCoupon.data.goodsId = this.goodsId;
      this.queryFormForCoupon.data.shopId = this.shopId;
      this.queryFormForCoupon.data.userId = this.$auth.getUser().id;
    },
    mounted() {
      window.addEventListener('scroll',this.handleScroll)
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
      //清空表单
      clearForm(){
        this.addForm.goodsNum = null;
        this.addForm.goodsId = null;
        this.addForm.goodsSpc = null;
      },
      //跳转至购物车页面
      addShopCart(){
        this.addForm.goodsNum = this.buyNum;
        this.addForm.goodsId = this.goodsId;
        this.addForm.goodsSpc = this.chooseSpec;
        //加入购物车
        this.$http.post('/shopcart/addShopcart',this.addForm)
          .then(res => {
            if (res.code === 10000) {
              this.$message.success("购物车添加成功");
            }
            this.clearForm();
          });
      },
      changeAuto(){
        for (let item of this.goodsDetails) {
          if (item.goodsSpc == this.chooseSpec) {
            this.priceStr = item.goodsPrice;
            this.chooseNum = item.goodsNum;
          }
        }
        this.buyNum = 1;
      },
      getCoupon(){
        this.$http.post('/coupon/getListByPage', this.queryFormForCoupon)
          .then(res => {
            if (res.code === 10000) {
              this.coupon = res.data.list;
            }
          });
      },
      //初始化
      init(){
        this.getGoods();
        this.getGoodsDetails();
        this.getCoupon();
      },
      getGoodsDetails(){
        this.$http.get('/goodsDetails/getGoodsDetailsByParam?goodsId=' + this.goodsId)
          .then(res => {
            if (res.code === 10000) {
              let datas = res.data;
              let maxPrice = datas[0].goodsPrice;
              let minPrice = datas[0].goodsPrice;
              for (let item of datas) {
                if (item.goodsPrice > maxPrice) {
                  maxPrice = item.goodsPrice;
                }
                if (item.goodsPrice < minPrice) {
                  minPrice = item.goodsPrice;
                }
              }
              this.chooseSpec = res.data[0].goodsSpc;
              this.priceStr = res.data[0].goodsPrice;
              this.chooseNum = res.data[0].goodsNum;
              this.goodsDetails = res.data;
            }
          });
      },
      getGoods(){
        this.$http.get('/goods/getGoodsByParam?goodsId=' + this.goodsId)
          .then(res => {
            if (res.code === 10000) {
              this.goods = res.data;
            }
          });
      },
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
    computed:{
      totalPrice(){
        let all = 0;
        all = this.priceStr * this.buyNum;
        return all
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
