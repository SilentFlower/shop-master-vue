<!--结算-->
<template>

  <!--    信息栏-->
  <el-row class="settleAccounts" v-if="loading">
    <el-row class="ww2" type="flex" align="middle">
      <span class="ww1 el-icon-shopping-cart-1">购物清单</span>
    </el-row>

    <el-row>
      <el-table
        :data="buyList"
        style="width: 100%"
      >
        <el-table-column
          type="index"
          label="序号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="goodsPic"
          label="商品图片">
          <template slot-scope="scope">
            <el-popover placement="top-start" title="" trigger="hover">
              <img :src="scope.row.goodsPic" alt="" style="width: 150px;height: 150px">
              <img slot="reference" :src="scope.row.goodsPic" style="width: 30px;height: 30px">
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="goodsName"
          label="商品名称">
        </el-table-column>
        <el-table-column
          prop="goodsPrice"
          label="商品价格">
          <template slot-scope="scope">
            <span>￥{{scope.row.goodsPrice}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="购买数量">
          <template slot-scope="scope">
            <div class="div_number">
              <el-input-number
                disabled
                :min="1"
                :max="scope.row.stock"
                size="mini"
                v-model="scope.row.goodsNum"
                placeholder="0"
                :value="0">
              </el-input-number>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="stock"
          label="库存">
          <template slot-scope="scope">
            <span>{{scope.row.stock}}件</span>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <el-row class="ww2" type="flex" style="justify-content: space-between" align="middle">
      <span class="ww1 el-icon-shopping-cart-1">优惠券</span>
      <el-select v-model="queryFormForCoupon.canUse" @change="changeCoupon">
        <el-option :value="1" label="可用优惠券">
        </el-option>
        <el-option :value="0" label="不可用优惠券">
        </el-option>
      </el-select>
    </el-row>
    <el-row style="padding-right: 20px;padding-left: 20px;padding-top: 30px;padding-bottom:30px;background-color: #ffffff">
      <div v-if="coupon.length < 1" class="el-icon-discount" style="color:#d9d9d9;font-size: 24px"></div>
      <div v-if="coupon.length < 1" style="color:#d9d9d9;">暂无优惠券</div>
      <el-col style="margin-top: 20px;" :offset="2" :span="6"
              v-for="item in coupon"
              :key="item.couponId"
              class="base-coupons">
        <el-row style="height: 100%">
          <el-col  :span="6"  style="height: 100%">
            <el-row style="height: 100%" :class="{'canClick':item.canUse == 1}" type="flex" justify="center" align="middle" @click.native="useCoupon(item)">
              <span v-if="item.canUse == 0">不可用</span>
              <span v-else-if="item.haveUse == 1">已使用</span>
              <span v-else>未使用</span>
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



    <el-row type="flex" style="justify-content: flex-end" class="ww5" align="middle">
      <el-col :span="8" class="ww4">
        <el-col :span="12">
          应付总额：<span :class="{'delete':totalPrice != discountPrice}">￥{{totalPrice}}</span> <span v-if="totalPrice != discountPrice">￥{{discountPrice}}</span>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" round @click="settleAccounts">提交订单</el-button>
        </el-col>
      </el-col>
    </el-row>
  </el-row>

</template>
<style>
  .settleAccounts .delete{
    text-decoration:line-through;
  }
  .settleAccounts .canClick{
    cursor: pointer;
  }
  .settleAccounts{
    margin: 0 auto;
    width: 1524px;
    padding: 30px 150px 30px 150px;
  }
  .settleAccounts .ww2{
    background-color: #FAFAFA;
    border-bottom: 2px solid #E4E4E4;
  }

  .settleAccounts .ww5{
    height: 81px;
    background-color: #FFFFFF;
    border-bottom: 2px solid #E4E4E4;
  }
  .settleAccounts .ww4{
    color: #323232;
    font-weight: 700;
  }
  .settleAccounts .ww3{
    color: #959595;
    margin-top: 4px;
    font-weight: 700;
  }

  .settleAccounts .ww1{
    float: left;
    margin-left: 25px;
    font-weight: bolder;
    font-size: 18px;
    line-height: 60px;
    color: #666;
  }
  .settleAccounts .base-coupons {
    width: 250px;
    height: 100px;
    position: relative;
    background: radial-gradient(circle at right top, transparent 10px,  #EDEDED 0) top left / 60px 51% no-repeat,
    radial-gradient(circle at right bottom, transparent 10px, #EDEDED 0) bottom left /60px 51% no-repeat,
    radial-gradient(circle at left top, transparent 10px, #EDEDED 0) top right /190px 51% no-repeat,
    radial-gradient(circle at left bottom, transparent 10px, #EDEDED 0) bottom right /190px 51% no-repeat;
    filter: drop-shadow(3px 3px 3px rgba(0,0,0,.3));
  }

  .settleAccounts .base-coupons::before {
    content: '';
    height: 80px;
    border: 1px dashed #000000;
    position: absolute;
    left: 60px;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  .settleAccounts .base-coupons::after {
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

</style>

<script>
  export default {
    data() {
      return {
        loading:true,
        updateForm:{
          goodsId:null,
          goodsSpc:null,
          goodsNum:null,
        },
        queryFormForCoupon:{
          userId:null,
          couponFlag:1,
          unavailable:0,
          canUse:1,
        },
        canUse:[],
        cantUse:[],
        usedCoupon:[],
        coupon:[],
        buyList: [],
        //生成订单
        orders:[],
        goodsMap: new Map(),
        couponsMap: new Map(),
      }
    },
    created() {
      this.queryFormForCoupon.userId = this.$auth.getUser().id;
      this.buyList = this.$auth.getShopCart();
    },
    mounted() {
      this.init();
    },
    methods:{
      strMapToObj(strMap) {
        let obj = Object.create(null);
        for (let [k, v] of strMap) {
          obj[k] = v;
        }
        return obj;
      },
      mapToJson(map) {
        return JSON.stringify(this.strMapToObj(map));
      },
      //结算 提交订单
      settleAccounts(){
        let map1 = null;
        if (this.couponsMap.size != 0) {
          map1 = this.couponsMap
        }
        if (map1 != null) {
          map1 = this.mapToJson(map1);
        }
        let map2 = this.mapToJson(this.goodsMap);
        this.$http.post('/order/makeOrder', {couponMap: map1, goodsMap: map2})
        .then(res => {
          if (res.code === 10000) {
            this.$message.success("订单提交成功");
            this.$router.push({
              name:'个人信息汇总',
            });
          }
        });
      },
      changeCoupon(){
        //保存旧数据
        if (this.queryFormForCoupon.canUse == 1) {
          this.coupon = this.canUse;
        }else{
          this.coupon = this.cantUse;
        }
      },
      useCoupon(item){
        if(this.queryFormForCoupon.canUse == 1 && item.canUse == 1) {
          if (item.haveUse == 0) {
            this.usedCoupon.push(item);
            item.haveUse = 1;
          } else {
            this.usedCoupon = this.usedCoupon.filter(t => t.couponId != item.couponId);
            item.haveUse = 0;
          }
        }
      },
      //处理优惠券
      handlerCoupon(datas,flag){
        let all = 0;
        this.goodsMap = new Map();
        this.couponsMap = new Map();
        //根据商店ID进行大订单分类
        for (let goods of this.buyList) {
          let goodsList = this.goodsMap.get(goods.shopId);
          if (goodsList == undefined) {
            goodsList = new Array();
          }
          goodsList.push(goods);
          this.goodsMap.set(goods.shopId, goodsList);
        }
        //同样根据商店ID分类优惠券
        for (let coupon of datas) {
          let couponList = this.couponsMap.get(coupon.shopId);
          if (couponList == undefined) {
            couponList = new Array();
          }
          couponList.push(coupon);
          this.couponsMap.set(coupon.shopId, couponList);
        }
        //再根据map遍历计算价格
        for (let item of this.goodsMap.keys()) {
          //获取相关的优惠券
          let goodsList = this.goodsMap.get(item);
          for (let item of goodsList) {
            item.amount = null;
          }
          //获取相关的优惠券
          let couponList = this.couponsMap.get(item);
          let typePrice = 0;
          for (let i in goodsList) {
            //原始价格
            typePrice += goodsList[i].goodsPrice * goodsList[i].goodsNum;
          }
          for (let i in couponList) {
            //为商品优惠券时
            if (couponList[i].goodsId != null) {
              for (let j in goodsList) {
                if (goodsList[j].goodsId == couponList[i].goodsId) {
                  if (goodsList[j].amount == null) {
                    goodsList[j].amount = goodsList[j].goodsPrice * goodsList[j].goodsNum;
                  }
                  if (couponList[i].couponLimit == null || goodsList[j].amount >= couponList[i].couponLimit) {
                    if (flag != 1) {
                      this.canUse.push(couponList[i]);
                    }
                    let disCountPrice = 0;
                    if (couponList[i].couponUseType == '折扣优惠券') {
                      disCountPrice = goodsList[j].amount * couponList[i].couponValue * 0.1;
                    }else if(couponList[i].couponUseType == '满减优惠券'){
                      disCountPrice = goodsList[j].amount - couponList[i].couponValue;
                    }
                    typePrice = typePrice - goodsList[j].amount + disCountPrice;
                    goodsList[j].amount = disCountPrice;
                    break;
                  }
                }
                //如果最后一个商品也不符合则丢入不可使用
                if (j == goodsList.length - 1) {
                  if (flag != 1) {
                    couponList[i].canUse = 0;
                    this.cantUse.push(couponList[i]);
                  }else{
                    for (let item of this.canUse) {
                      if (item.couponId == couponList[i].couponId) {
                        item.canUse = 0;
                      }
                    }
                  }
                }
              }
            }else if(couponList[i].goodsId == null){
              //为店铺优惠券时，计算该店铺下的商品价钱总和
              if (couponList[i].couponLimit == null || typePrice >= couponList[i].couponLimit) {
                if (flag != 1) {
                  this.canUse.push(couponList[i]);
                }
                let disCountPrice = 0;
                if (couponList[i].couponUseType == '折扣优惠券') {
                  disCountPrice = typePrice * couponList[i].couponValue * 0.1;
                }else if(couponList[i].couponUseType == '满减优惠券'){
                  disCountPrice = typePrice - couponList[i].couponValue;
                }
                typePrice = disCountPrice;
              }else{
                if (flag != 1) {
                  couponList[i].canUse = 0;
                  this.cantUse.push(couponList[i]);
                }else{
                  console.log(couponList[i].couponId)
                  for (let item of this.canUse) {
                    if (item.couponId == couponList[i].couponId) {
                      item.canUse = 0;
                    }
                  }
                }
              }
            }
          }
          all += typePrice;
        }
        if (all == 0) {
          for (let i in this.buyList) {
            //原始价格
            all += this.buyList[i].goodsPrice * this.buyList[i].goodsNum;
          }
        }
        return parseFloat(all).toFixed(2);
      },
      getCoupon(){
        this.$http.post('/coupon/getCanUseCoupon', this.queryFormForCoupon)
          .then(res => {
            if (res.code === 10000) {
              let datas = res.data;
              console.log(datas)
              for (let item of datas) {
                this.$set(item, 'haveUse', 0);
                this.$set(item, 'canUse', 1);
              }
              this.handlerCoupon(datas);
              this.coupon = this.canUse;
            }
          });
      },
      init(){
        this.getCoupon();
      },

    },
    computed:{
      totalPrice(){
        let all = 0;
        for (let i in this.buyList) {
          //原始价格
          all += this.buyList[i].goodsPrice * this.buyList[i].goodsNum;
        }
        return all
      },
      discountPrice(){
        //计算实际价格
        let all = this.handlerCoupon(this.usedCoupon,1)
        return all
      }
    },
  }
</script>
