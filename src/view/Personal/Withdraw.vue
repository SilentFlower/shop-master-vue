<!--提现页面-->
<template>
  <el-row class="withdraw">
    <el-row style="border-bottom: 2px solid #F4F7FE;padding-bottom: 20px">
      <el-row style="float: left">
        <span class="tit">申请提现</span>
        <el-button class="setting" @click="editWithdraw">提现设置</el-button>
        <el-button class="setting" @click="openDialog" type="success">记录查询</el-button>
      </el-row>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-alert
        title="请在9:00-21:00之间申请结算，其他时间可能不能及时到账"
        type="info"
        show-icon>
      </el-alert>
    </el-row>
    <el-row style="border-bottom: 2px solid #F4F7FE;padding-bottom: 40px;margin-top: 30px">
      <el-row style="float: left;width: 500px" type="flex">
        <el-col>
          <el-row>
            <i class="el-icon-money" style="font-size: 36px">
            </i>
            <span class="ww1">账户余额</span>
          </el-row>
          <el-row class="ww2">{{wallet.balance}}</el-row>
        </el-col>
        <el-col>
          <el-row>
            <i class="el-icon-loading" style="font-size: 36px"></i>
            <span class="ww1">冻结余额</span>
          </el-row>
          <el-row class="ww2">{{wallet.balanceDisable}}</el-row>
        </el-col>
      </el-row>
    </el-row>
    <el-row style="margin-top: 30px;padding-left: 55px">
      <el-row>
        <span style="float: left" class="ww3">申请提现（提现金额只能为整数）</span>
      </el-row>
      <el-row style="margin-top: 15px">
        <el-input v-model="withdraw" @input="changeInput" placeholder="输入提现金额(整数)" type="text" style="width: 400px;float: left">
        </el-input>
      </el-row>
      <el-row style="margin-top: 15px">
        <span style="float: left" class="ww4">不足100元扣费2元,超过部分每100元扣费2元,最低申请结算10元</span>
      </el-row>
      <el-row style="margin-top: 15px">
        <el-button :disabled="withdrawButton"
                   ref="withdrawBt1"
                   style="float: left"
                   :class="{'bb2':withdrawButton,'bb1':!withdrawButton}"
                   class="ww5"
                   @click="startWithdraw"
        >提现</el-button>
      </el-row>
    </el-row>
    <withdrawInfo ref="withdraw" :withdrawVisible="withdrawVisible" @getWithdrawPre="getWithdrawPre" @close="closeWithdraw"/>

    <el-dialog :visible.sync="detailVisable" v-if="detailVisable">
      <div slot="title" class="dialogTitle">
        提现记录
      </div>
      <el-row>
        <el-card >
          <el-form  :inline="true" style="float: left">
            <el-form-item label="提现状态" label-width="80px">
              <el-select v-model="withFlowForm.data.walletFlowStatus" clearable filterable @change="getWithFlow">
                <el-option label="所有" :value="null"/>
                <el-option label="完成" :value="1" />
                <el-option label="进行中" :value="0"/>
                <el-option label="失败" :value="-1"/>
              </el-select>
            </el-form-item>
          </el-form>
        </el-card>
        <el-table
          v-loading="loading"
          :data="withFlowTable"
          :header-cell-style="getHeadClass"
          border
          style="width: 100%;margin-top: 20px">
          <el-table-column
            prop="walletFlowId"
            label="流水号">
          </el-table-column>
          <el-table-column
            prop="walletFlowFee"
            label="提现金额">
          </el-table-column>
          <el-table-column
            prop="walletFlowBalance"
            label="剩余金额">
          </el-table-column>
          <el-table-column
            prop="walletFlowStatusStr"
            label="提现状态">
          </el-table-column>
          <el-table-column
            prop="withdrawType"
            label="提现方式">
          </el-table-column>
          <el-table-column
            prop="walletFlowDate"
            label="提现时间">
            <template slot-scope="scope">
              {{$date.format(scope.row.walletFlowDate)}}
            </template>
          </el-table-column>
          <template slot="empty">
            <div style="margin-top: 40px"><img src="static/none_data.bc96383.png" width="131" height="102"></div>
            <div class="mm6">暂无相关数据</div>
          </template>
        </el-table>
        <div class="block">
          <el-pagination
            @size-change="getWallet"
            @current-change="getWallet"
            :current-page.sync="withFlowForm.pageNumber"
            :page-sizes="[10, 20, 50, 100]"
            :page-size.sync="withFlowForm.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button @click="detailVisable = false">关闭</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>
<style>
  .withdraw {
    padding: 20px 50px 20px 50px;
  }
  .withdraw .tit {
    width: 95%;
    font-size: 21px;
    font-weight: 700;
    color: #68728c;
    padding: 29px 13px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-bottom: -2px;
  }
  .withdraw .setting{
    margin-left: 50px;
    font-weight: 700;
    font-size: 14px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    height: 34px;
    width: 100px;
    color: #fff;
    background: #386cfa;
    border: none;
    border-radius: 6px;
  }
  .withdraw .ww1{
    vertical-align: middle;
    display: inline-block;
    color: #a2a9ba;
    font-size: 15px;
    font-weight: 500;
    margin-left: 16px;
  }
  .withdraw .ww2{
    display: block;
    margin-top: 20px;
    margin-left: 50px;
    color: #68728c;
    font-size: 30px;
    font-weight: 700;
    margin-top: 14px;
    text-indent: 51px;
  }
  .withdraw .ww3{
    margin-left: 13px;
    font-weight: 700;
    color: #68728c;
    font-size: 14px;
  }
  .withdraw .ww4{
    font-size: 12px;
    font-weight: 500;
    color: #a2a9ba;
  }
  .withdraw .ww5{
    font-weight: 700;
    width: 167px;
    border-radius: 5px;
    height: 50px;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    cursor: pointer;
    font-weight: 700;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    transition: background .8s;
  }
  .withdraw .bb2{
    color: #fff;
    background: #b7c3cd;
    border-radius: 5px;
  }
  .withdraw .bb1{
    color: #fff;
    background: #386cfa;
    border-radius: 5px;
  }
</style>
<script>
  import withdrawInfo from "../../components/form/withdrawInfo"
  export default {
    data() {
      return {
        //流水记录
        loading:false,
        total:0,
        withFlowTable:[],
        withFlowForm:{
          pageNumber:1,
          pageSize:10,
          data:{
            walletFlowType:2,
            walletFlowStatus:1,
          }
        },
        withdrawForm: {
          userId: null,
          withdrawType: null,//类别
          withdrawName: null,//支付宝名
          withdrawAccount: null//支付宝账号
        },
        detailVisable:false,
        //提现金额
        withdraw:null,
        withdrawButton: true,
        withdrawVisible:false,
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
      }
    },
    mounted() {
      this.getWithdrawPre();
      this.getWallet();
    },
    methods:{
      //访问钱包数据
      getWallet(){
        this.$http.get("/wallet/getWallet")
          .then(res => {
            if (res.code === 10000) {
              this.wallet = res.data
            }
          });
      },
      //查询提现记录
      getWithFlow(){
        this.loading = true
        this.$http.post('/walletFlow/getWalletFlowByPage', this.withFlowForm)
          .then(res => {
            if (res.code === 10000) {
              let datas = res.data.list
              for (let i in datas) {
                if (datas[i].walletFlowStatus === 0) {
                  datas[i].walletFlowStatusStr = '进行中'
                }else if(datas[i].walletFlowStatus === 1){
                  datas[i].walletFlowStatusStr = '提现完成'
                }else if(datas[i].walletFlowStatus === -1){
                  datas[i].walletFlowStatusStr = '提现失败'
                }
              }
              this.withFlowTable = datas
              this.total = res.data.total
              this.loading = false
            }
          });
      },
      //打开记录的dialog
      openDialog(){
        this.getWithFlow()
        this.detailVisable = true
      },
      //开始提现
      startWithdraw(){
        this.$http.post('/walletFlow/withdraw', {walletFlowFee: this.withdraw})
          .then(res => {
            if (res.code === 10000) {
              this.$message.success("提现进行中");
              this.getWallet();
            }else{
              this.$message.error(res.message);
            }
          });
      },
      //获取提现信息
      getWithdrawInfo(){
        this.$http.get('/withdraw/getWithdraw')
          .then(res => {
            if (res.code === 10000) {
              this.withdrawForm = res.data;
              this.$refs.withdraw.setWithdrawInfo(this.withdrawForm);
              this.withdrawVisible = true;
            }
          });
      },
      //设置提现方式
      editWithdraw(){
        this.getWithdrawInfo();
      },
      //提现预检查
      getWithdrawPre(){
        this.$http.get('/walletFlow/withdrawPre')
          .then(res => {
            if (res.code === 10000) {
              //如果未补全，则弹出dialog来实现补全
              if (res.data != '正常') {
                this.withdrawVisible = true;
              }
            }
          });
      },
      //关闭补全对话框
      closeWithdraw(){
        this.withdrawVisible = false;
      },
      //输入框变化时候
      changeInput() {
        let numReg = /^[1-9]\d*$/;
        let numRe = new RegExp(numReg)
        if (!numRe.test(this.withdraw)) {
          this.$message.error("请输入整数")
          this.withdrawButton = true
        }else{
          this.withdrawButton = false
        }
      },
      //表头样式
      getHeadClass(){
        return ' color: #68728c!important;\n' +
          '    font-weight: 700;'+
          'background: rgba(244,247,254,.25);'
      }
    },
    components:{
      withdrawInfo
    }

  }
</script>

