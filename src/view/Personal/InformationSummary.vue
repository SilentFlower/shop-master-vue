<!--信息汇总-->
<template>
  <el-row class="InformationSummary">
<!--  账户总览 -->
    <el-row style="padding: 30px 30px 30px 60px;border-bottom: 2px solid #F0F5FF">
<!--      昵称-->
      <el-row>
        <div>
          <span class="bll">{{firstName}}</span>
          <span class="name">{{userName}}</span>
        </div>
      </el-row>
      <el-row style="margin-top: 30px;height: 100px">
        <el-col :span="6">
          <el-col :span="6">
            <img style="margin-top: 5px" src="/static/money.png" alt="">
          </el-col>
          <el-col :span="7">
            <div class="mm">{{wallet.balance}}</div>
            <div class="mm2">账户余额</div>
          </el-col>
          <el-col :span="6" style="background-image: url('static/moneyBG.png')">
            <el-button round style="margin-top: 40px" @click="gotoWithdraw">提现</el-button>
          </el-col>
        </el-col>
        <el-col :span="4">
          <el-badge :value="unpaid" type="primary">
            <el-button @click="findUnpaid" icon="el-icon-hot-water" style="padding:  0 0 0 0;border: none;font-size: 24px;font-weight: bold;background:none;">
              <span style="font-size: 14px">待付款</span>
            </el-button>
          </el-badge>
        </el-col>
        <el-col :span="4">
          <el-badge :value="ship" type="primary">
            <el-button @click="findShip" icon="el-icon-shopping-cart-full" style="padding:  0 0 0 0;border: none;font-size: 24px;font-weight: bold;background:none;">
              <span style="font-size: 14px">待发货</span>
            </el-button>
          </el-badge>
        </el-col>
        <el-col :span="4">
          <el-badge :value="sure" type="primary">
            <el-button @click="findSure" icon="el-icon-thumb" style="padding:  0 0 0 0;border: none;font-size: 24px;font-weight: bold;background:none;">
              <span style="font-size: 14px">待确认</span>
            </el-button>
          </el-badge>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col class="mm3">
          <div>{{wallet.todaySEarnings}}</div>
          <div>今日收入</div>
        </el-col>
        <el-col class="mm3">
          <div>{{wallet.spendToday}}</div>
          <div>今日支出</div>
        </el-col>
        <el-col class="mm3">
          <div>{{wallet.orderToday}}</div>
          <div>今日成交订单</div>
        </el-col>
        <el-col class="mm3">
          <div>{{wallet.totalTradedOrders}}</div>
          <div>总成交订单</div>
        </el-col>
        <el-col class="mm3">
          <div>{{wallet.walletIncome}}</div>
          <div>总收入</div>
        </el-col>
        <el-col class="mm3">
          <div>{{wallet.walletOutcome}}</div>
          <div>总支出</div>
        </el-col>
      </el-row>
    </el-row>
<!--    销售与订单统计 -->
    <el-row style="padding: 30px 30px 30px 60px;border-bottom: 2px solid #F0F5FF">
      <div id="app">
        <v-chart ref="chart" class="my-chart" :options="bar" :theme="theme" :manual-update="false"/>
      </div>
    </el-row>
<!-- 订单 -->
    <el-row style="padding: 30px 30px 30px 60px;height: 800px">
      <el-row>
        <div class="mm4">最近订单</div>
      </el-row>
      <el-row style="margin-top: 30px">
        <el-tabs type="card" @tab-click="handleClick">
          <el-tab-pane label="购买订单" >
            <el-card style="display: flex">
              <el-form :inline="true" style="float: left">
                <el-form-item>
                  <el-input v-model="inputStr" placeholder="请输入对应关键字" clearable @change="inputChange">
                    <template slot="prepend">
                      <i class="el-icon-search"></i>
                      <el-select  v-model="queryParam" style="width: 100px;margin-left: 1px">
                        <el-option label="订单ID" value="orderId">
                        </el-option>
                        <el-option label="商家店铺名" value="shopName">
                        </el-option>
                        <el-option label="包含的商品名" value="goodSName">
                        </el-option>
                      </el-select>
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item label="订单状态">
                  <el-select  v-model="orderQueryForm.data.status" style="width: 100px;margin-left: 1px">
                    <el-option label="所有" :value="null">
                    </el-option>
                    <el-option label="取消" :value="0">
                    </el-option>
                    <el-option label="待支付" :value="1">
                    </el-option>
                    <el-option label="待发货" :value="2">
                    </el-option>
                    <el-option label="待确认" :value="6">
                    </el-option>
                    <el-option label="完成" :value="5">
                    </el-option>
                    <el-option label="申诉" :value="4">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <el-button class="mm5" @click="getOrderBuy">查询</el-button>
            </el-card>
            <el-table
              v-loading="loading"
              :data="orderTable1"
              @row-click="getDetails"
              :header-cell-style="getHeadClass"
              border
              style="width: 100%;margin-top: 20px">
              <el-table-column
                prop="orderId"
                label="订单ID"
                width="300">
              </el-table-column>
              <el-table-column
                prop="shopName"
                label="商家名"
                width="250">
              </el-table-column>
              <el-table-column
                prop="payAmount"
                label="总金额"
                width="180">
              </el-table-column>
              <el-table-column
                prop="statusStr"
                label="订单状态"
                width="180">
              </el-table-column>
              <el-table-column
                prop="dataCreateTime"
                label="创建时间">
                <template slot-scope="scope">
                  {{$date.format(new Date(scope.row.dataCreateTime))}}
                </template>
              </el-table-column>
              <el-table-column
                label="操作">
                <template slot-scope="scope">
                  <el-button v-if="scope.row.status == 5" type="primary" size="mini" @click.stop="appealOrder(scope.row)">申诉</el-button>
                  <el-button v-if="scope.row.status == 6" type="primary" size="mini" @click.stop="confirmOrder(scope.row)">订单确认</el-button>
                  <el-button v-if="scope.row.status == 1" type="primary" size="mini" @click.stop="openPayOrder(scope.row)">付款</el-button>
                </template>
              </el-table-column>
              <template slot="empty">
                <div style="margin-top: 40px"><img src="static/none_data.bc96383.png" width="131" height="102"></div>
                <div class="mm6">暂无相关数据</div>
              </template>
            </el-table>
            <div class="block">
              <el-pagination
                @size-change="getOrderBuy"
                @current-change="getOrderBuy"
                :current-page.sync="orderQueryForm.pageNumber"
                :page-sizes="[10, 20, 50, 100]"
                :page-size.sync="orderQueryForm.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="售出订单">
            <el-card style="display: flex">
              <el-form :inline="true" style="float: left">
                <el-form-item>
                  <el-input v-model="inputStr2" placeholder="请输入对应关键字" clearable @change="inputChange2">
                    <template slot="prepend">
                      <i class="el-icon-search"></i>
                      <el-select  v-model="queryParam2" style="width: 100px;margin-left: 1px">
                        <el-option label="订单ID" value="orderId">
                        </el-option>
                        <el-option label="商家店铺名" value="shopName">
                        </el-option>
                        <el-option label="包含的商品名" value="goodSName">
                        </el-option>
                      </el-select>
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item label="订单状态">
                  <el-select  v-model="orderQueryForm2.data.status" style="width: 100px;margin-left: 1px">
                    <el-option label="所有" :value="null">
                    </el-option>
                    <el-option label="取消" :value="0">
                    </el-option>
                    <el-option label="待支付" :value="1">
                    </el-option>
                    <el-option label="待发货" :value="2">
                    </el-option>
                    <el-option label="待确认" :value="6">
                    </el-option>
                    <el-option label="完成" :value="5">
                    </el-option>
                    <el-option label="申诉" :value="4">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <el-button class="mm5" @click="getOrderBuy2">查询</el-button>
            </el-card>
            <el-table
              v-loading="loading2"
              :data="orderTable2"
              @row-click="getDetails"
              :header-cell-style="getHeadClass"
              border
              style="width: 100%;margin-top: 20px">
              <el-table-column
                prop="orderId"
                label="订单ID"
                width="300">
              </el-table-column>
              <el-table-column
                prop="shopName"
                label="商家名"
                width="250">
              </el-table-column>
              <el-table-column
                prop="payAmount"
                label="总金额"
                width="180">
              </el-table-column>
              <el-table-column
                prop="statusStr"
                label="订单状态"
                width="180">
              </el-table-column>
              <el-table-column
                prop="dataCreateTime"
                label="创建时间">
                <template slot-scope="scope">
                  {{$date.format(new Date(scope.row.dataCreateTime))}}
                </template>
              </el-table-column>
              <el-table-column
                label="操作">
                <template slot-scope="scope">
                  <el-button v-if="scope.row.status == 2" type="primary" size="mini" @click.stop="openDetails(scope.row)">发货</el-button>
                </template>
              </el-table-column>
              <template slot="empty">
                <div style="margin-top: 40px"><img src="static/none_data.bc96383.png" width="131" height="102"></div>
                <div class="mm6">暂无相关数据</div>
              </template>
            </el-table>
            <div class="block">
              <el-pagination
                @size-change="getOrderBuy2"
                @current-change="getOrderBuy2"
                :current-page.sync="orderQueryForm2.pageNumber"
                :page-sizes="[10, 20, 50, 100]"
                :page-size.sync="orderQueryForm2.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total2">
              </el-pagination>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-row>
    </el-row>
    <goodsDetail :label="label" ref="ggo" :goodsDetailsVisible="goodsDetailsVisible" :row="chooseRow" @close="closeDetails"></goodsDetail>
    <el-drawer
      :visible.sync="payVisible"
      size="40%"
      direction="rtl"
      append-to-body
      @close="payVisible = false">
      <template slot="title">
        <el-row style="border-bottom: 2px solid #F7F7F7;padding-bottom: 10px">
          <span style="font-weight: 500;font-size: 16px;color: #000000">商品优惠券</span>
        </el-row>
      </template>
      <el-row style="margin-top: 10px;padding-right: 10px">
        <el-row style="padding-left:20px;padding-right: 20px;padding-bottom:10px;border-bottom: 2px solid #F7F7F7">
          <el-form
            label-position="top"
            :model="payOrder"  label-width="80px"
          >
            <el-row class="cdqwdwq1">
              <el-form-item>
                <template slot="label">
                  <span>支付类型</span>
                </template>
                <el-col :span="14">
                  <el-radio-group v-model="payOrder.payType">
                    <el-radio-button label="0">钱包支付</el-radio-button>
                    <el-radio-button label="1">其他支付</el-radio-button>
                  </el-radio-group>
                </el-col>
              </el-form-item>
            </el-row>
            <el-row class="cdqwdwq1">
              <el-form-item>
                <template slot="label">
                  <span>钱包余额</span>
                </template>
                <el-col :span="14">
                  <span v-if="payOrder.payType == 0">￥{{wallet.balance}}</span>
                </el-col>
              </el-form-item>
            </el-row>
            <el-row class="cdqwdwq1">
              <el-form-item>
                <template slot="label">
                  <span>支付金额</span>
                </template>
                <el-col :span="14">
                  <span v-if="ccchoseRow != undefined">￥{{ccchoseRow.payAmount}}</span>
                </el-col>
              </el-form-item>
            </el-row>
          </el-form>
        </el-row>
        <el-row style="margin-left: auto;display: flex;margin-right: 20px;margin-top: 20px;justify-content: flex-end">
          <el-button @click="payVisible = false">
            取消
          </el-button>
          <el-button type="primary" @click="pay">
            提交
          </el-button>
        </el-row>

      </el-row>
    </el-drawer>
  </el-row>
</template>
<style>
  .cdqwdwq1{
    color: #3b5998;
    font-weight: 600;
    font-family: Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
  }

  .InformationSummary .mm6{
    width: 100%;
    text-align: center;
    line-height: 64px;
    font-size: 14px;
    font-weight: 400;
    color: #a2a9ba;
  }
  .InformationSummary .mm5{
    background: #386cfa;
    border-radius: 4px;
    color: #fff;
    text-align: center;
    margin-left: 9px;
    font-weight: 700;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .InformationSummary .bll{
    width: 30px;
    height: 30px;
    float: left;
    text-align: center;
    line-height: 30px;
    font-weight: 500;
    font-size: 14px;
    background: linear-gradient(72deg,#2a62ff,#4d7af3);
    border-radius: 4px;
    color: #fff;
  }
  .InformationSummary .name{
    margin-top: 8px;
    float: left;
    font-size: 18px;
    font-weight: 700;
    color: #5d6494;
    margin-left: 13px;
  }

  .InformationSummary .mm{
  display: block;
  font-size: 30px;
  color: #2a62ff;
  font-weight: 700;
  }

  .InformationSummary .mm2{
    font-weight: 500;
    font-size: 15px;
    color: #a2a9ba;
  }
  .InformationSummary .mm3{
    border-right: 2px solid #6883c7;
  }
  .InformationSummary .mm3 div:first-child {
    color: #68728c;
    font-weight: 700;
    font-size: 30px;
    display: block;
  }
  .InformationSummary .mm3 div:nth-child(2) {
    font-weight: 500;
    font-size: 15px;
    color: #a2a9ba;
  }
  .InformationSummary .my-chart {
    width: 800px;
    height: 500px;
  }
  .InformationSummary .mm4{
    float: left;
    display: inline-block;
    font-size: 18px;
    font-weight: 800;
    color: #68728c;
  }
</style>
<script>
  import ECharts from "vue-echarts/components/ECharts";
  import "echarts/theme/customed"
  import "echarts/lib/chart/bar";
  import goodsDetail from "../../components/goods/goodsDetail";
  import cropUpload from "../../components/upload/crop-upload";
  export default {
    components: {
      "v-chart": ECharts,
      goodsDetail,
    },
    data() {
      return {
        ccchoseRow:null,
        payVisible:false,
        payOrder:{
          orderId:null,
          payType:1,
        },
        label:'购买订单',
        chooseRow:null,
        goodsDetailsVisible: false,
        //带确认
        sure:null,
        //待发货
        ship:null,
        //未付款个数
        unpaid:null,
        //用户名
        userName:"",
        //截取的第一个字符
        firstName:"",
        //图表数据
        picTable:[
          {
            submitOrders:0,
            successfulOrder:0,
            outcome:0.00,
            income:0.00,
            orderTime:'2021-5-20 19:30:00'
          }
        ],
        //钱包
        wallet:{
          balance:0.00,//余额
          balanceDisable:0.00,//冻结金额
          walletIncome:0.00,//总收入
          walletOutcome:0.00,//总支出
          todaySEarnings:0.00,//今日收入
          spendToday:0.00,//今日支出
          orderToday:0,//今日订单
          totalTradedOrders:0,//总成交订单
        },
        //输入框填写的内容
        loading:false,
        inputStr:null,
        loading2:false,
        inputStr2:null,
        //订单表的参数
        total:0,
        total2:0,
        orderQueryForm:{
          pageSize:10,
          pageNumber:1,
          data: {
            //可传值
            orderId: null, //订单ID
            status: null, //订单状态
            shopName: null, //商家店铺名
            goodSName: null, //包含的商品名
            shopId: null, //商家ID
            userId: null, //用户ID
          }
        },
        orderQueryForm2:{
          pageSize:10,
          pageNumber:1,
          data: {
            //可传值
            orderId: null, //订单ID
            status: null, //订单状态
            shopName: null, //商家店铺名
            goodSName: null, //包含的商品名
            shopId: null, //商家ID
            userId: null, //用户ID
          }
        },
        orderTable1:[],
        orderTable2:[],
        queryParam:'orderId',
        queryParam2:'orderId',
        theme:'customed',
        bar: {
          title: {
            text: "销量统计"
          },
          tooltip: {},
          legend: {
            data: ["提交订单","成功订单","支出","收入"]
          },
          xAxis: {
            data: ["时间0", "时间1", "时间2", "时间3", "时间4", "时间5"]
          },
          yAxis: [{
            type: 'value',
            name: '订单数',
            min: function(value){
              return value.min;
            },
            max:function(value){
              return value.max+(value.max/2);
            },
            axisLabel: {
              formatter: '{value}',
            },
          }, {
            type: 'value',
            name: '金额',
            min: function(value){
              return value.min;
            },
            max:function(value){
              return value.max+(value.max/2);
            },
            axisLabel: {
              formatter: '{value}K',
            },
          }],
          series: [
            {
              name: "提交订单",
              type: "bar",
              yAxisIndex: 0,
              data: [10, 20, 36, 10, 10, 20]
            },
            {
              name: "成功订单",
              type: "bar",
              yAxisIndex: 0,
              data: [5, 20, 36, 10, 10, 20]
            },
            {
              name: "支出",
              type: "bar",
              yAxisIndex: 1,
              data: [5, 20, 36, 10, 10, 20]
            },
            {
              name: "收入",
              type: "bar",
              yAxisIndex: 1,
              data: [5, 20, 36, 10, 10, 20]
            }
          ]
        }
      };
    },
    mounted() {
      this.init();
    },
    methods:{
      findNumber(){
        this.findUnpaidNumber();
        this.findshipNumber();
        this.findsureNumber();
        this.$emit("updateMessage");
      },
      openPayOrder(row){
        this.payVisible = true
        this.ccchoseRow = row
      },
      payMyOrder(){
        this.payOrder.orderId = this.ccchoseRow.orderId;
        this.$http.post('/order/payOrder', this.payOrder)
          .then(res => {
            if (res.code === 10000) {
              this.$message.success("支付成功");
              this.payVisible = false
              this.getOrderBuy();
              this.findNumber();
            }
          })
      },
      pay(){
        if (this.ccchoseRow.payAmount <= this.wallet.balance) {
          this.payMyOrder()
        }else if (this.payOrder.payType == 1) {
          this.payMyOrder()
        } else {
          this.$message.error("账户余额不足");
        }
      },
      confirmOrder(row){
        this.payOrder.orderId = row.orderId;
        this.$http.post('/order/confirmOrder', this.payOrder)
          .then(res => {
            if (res.code === 10000) {
              this.$message.success("确认成功");
              this.getOrderBuy()
            }
          });
      },
      appealOrder(row){
        this.payOrder.orderId = row.orderId;
        this.$http.post('/order/appealOrder', this.payOrder)
          .then(res => {
            if (res.code === 10000) {
              this.$message.success("申诉中");
              this.getOrderBuy()
            }
          });
      },
      closeDetails(){
        this.goodsDetailsVisible = false;
      },
      getDetails(row, column, event){
        this.chooseRow = row;
        this.goodsDetailsVisible = true;
        this.$refs.ggo.getAll(row.orderId);
      },
      //初始化
      init(){
        //加载时候调用钱包方法
        this.getWallet();
        //设置用户ID
        this.userName = this.$auth.getUser().username;
        this.firstName = this.userName.slice(0,1)
        //首次加载自动调用
        this.getOrderBuy();
        this.findNumber();
      },
      openDetails(row){
        this.getDetails(row);
      },
      getTables(){
        document.documentElement.scrollTop = 9999;
        if (this.label == '售出订单') {
          this.getOrderBuy2();
        }else if(this.label == '购买订单'){
          this.getOrderBuy();
        }
      },
      findSure(){
        this.orderQueryForm.data.status = 6
        this.orderQueryForm2.data.status = 6
        this.getTables()
      },
      findShip(){
        this.orderQueryForm.data.status = 2
        this.orderQueryForm2.data.status = 2
        this.getTables()
      },
      //寻找未付款的
      findUnpaid(){
        this.orderQueryForm.data.status = 1
        this.orderQueryForm2.data.status = 1
        this.getTables()
      },
      findUnpaidNumber(){
        this.$http.get('/order/getNumberByStatus?status=1')
          .then(res => {
            if (res.code === 10000) {
              if (res.data === 0) {
                this.unpaid = null;
              }else{
                this.unpaid = res.data;
              }
            }
          });

      },
      findshipNumber(){
        this.$http.get('/order/getNumberByStatus?status=2')
          .then(res => {
            if (res.code === 10000) {
              if (res.data === 0) {
                this.ship = null;
              }else{
                this.ship = res.data;
              }
            }
          });
      },
      findsureNumber(){
        this.$http.get('/order/getNumberByStatus?status=6')
          .then(res => {
            if (res.code === 10000) {
              if (res.data === 0) {
                this.sure = null;
              }else{
                this.sure = res.data;
              }
            }
          });
      },
      //提现检查
      gotoWithdraw(){
        //跳转至提现页面
        this.$router.push({
          name: '提现'
        });
      },
      //tab点击事件
      handleClick(tab, event){
        if (tab.label == '售出订单') {
          this.label = '售出订单';
          this.getOrderBuy2();
        }else if(tab.label == '购买订单'){
          this.label = '购买订单';
          this.getOrderBuy();
        }
      },
      //访问统计图表
      getOrderStatisticsForPic(){
        this.$http.get("/order/getStatisticsForPic")
          .then(res => {
            this.picTable = res.data;
            for (let i = 0; i < 6; i++) {
              //提交订单
              this.$set(this.bar.series[0].data,i,this.picTable[i].submitOrders)
              //成功订单
              this.$set(this.bar.series[1].data,i,this.picTable[i].successfulOrder)
              //支出
              this.$set(this.bar.series[2].data,i,this.picTable[i].outcome/1000)
              //收入
              this.$set(this.bar.series[3].data,i,this.picTable[i].income/1000)
              //设置时间
              this.$set(this.bar.xAxis.data,i,this.$date.format(new Date(this.picTable[i].orderTime),'MM-dd'))
            }
          });
      },
      //访问统计数据
      getOrderStatistics(){
        this.$http.get("/order/getOrdersByIdForSum")
          .then(res => {
            this.wallet.todaySEarnings = res.data.todaySEarnings
            this.wallet.spendToday = res.data.spendToday
            this.wallet.totalTradedOrders = res.data.totalTradedOrders
            this.wallet.orderToday = res.data.orderToday
          });
      },
      //访问钱包数据
      getWallet(){
        this.getOrderStatistics()
        //调用图表接口
        this.getOrderStatisticsForPic()
        this.$http.get("/wallet/getWallet")
          .then(res => {
            if (res.code === 10000) {
              this.wallet.balance = res.data.balance
              this.wallet.walletOutcome = res.data.walletOutcome
              this.wallet.walletIncome = res.data.walletIncome
            }
          });
      },
      //条件输入变化
      inputChange(){
        //清空其他条件
        this.orderQueryForm.data.goodSName = null;
        this.orderQueryForm.data.orderId = null;
        this.orderQueryForm.data.shopName = null;
        this.orderQueryForm.data[this.queryParam] = this.inputStr;
      },
      inputChange2(){
        //清空其他条件
        this.orderQueryForm2.data.goodSName = null;
        this.orderQueryForm2.data.orderId = null;
        this.orderQueryForm2.data.shopName = null;
        this.orderQueryForm2.data[this.queryParam] = this.inputStr;
      },
      //访问订单列表
      getOrderBuy2(){
        this.orderQueryForm2.data.shopId = this.$auth.getUser().id;
        this.loading2 = true
        this.$http.post('/order/getOrdersByIdAndTime', this.orderQueryForm2)
          .then(res => {
            if (res.code === 10000) {
              let datas = res.data.list;
              for (let i in datas) {
                if(datas[i].status === 0){
                  datas[i].statusStr = '取消'
                }else if(datas[i].status === 1){
                  datas[i].statusStr = '待付款'
                }else if(datas[i].status === 2){
                  datas[i].statusStr = '待发货'
                }else if(datas[i].status === 4){
                  datas[i].statusStr = '申诉中'
                }else if(datas[i].status === 5){
                  datas[i].statusStr = '完成'
                }else if(datas[i].status === 3){
                  datas[i].statusStr = '删除'
                }else if(datas[i].status === 6){
                  datas[i].statusStr = '待确认'
                }
              }
              this.orderTable2= datas;
              this.total2 = res.data.total;
            }
            this.loading2 = false
          });
      },
      getOrderBuy(){
        let id = this.$auth.getUser().id;
        this.orderQueryForm.data.userId = id;
        this.loading = true
        this.$http.post('/order/getOrdersByIdAndTime', this.orderQueryForm)
          .then(res => {
            if (res.code === 10000) {
              let datas = res.data.list;
              for (let i in datas) {
                if(datas[i].status === 0){
                  datas[i].statusStr = '取消'
                }else if(datas[i].status === 1){
                  datas[i].statusStr = '待付款'
                }else if(datas[i].status === 2){
                  datas[i].statusStr = '待发货'
                }else if(datas[i].status === 4){
                  datas[i].statusStr = '申诉中'
                }else if(datas[i].status === 5){
                  datas[i].statusStr = '完成'
                }else if(datas[i].status === 3){
                  datas[i].statusStr = '删除'
                }else if(datas[i].status === 6){
                  datas[i].statusStr = '待确认'
                }
              }
              this.orderTable1 = datas;
              this.total = res.data.total;
            }
            this.loading = false
          });
      },
      //表头样式
      getHeadClass(){
        return ' color: #68728c!important;\n' +
              '    font-weight: 700;'+
          'background: rgba(244,247,254,.25);'
      }
    },
  }
</script>
