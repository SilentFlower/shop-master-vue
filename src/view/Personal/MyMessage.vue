<!--个人消息页面-->
<template>
  <el-row class="MyMessage">

    <el-row type="flex" align="middle" style="border-bottom: 2px solid #F4F7FE">
      <el-col class="tit" :span="5">
        我的消息
      </el-col>
      <el-button icon="el-icon-refresh-right" @click="getMsg">刷新</el-button>
      <el-col :span="10" :offset="14">
        <el-col :span="12">
          <el-button @click="readThisPage">
            标记本页已读
          </el-button>
        </el-col>
        <el-col :span="12">
          <el-button @click="readAll">
            标记全部已读
          </el-button>
        </el-col>
      </el-col>

    </el-row>

    <el-row>
      <el-table
        :data="tableData"
        v-loading="tableState.loading"
        stripe
        :row-class-name="judgmentBold"
        style="width: 100%"
        @row-click="openMsg">
        <el-table-column
          prop="msgDate"
          label="日期"
          width="180">
          <template slot-scope="scope">
            {{$date.format(new Date(scope.row.msgDate))}}
          </template>
        </el-table-column>
        <el-table-column
          prop="msgType"
          label="内容类型"
          width="180">
        </el-table-column>
        <el-table-column
          prop="msgContent"
          label="内容">
        </el-table-column>
      </el-table>
    </el-row>
    <div class="block">
      <el-pagination
        :current-page="tableState.tableCurrent"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="tableState.tableSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableState.tableTotal">
      </el-pagination>
    </div>

    <el-dialog :title="dialog.title" :visible.sync="dialog.status">
      <div>{{dialog.content}}</div>
      <div slot="footer" class="dialog-footer">
        <div>{{$date.format(new Date(dialog.msgDate))}}</div>
      </div>
    </el-dialog>

  </el-row>
</template>
<style>
  .MyMessage{
    margin-left: 30px;
    margin-right: 30px;
    border-bottom: 2px solid #f4f7fe;
  }
  .MyMessage .tit {
    font-size: 21px;
    font-weight: 700;
    color: #68728c;
    padding: 29px 13px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-bottom: -2px;
  }
  .MyMessage .makeBold{
    font-weight: 700;
  }
</style>
<script>
  export default {
    data() {
      return {
        //分页相关
        tableState:{
          tableSize:10,
          tableTotal:1,
          tableCurrent:1,
          loading:false,
        },
        //内容
        tableData:[],
        //digalog的内容
        dialog:{
          status:false,
          title:null,
          content:null,
          msgDate:null,
        }
      };
    },
    mounted() {
      this.getMsg();
    },
    methods:{
      //标记本页已读
      readThisPage(){
        let ids = [];
        for (let i in this.tableData) {
          ids.push(this.tableData[i].msgId)
        }
        this.readMsg(ids);
        this.getMsg();
      },
      //标记所有已读
      readAll(){
        this.$http.get('/message/readAll');
        this.getMsg();
      },
      //分页获取个人消息
      getMsg(){
        this.tableState.loading = true;
        this.$http.post('/message/getListByPage', {
          pageSize: this.tableState.tableSize,
          pageNumber: this.tableState.tableCurrent
        }).then(res => {
          if (res.code === 10000) {
            this.tableData = res.data.list;
            this.tableState.tableTotal = res.data.total;
          }
          this.tableState.loading = false;
        });
      },
      //判断行
      judgmentBold({row, rowIndex}){
        if (row.msgStatus != 1) {
          return 'makeBold';
        }
      },
      //调用接口读取信息
      readMsg(ids){
        this.$http.post('/message/readMsg', ids).then(res => {
        });
      },
      //打开消息查看具体内容
      openMsg(row, column, event){
        //调用接口读取改变信息状态
        let ids = [];
        ids.push(row.msgId)
        this.readMsg(ids)
        this.dialog.status = true
        row.msgStatus = 1
        this.dialog.content = row.msgContent
        this.dialog.title = row.msgType
        this.dialog.msgDate = row.msgDate
      }
    },

  }
</script>
