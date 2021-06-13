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
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="success" size="mini" v-if="scope.row.sendId != null" @click.native.stop="openReply(scope.row)">回复</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <div class="block">
      <el-pagination
        @size-change="getMsg"
        @current-change="getMsg"
        :current-page.sync="tableState.tableCurrent"
        :page-sizes="[10, 20, 50, 100]"
        :page-size.sync="tableState.tableSize"
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

    <el-dialog title="回复信息" :visible.sync="visible" @close="visible = false">
      <el-form label-position="top" label-width="80px" style="padding-left: 20px;padding-right: 20px">
        <el-row>
          <el-form-item>
            <el-col :span="14">
              <el-input
                :autosize="{ minRows: 6, maxRows: 20}"
                type="textarea"
                v-model="messageForm.msgContent"></el-input>
            </el-col>
          </el-form-item>
        </el-row>
      </el-form>
      <el-row style="margin-left: auto;display: flex;margin-right: 20px;margin-top: 20px;justify-content: flex-end">
        <el-button @click="visible = false">
          取消
        </el-button>
        <el-button type="primary" @click="replyMessage">
          提交
        </el-button>
      </el-row>
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
        chooseRow:null,
        visible:false,
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
        },
        messageForm:{
          msgType:'回复信息',
          msgContent:null,
          userId:null,
        },

      };
    },
    mounted() {
      this.getMsg();
    },
    methods:{
      replyMessage(){
        //将发送人设置为接收人
        this.messageForm.userId = this.chooseRow.sendId;
        this.$http.post('/message/sendMessage', this.messageForm)
          .then(res => {
            this.$message.success("回复成功");
          });
      },
      openReply(row){
        this.chooseRow = row;
        this.visible = true
      },
      updateMessage(){
        this.$emit('updateMessage');
      },
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
        this.updateMessage();
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
          this.updateMessage();
        });
      },
      //打开消息查看具体内容
      openMsg(row, column, event){
        console.log("??")
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
