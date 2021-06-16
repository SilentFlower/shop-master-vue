<!-- 订单详细内容 -->
<template>
  <el-dialog :visible.sync="goodsDetailsVisible"
             v-if="goodsDetailsVisible"
             class="cccc"
             width="50%"
             :before-close="close"
             :close-on-click-modal="false">
    <div slot="title" class="dialogTitle">
      订单详细内容
    </div>
    <el-row>
      <el-table
        :data="goodsDetails"
        v-loading="loading"
        @row-click="gotoGoods"
        stripe
        :header-cell-style="getHeadClass"
        style="width: 100%">
        <el-table-column
          prop="goodsName"
          label="商品名称">
          <template slot-scope="scope">
            {{scope.row.goodsName}}
          </template>
        </el-table-column>
        <el-table-column
          prop="goodsSpc"
          label="商品规格">
          <template slot-scope="scope">
            {{scope.row.goodsSpc}}
          </template>
        </el-table-column>
        <el-table-column
          prop="goodsPic"
          label="商品图片">
          <template slot-scope="scope">
            <el-popover placement="top-start" title="" trigger="hover">
              <img :src="scope.row.goodsPic+'?'+Math.random()" alt="" style="width: 150px;height: 150px">
              <img slot="reference" :src="scope.row.goodsPic+'?'+Math.random()" style="width: 30px;height: 30px">
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="num"
          label="购买数量">
          <template slot-scope="scope">
            {{scope.row.num}}
          </template>
        </el-table-column>
        <el-table-column
          prop="price"
          label="单价">
          <template slot-scope="scope">
            {{scope.row.price}}
          </template>
        </el-table-column>
        <el-table-column
          prop="sum"
          label="合计">
          <template slot-scope="scope">
            {{scope.row.sum}}
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0">已取消</span>
            <span v-if="scope.row.status == 1">待发货</span>
            <span v-if="scope.row.status == 2">已发货</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click.stop="openGoodsCoupon(scope.row)">优惠券</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row type="flex" justify="flex-end">
      <el-button type="danger" @click="sendGoodVible = true">退款</el-button>
      <span class="eqe" style="margin-left: auto;margin-right: 40px" v-if="row.appealFlag == 1">退款总和￥{{row.backAmount}}</span>
      <span class="eqe" style="margin-left: auto;margin-right: 40px">实际支付总和￥{{row.payAmount}}</span>
    </el-row>
    <el-row>
      <div class="dialogTitle" v-if="shopCoupon.length > 0">
        使用的店铺优惠券
      </div>
    </el-row>
    <el-row style="margin-top: 20px" type="flex" justify="flex-start">
      <el-col style="margin-top: 20px;" :offset="2"
              v-for="item in shopCoupon"
              :key="item.couponId"
              class="base-coupons">
        <el-row style="height: 100%">
          <el-col  :span="6" style="height: 100%">
            <el-row style="height: 100%" type="flex" justify="center" align="middle">
              <span>已使用</span>
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
    <el-drawer
      class="hhh"
      :visible.sync="goodCoupon"
      size="40%"
      direction="rtl"
      append-to-body
      @close="goodCoupon = false">
      <template slot="title">
        <el-row style="border-bottom: 2px solid #F7F7F7;padding-bottom: 10px">
          <span style="font-weight: 500;font-size: 16px;color: #000000">商品优惠券</span>
        </el-row>
      </template>
      <el-row v-if="count == 0" type="flex" justify="center" align="middle">
        <el-col style="display: flex;justify-content: center">
          <span>无使用记录</span>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px" type="flex" justify="flex-start">
        <el-col style="margin-top: 20px;" :offset="2"
                v-for="item in chooseRow.coupon"
                :key="item.couponId"
                class="base-coupons">
          <el-row style="height: 100%">
            <el-col  :span="6" style="height: 100%">
              <el-row style="height: 100%" type="flex" justify="center" align="middle">
                <span>已使用</span>
              </el-row>
            </el-col>
            <el-col :span="18">
              <el-row style="margin-top: 5px">
                <el-col style="display: flex;justify-content: center">
                  <div style="color: #FF495B">{{item.couponName}}</div>
                </el-col>
              </el-row>
              <el-row style="margin-top: 5px">
                <el-col style="display: flex;justify-content: center">
                  <div style="font-size: 12px;color: #4B79FA">{{item.couponUseType}}</div>
                </el-col>
              </el-row>
              <el-row>
                <el-col style="display: flex;justify-content: center">
                  <div style="color: #089a4c">{{item.couponValue}}
                    <span v-if="item.couponUseType == '折扣优惠券'">折</span>
                    <span v-else>元</span>
                  </div>
                </el-col>
              </el-row>
              <el-row style="margin-top: 5px">
                <el-col style="display: flex;justify-content: center">
                  <div style="color: #73C9E5">满{{item.couponLimit}}<span>元可用</span></div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-drawer>
    <el-drawer
      class="hhh"
      :visible.sync="sendGoodVible"
      size="40%"
      direction="rtl"
      append-to-body
      @close="sendGoodVible = false">
      <template slot="title">
        <el-row style="border-bottom: 2px solid #F7F7F7;padding-bottom: 10px">
          <span style="font-weight: 500;font-size: 16px;color: #000000">退款</span>
        </el-row>
      </template>
      <el-form label-position="top" label-width="80px" style="padding-left: 20px;padding-right: 20px">
        <el-row>
          <el-form-item>
            <template slot="label">
              <span class="uytradsdadsaew">退款金额</span>
            </template>
            <el-col :span="14">
              <el-input
                type="number"
                v-model="backAmount"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item>
            <template slot="label">
              <span class="uytradsdadsaew">发送信息</span>
            </template>
            <el-col :span="14">
              <el-input
                :autosize="{ minRows: 6, maxRows: 20}"
                type="textarea"
                v-model="message"></el-input>
            </el-col>
          </el-form-item>
        </el-row>
      </el-form>
      <el-row style="margin-left: auto;display: flex;margin-right: 20px;margin-top: 20px;justify-content: flex-end">
        <el-button @click="sendGoodVible = false">
          取消
        </el-button>
        <el-button type="primary" @click="sendMessage">
          提交
        </el-button>
      </el-row>
    </el-drawer>
  </el-dialog>
</template>
<style>
  .uytradsdadsaew{
    color: #3b5998;
    font-weight: 600;
    font-family: Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
  }
  .wadasd .el-drawer.rtl{
    overflow-y: scroll;
  }
  .cccc .eqe{
    color: rgb(104, 114, 140) !important;
    font-weight: 700;
  }
  .cccc .base-coupons,.hhh .base-coupons{
    width: 250px;
    height: 100px;
    position: relative;
    background: radial-gradient(circle at right top, transparent 10px,  #EDEDED 0) top left / 60px 51% no-repeat,
    radial-gradient(circle at right bottom, transparent 10px, #EDEDED 0) bottom left /60px 51% no-repeat,
    radial-gradient(circle at left top, transparent 10px, #EDEDED 0) top right /190px 51% no-repeat,
    radial-gradient(circle at left bottom, transparent 10px, #EDEDED 0) bottom right /190px 51% no-repeat;
    filter: drop-shadow(3px 3px 3px rgba(0,0,0,.3));
  }

  .cccc .base-coupons::before,.hhh .base-coupons::before{
    content: '';
    height: 80px;
    border: 1px dashed #000000;
    position: absolute;
    left: 60px;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  .cccc .base-coupons::after,.hhh .base-coupons::after{
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
        backAmount:0,
        message:null,
        chhhoseRow:{},
        sendGoodVible:false,
        count:0,
        chooseRow: {},
        goodCoupon:false,
        loading:false,
        shopCoupon:[],
        goodsDetails:[],
        payOrder:{
          message:null,
          backAmount:null,
          orderId:null,
          userId:null,
        },
      }
    },
    methods:{
      //手动退款
      sendGood(row){
        this.chhhoseRow = row;
        this.sendGoodVible = true;
      },
      openGoodsCoupon(row){
        this.goodCoupon = true;
        this.chooseRow = row;
        this.count = row.coupon.length;
      },
      gotoGoods(row){
        //跳转至商品页面
        this.$router.push({
          name:'商品',
          query:{
            goodsId: row.goodsId,
            shopId: row.shopId
          }
        });
      },
      //初始化
      init(){

      },
      reflash(){
        this.$emit('www');
        this.sendGoodVible = false;
      },
      sendMessage(){
        this.payOrder.orderId = this.row.orderId;
        this.payOrder.message = this.message;
        this.payOrder.userId = this.row.userId;
        this.payOrder.backAmount = this.backAmount;
        this.$http.post('/order/backAmount',this.payOrder)
          .then(res => {
            if (res.code === 10000) {
              this.$message.success("退款成功");
              this.reflash();
            }
          });
      },
      getAll(orderId){
        this.loading = true
        this.$http.get('/orderDetail/getAllDetails?orderId=' + orderId)
          .then(res => {
            if (res.code === 10000) {
              this.shopCoupon = res.data.coupon;
              this.goodsDetails = res.data.orderAndCoupons;
              this.loading = false
            }
          });
      },
      close() {
        this.$emit('close');
      },
      //表头样式
      getHeadClass(){
        return ' color: #68728c!important;\n' +
          '    font-weight: 700;'+
          'background: #FCFDFF'
      },
    },
    mounted() {
      this.init();
    },
    props:{
      goodsDetailsVisible:Boolean,
      row:Object,
    },
  }
</script>
