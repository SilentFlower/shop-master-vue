<!--登录日志-->
<template>
  <el-row class="LoginLog">
    <el-row style="border-bottom: 2px solid #F4F7FE;padding-bottom: 20px">
      <el-row style="float: left">
        <span class="tit">登录日志</span>
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
            type="index"
            label="序号"
            width="100">
          </el-table-column>
          <el-table-column
            prop="userIp"
            label="登陆路由"
            width="180">
          </el-table-column>
          <el-table-column
            prop="userArea"
            label="登陆地区">
          </el-table-column>
          <el-table-column
            prop="userDevice"
            label="登陆设备"
            width="180">
          </el-table-column>
          <el-table-column
            prop="loginDate"
            label="登陆时间">
            <template slot-scope="scope">
              {{$date.format(new Date(scope.row.loginDate))}}
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <div class="block">
        <el-pagination
          @size-change="getLoginLog"
          @current-change="getLoginLog"
          :current-page.sync="queryForm.pageNumber"
          :page-sizes="[10, 20, 50, 100]"
          :page-size.sync="queryForm.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </el-row>

  </el-row>
</template>
<style>
  .LoginLog {
    padding: 20px 50px 20px 50px;
  }
  .LoginLog .tit {
    width: 95%;
    font-size: 21px;
    font-weight: 700;
    color: #68728c;
    padding: 29px 13px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-bottom: -2px;
  }
  .LoginLog .setting{
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
  .LoginLog .ww1{
    vertical-align: middle;
    display: inline-block;
    color: #a2a9ba;
    font-size: 15px;
    font-weight: 500;
    margin-left: 16px;
  }
  .LoginLog .ww2{
    display: block;
    margin-top: 20px;
    margin-left: 50px;
    color: #68728c;
    font-size: 30px;
    font-weight: 700;
    margin-top: 14px;
    text-indent: 51px;
  }
  .LoginLog .ww3{
    margin-left: 13px;
    font-weight: 700;
    color: #68728c;
    font-size: 14px;
  }
  .LoginLog .ww4{
    font-size: 12px;
    font-weight: 500;
    color: #a2a9ba;
  }
  .LoginLog .ww5{
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
  .LoginLog .bb2{
    color: #fff;
    background: #b7c3cd;
    border-radius: 5px;
  }
  .LoginLog .bb1{
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
        queryForm:{
          pageSize:10,
          pageNumber:1
        },
        //提现金额
        withdraw:null,
        withdrawButton: true,
        tableData:[],
        tableState:{
          loading:false,
        }
      }
    },
    mounted() {
      this.getLoginLog();
    },
    methods:{
      //获取登陆数据
      getLoginLog() {
        this.tableState.loading = true
        this.$http.post('/loginLog/getLoginLogById', this.queryForm)
          .then(res => {
            if (res.code === 10000) {
              this.tableData = res.data.list
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
