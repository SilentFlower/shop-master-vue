<!--交易记录-->
<template>
  <el-row class="TransactionRecord" style="padding: 30px 30px 30px 60px;height: 800px">
    <el-row>
      <div class="mm4">交易记录</div>
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
                <el-option label="支付中" :value="1">
                </el-option>
                <el-option label="支付完成" :value="2">
                </el-option>
                <el-option label="申诉中" :value="4">
                </el-option>
                <el-option label="完成" :value="5">
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
            label="订单ID"
            width="300">
          </el-table-column>
          <el-table-column
            prop="orderId"
            label="交易类型"
            width="150">
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
    </el-row>
  </el-row>
</template>
<style>
  .TransactionRecord .mm4{
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
        //输入框填写的内容
        loading:false,
        inputStr:null,
        //订单表的参数
        total:0,
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
        orderTable1:[],
        queryParam:'orderId',
      };
    },
    mounted() {
      //首次加载自动调用
      this.getOrderBuy();
    },
    methods:{
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
        this.orderQueryForm.data.userId = id;
        this.orderQueryForm.data.shopId = id;
        this.loading = true
        this.$http.post('/order/getOrdersByIdAndTime', this.orderQueryForm)
          .then(res => {
            if (res.code === 10000) {
              this.orderTable1 = res.data.list;
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
