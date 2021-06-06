<!--资金变动 -->
<template>
  <el-row class="FundingChanges">
    <el-row style="border-bottom: 2px solid #F4F7FE;padding-bottom: 20px">
      <el-row style="float: left">
        <span class="tit">资金变动</span>
      </el-row>
      <el-row>
        <el-table
          :data="tableData"
          v-loading="tableState.loading"
          stripe
          :header-cell-style="getHeadClass"
          style="width: 100%">
          <template slot="">

          </template>
          <el-table-column
            label="流水号"
            prop="walletFlowId">
          </el-table-column>
          <el-table-column
            prop="walletFlowTypeStr"
            label="业务类型"
            width="180">
          </el-table-column>
          <el-table-column
            prop="walletFlowFee"
            label="涉及金额">
          </el-table-column>
          <el-table-column
            prop="walletFlowBalance"
            label="剩余余额">
          </el-table-column>
          <el-table-column
            prop="walletFlowDate"
            label="流水时间">
            <template slot-scope="scope">
              {{$date.format(new Date(scope.row.walletFlowDate))}}
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <div class="block">
        <el-pagination
          @size-change="getWithFlow"
          @current-change="getWithFlow"
          :current-page.sync="withFlowForm.pageNumber"
          :page-sizes="[10, 20, 50, 100]"
          :page-size.sync="withFlowForm.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </el-row>

  </el-row>
</template>
<style>
  .FundingChanges {
    padding: 20px 50px 20px 50px;
  }
  .FundingChanges .tit {
    width: 95%;
    font-size: 21px;
    font-weight: 700;
    color: #68728c;
    padding: 29px 13px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-bottom: -2px;
  }
  .FundingChanges .setting{
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
  .FundingChanges .ww1{
    vertical-align: middle;
    display: inline-block;
    color: #a2a9ba;
    font-size: 15px;
    font-weight: 500;
    margin-left: 16px;
  }
  .FundingChanges .ww2{
    display: block;
    margin-top: 20px;
    margin-left: 50px;
    color: #68728c;
    font-size: 30px;
    font-weight: 700;
    margin-top: 14px;
    text-indent: 51px;
  }
  .FundingChanges .ww3{
    margin-left: 13px;
    font-weight: 700;
    color: #68728c;
    font-size: 14px;
  }
  .FundingChanges .ww4{
    font-size: 12px;
    font-weight: 500;
    color: #a2a9ba;
  }
  .FundingChanges .ww5{
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
  .FundingChanges .bb2{
    color: #fff;
    background: #b7c3cd;
    border-radius: 5px;
  }
  .FundingChanges .bb1{
    color: #fff;
    background: #386cfa;
    border-radius: 5px;
  }
</style>
<script>
  export default {
    data() {
      return {
        total:0,
        withFlowForm:{
          pageNumber:1,
          pageSize:10,
          data:{
            walletFlowStatus:1,
          }
        },
        //提现金额
        withdraw:null,
        withdrawButton: true,
        tableData: [
          {
            walletFlowId: null,//流水号
            walletFlowType: null,//类型 业务类型（1.充值 2.提现 3.下单）
            walletFlowFee: null,//涉及费用
            walletFlowDate: null,//时间
            walletFlowBalance: null//剩余余额
          }
        ],
        tableState:{
          loading:false,
        }
      }
    },
    mounted() {
      this.getWithFlow();
    },
    methods:{
      //获取登陆数据
      getWithFlow() {
        this.tableState.loading = true
        this.$http.post('/walletFlow/getWalletFlowByPage', this.withFlowForm)
          .then(res => {
            if (res.code === 10000) {
              let datas = res.data.list
              for (let i in datas) {
                if (datas[i].walletFlowType === 1) {
                  datas[i].walletFlowTypeStr = '充值'
                }else if(datas[i].walletFlowType === 2){
                  datas[i].walletFlowTypeStr = '提现'
                }else if(datas[i].walletFlowType === 3){
                  datas[i].walletFlowTypeStr = '下单'
                }
              }
              this.tableData = null
              this.tableData = datas
              this.total = res.data.total
            }
            this.tableState.loading = false
          });
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
          'background: #FCFDFF'
      }

    }

  }
</script>
