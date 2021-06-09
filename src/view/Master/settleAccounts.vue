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
      <el-select v-model="queryForm.expiredFlag">
        <el-option :value="0" label="可用优惠券">
        </el-option>
        <el-option :value="1" label="不可用优惠券">
        </el-option>
      </el-select>
    </el-row>
    <el-row style="padding-right: 20px;padding-left: 20px;padding-top: 30px;background-color: #ffffff">
      <el-col :span="6" class="base-coupons">
        <span>测试</span>
      </el-col>
    </el-row>



    <el-row type="flex" style="justify-content: flex-end" class="ww5" align="middle">
      <el-col :span="8" class="ww4">
        <el-col :span="12">
          应付总额：￥{{totalPrice}}
        </el-col>
        <el-col :span="8">
          <el-button type="primary" round @click="settleAccounts">提交订单</el-button>
        </el-col>
      </el-col>
    </el-row>
  </el-row>

</template>
<style>
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
    background: radial-gradient(circle at right top, transparent 10px,  #28A4F2 0) top left / 60px 51% no-repeat,
    radial-gradient(circle at right bottom, transparent 10px, #28a4f2 0) bottom left /60px 51% no-repeat,
    radial-gradient(circle at left top, transparent 10px, #28a4f2 0) top right /190px 51% no-repeat,
    radial-gradient(circle at left bottom, transparent 10px, #28a4f2 0) bottom right /190px 51% no-repeat;
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
    background-image: linear-gradient(to bottom, #28a4f2 5px, transparent 5px, transparent),
    radial-gradient(10px circle at 5px 10px, transparent 5px, #28a4f2 5px);
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
        queryForm:{
          goods:null,
          expiredFlag:0,
          couponFlag:1,
        },
        coupon:{},
        buyList:[],
      }
    },
    created() {
      this.buyList = this.$route.query.buyList;
    },
    mounted() {
      this.init();
    },
    methods:{
      //结算
      settleAccounts(){

      },
      getCoupon(){
        this.queryForm.goods = this.buyList;
        console.log(this.queryForm.goods)
        this.$http.post('/coupon/getCanUseCoupon', this.queryForm)
          .then(res => {
            if (res.code === 10000) {
              console.log(res.data)
              this.coupon = res.data;
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
          all += this.buyList[i].goodsPrice * this.buyList[i].goodsNum;
        }
        return all
      }
    },
  }
</script>
