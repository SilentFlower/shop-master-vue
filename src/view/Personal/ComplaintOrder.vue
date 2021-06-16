<!--投诉管理-->
<template>
  <el-row class="ComplaintOrder" style="padding: 30px 30px 30px 60px;height: 800px">
    <el-row style="border-bottom: 2px solid #F4F7FE;padding-bottom: 20px">
      <div class="mm4">投诉管理</div>
    </el-row>
    <el-row style="margin-top: 30px;height: 100px;border-bottom: 2px solid #F4F7FE;
      padding-bottom: 20px">
      <el-col :span="6">
        <el-col :span="6">
          <img style="margin-top: 5px" src="/static/money.png" alt="">
        </el-col>
        <el-col :span="7">
          <div class="mm">{{num.frozenAmount}}</div>
          <div class="mm2">冻结账户</div>
        </el-col>
        <el-col :span="6" style="background-image: url('static/moneyBG.png')">
        </el-col>
      </el-col>
      <el-col :span="3" style="border-right: 2px solid #F4F7FE ">
        <div>
          <i class="el-icon-s-management" style="font-size: 35px"></i>
          <span>{{num.allNum}}</span>
        </div>
        <div>投诉总订单</div>
      </el-col>
      <el-col :span="3" style="border-right: 2px solid #F4F7FE  ">
        <div>
          <i class="el-icon-s-finance" style="font-size: 35px"></i>
          <span>{{num.processing}}</span>
        </div>
        <div>处理中订单</div>
      </el-col>
      <el-col :span="3" style="border-right: 2px solid #F4F7FE ">
        <div>
          <i class="el-icon-s-claim" style="font-size: 35px"></i>
          <span>{{num.done}}</span>
        </div>
        <div>已处理总订单</div>
      </el-col>
    </el-row>
    <el-row style="margin-top: 30px">
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
        :header-cell-style="getHeadClass"
        border
        style="width: 100%;margin-top: 20px">
        <el-table-column
          prop="orderId"
          label="订单ID">
        </el-table-column>
        <el-table-column
          prop="orderId"
          label="交易类型">
        </el-table-column>
        <el-table-column
          prop="shopName"
          label="商家名">
        </el-table-column>
        <el-table-column
          prop="payAmount"
          label="总金额">
        </el-table-column>
        <el-table-column
          prop="statusStr"
          label="订单状态">
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
            <el-button v-if="scope.row.appealFlag == 1 && scope.row.status == 4"  type="primary" size="mini" @click="openDetails(scope.row)">处理申诉</el-button>
            <el-button v-if="scope.row.appealFlag == 1 && scope.row.status == 4" type="danger" size="mini" @click="doneDetails(scope.row)">结束申诉</el-button>
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
          :current-page="orderQueryForm.pageNumber"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="orderQueryForm.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </el-row>
    <goodsDetail2 @www="www" ref="ccc" :goodsDetailsVisible="detailsVisible" :row="chooseRow" @close="closeDetails"/>
  </el-row>
</template>
<style>
  .ComplaintOrder .mm4{
    float: left;
    display: inline-block;
    font-size: 18px;
    font-weight: 800;
    color: #68728c;
  }
</style>
<script>
  import goodsDetail2 from "../../components/goods/goodsDetail2";
  export default {
    components:{
      goodsDetail2
    },
    data() {
      return {
        chooseRow:{},
        detailsVisible:false,
        //输入框填写的内容
        loading:false,
        inputStr:null,
        //订单表的参数
        total:0,
        num:{
          all:0,
          done:0,
          processing:0,
          frozenAmount:0,
        },
        orderQueryForm:{
          pageSize:10,
          pageNumber:1,
          data: {
            //可传值
            orderId: null, //订单ID
            status: 4, //订单状态
            shopName: null, //商家店铺名
            goodSName: null, //包含的商品名
            shopId: null, //商家ID
            userId: null, //用户ID
          }
        },
      payOrder:{
        orderId:null,
        userId:null,
      },
        orderTable1:[],
        queryParam:'orderId',
      };
    },
    mounted() {
      this.init();
    },
    methods:{
      closeDetails(){
        this.detailsVisible = false;
      },
      openDetails(row){
        this.chooseRow = row;
        this.detailsVisible = true;
        this.$refs.ccc.getAll(row.orderId);
      },
      doneDetails(row){
        this.payOrder.orderId = row.orderId;
        this.payOrder.userId = row.userId;
        this.$http.post('/order/appealOrderDone', this.payOrder)
          .then(res => {
            if (res.code === 10000) {
              this.$message.success("操作成功");
              this.www();
            }
          });
      },
      init(){
        this.getOrderBuy();
        this.getNum();
      },
      www(){
        this.detailsVisible = false;
        this.getOrderBuy();
        this.getNum();
      },
      getNum(){
        this.$http.get('/order/getAppealNum')
          .then(res => {
            if (res.code === 10000) {
              this.num = res.data;
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
      //访问订单
      getOrderBuy(){
        let id = this.$auth.getUser().id;
        this.orderQueryForm.data.shopId = id;
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
              this.orderTable1 = datas
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
