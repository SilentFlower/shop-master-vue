<!-- 商品列表 -->
<template>
  <el-row class="EditGood">
    <el-row style="border-bottom: 2px solid #F4F7FE;padding-bottom: 20px">
      <el-row style="float: left">
        <span class="tit">商品列表</span>
      </el-row>
      <el-row>
        <el-alert
          title="点击单行可对商品进行修改"
          type="warning"
          show-icon>
        </el-alert>
      </el-row>
      <el-row>
        <el-table
          :data="tableData"
          v-loading="tableState.loading"
          @row-click="openEditDialog"
          stripe
          :header-cell-style="getHeadClass"
          style="width: 100%">
          <el-table-column
            prop="typeName"
            label="商品类别">
          </el-table-column>
          <el-table-column
            prop="goodsName"
            label="商品名称">
            <template slot-scope="scope">
              {{scope.row.goodsName}}
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
            prop="dataCreateTime"
            label="添加时间">
            <template slot-scope="scope">
              {{$date.format(scope.row.dataCreateTime)}}
            </template>
          </el-table-column>
          <el-table-column
            prop="dataEditTime"
            label="修改时间">
            <template slot-scope="scope">
              {{$date.format(scope.row.dataEditTime)}}
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button type="danger" size="mini" @click.stop="delGoods(scope.row)">删除</el-button>
              <el-button type="primary" size="mini" @click.stop="openPriceAndSpc(scope.row)">价格与规格</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <div class="block">
        <el-pagination
          @size-change="getGoods"
          @current-change="getGoods"
          :current-page.sync="queryForm.pageNumber"
          :page-sizes="[10, 20, 50, 100]"
          :page-size.sync="queryForm.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </el-row>
    <el-dialog :visible.sync="editDialogVisible" @close="close" @open="init">
      <AddGood ref="test" @refresh="getGoods"></AddGood>
    </el-dialog>
    <el-dialog :visible.sync="addDetailVisible" @close="close2" v-if="addDetailVisible" fullscreen>
      <el-row>
        <el-row>
          <span class="tit">价格与规格管理</span>
        </el-row>
      </el-row>
      <el-row style="margin-top: 20px">
        <el-card style="display: flex;justify-content: flex-start">
          <el-button type="success" @click="openAdd">添加</el-button>
          <el-button type="danger" :disabled="multipleSelection.length <= 0" @click="delDetails">批量删除</el-button>
        </el-card>
      </el-row>
      <el-row style="margin-top: 20px">
        <el-row>
          <el-table
            :data="tableDetails"
            v-loading="tableState.loading2"
            @selection-change="handleSelectionChange"
            stripe
            :header-cell-style="getHeadClass"
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="goodsName"
              label="商品名称">
            </el-table-column>
            <el-table-column
              prop="goodsName"
              label="商品图片">
              <template slot-scope="scope">
                <el-popover placement="top-start" title="" trigger="hover">
                  <img :src="chooseImg+'?'+Math.random()" alt="" style="width: 150px;height: 150px">
                  <img slot="reference" :src="chooseImg+'?'+Math.random()" style="width: 30px;height: 30px">
                </el-popover>
                </template>
            </el-table-column>
            <el-table-column
              prop="goodsSpc"
              label="规格">
            </el-table-column>
            <el-table-column
              prop="goodsPrice"
              label="商品价格">
            </el-table-column>
            <el-table-column
              prop="goodsNum"
              label="商品库存">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click.stop="editDetails(scope.row)">修改</el-button>
                <el-button v-if="scope.row.goodsAuto == 1" type="primary" size="mini" @click.stop="openAddCard(scope.row)">添加卡密</el-button>
                <el-button v-if="scope.row.goodsAuto == 1" type="info" size="mini" @click.stop="openCard(scope.row)">查看卡密列表</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <div class="block" style="margin-top: 20px">
          <el-pagination
            @size-change="getGoodsDetails"
            @current-change="getGoodsDetails"
            :current-page.sync="queryForm2.pageNumber"
            :page-sizes="[10, 20, 50, 100]"
            :page-size.sync="queryForm2.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total2">
          </el-pagination>
        </div>
      </el-row>
      <el-drawer
        class="wadasd"
        :visible.sync="addVisible"
        size="40%"
        append-to-body
        direction="rtl"
      @close="close3">
        <template slot="title">
          <el-row style="border-bottom: 2px solid #F7F7F7;padding-bottom: 10px">
            <span style="font-weight: 500;font-size: 16px;color: #000000">{{myTitle}}</span>
          </el-row>
        </template>
        <el-row style="padding-left:20px;padding-right: 20px;padding-bottom:10px;border-bottom: 2px solid #F7F7F7">
          <el-form
            label-position="top"
            :model="addForm"  label-width="80px"
          >
            <el-row>
              <el-form-item>
                <template slot="label">
                  <span class="uytrew">商品规格名</span>
                </template>
                <el-col :span="14">
                  <el-input :disabled="lockGoodsSpc" v-model="addForm.goodsSpc"></el-input>
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <template slot="label">
                  <span class="uytrew">发卡类型</span>
                </template>
                <el-radio-group v-model="addForm.goodsAuto" size="medium" @change="changeAuto">
                  <el-radio-button :label="1" border>自动发卡(卡密)</el-radio-button>
                  <el-radio-button :label="0" border>手动发卡</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item>
                  <template slot="label">
                    <span class="uytrew">商品价格</span>
                  </template>
                  <el-input v-model="addForm.goodsPrice"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" :offset="2">
                <el-form-item>
                  <template slot="label">
                    <span class="uytrew">商品库存</span>
                  </template>
                  <el-input :disabled="lockGoodsNum" v-model="addForm.goodsNum"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row >
              <el-form-item>
                <template slot="label">
                  <span class="uytrew">卡密</span>
                </template>
                <el-col :span="14">
                  <el-input
                    :disabled="lockCards"
                    :autosize="{ minRows: 6, maxRows: 20}"
                    type="textarea"
                            v-model="addForm.cards"></el-input>
                </el-col>
              </el-form-item>
            </el-row>
          </el-form>
        </el-row>
        <el-row style="margin-top: 10px;display: flex;justify-content: flex-end;padding-right: 10px">
          <el-button @click="close3">
            取消
          </el-button>
          <el-button type="primary" @click="saveDetails">
            提交
          </el-button>
        </el-row>
      </el-drawer>
      <el-drawer
        class="wadasd"
        :visible.sync="addCardVisible"
        size="40%"
        append-to-body
        direction="rtl"
        @close="close3">
        <template slot="title">
          <el-row style="border-bottom: 2px solid #F7F7F7;padding-bottom: 10px">
            <span style="font-weight: 500;font-size: 16px;color: #000000">新增卡密</span>
          </el-row>
        </template>
        <el-row style="padding-left:20px;padding-right: 20px;padding-bottom:10px;border-bottom: 2px solid #F7F7F7">
          <el-form
            label-position="top"
            :model="addForm"  label-width="80px"
          >
            <el-row >
              <el-form-item>
                <template slot="label">
                  <span class="uytrew">卡密</span>
                </template>
                <el-col :span="14">
                  <el-input
                    :autosize="{ minRows: 10, maxRows: 30}"
                    type="textarea"
                    v-model="addForm.cards"></el-input>
                </el-col>
              </el-form-item>
            </el-row>
          </el-form>
        </el-row>
        <el-row style="margin-top: 10px;display: flex;justify-content: flex-end;padding-right: 10px">
          <el-button @click="close4">
            取消
          </el-button>
          <el-button type="primary" @click="addCard">
            提交
          </el-button>
        </el-row>
      </el-drawer>
      <el-dialog :visible.sync="cardVisible" v-if="cardVisible" append-to-body @close="close5">
        <template slot="title">
          <el-row>
            <el-row>
              <span class="uytrew">卡密查询</span>
            </el-row>
          </el-row>
        </template>
        <el-row>
          <el-card>
            <el-alert
              title="点击单行可对卡密进行修改，回车提交"
              type="warning"
              show-icon>
            </el-alert>
            <el-form style="margin-top: 20px" :model="queryCardForm" :inline="true">
              <el-form-item label="使用状态">
                <el-select v-model="queryCardForm.data.cardFlag">
                  <el-option :value="null" label="所有" :key="null"></el-option>
                  <el-option :value="0" label="已用" :key="0"></el-option>
                  <el-option :value="1" label="未用" :key="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="卡密">
                <el-input v-model="queryCardForm.data.goodsCards"></el-input>
              </el-form-item>
            </el-form>
            <el-button  type="danger" :disabled="multipleSelection2.length <= 0" @click="delCards">批量删除</el-button>
            <el-button type="primary"  @click="getCardInfo">查询</el-button>
          </el-card>
        </el-row>
        <el-row style="margin-top: 20px">
          <el-table
            @cell-click="tabClick"
            :data="cardTable"
            v-loading="tableState.loading3"
            @selection-change="handleSelectionChange2"
            stripe
            :header-cell-style="getHeadClass"
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="goodsSpc"
              label="规格">
            </el-table-column>
            <el-table-column
              prop="goodsCards"
              label="卡密"
              :key="1">
              <template slot-scope="scope">
                <el-input v-if="scope.row.cardId === editCardForm.cardId"  maxlength="300" v-model="inputStr" placeholder="请输入卡密" @keyup.enter.native="inputBlur(scope.row)"/>
                <span v-else>{{ scope.row.goodsCards }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="cardDateCreate"
              label="创建时间">
              <template slot-scope="scope">
                {{$date.format(scope.row.cardDateCreate)}}
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <div class="block" style="margin-top: 20px">
          <el-pagination
            @size-change="getCardInfo"
            @current-change="getCardInfo"
            :current-page.sync="queryCardForm.pageNumber"
            :page-sizes="[10, 20, 50, 100]"
            :page-size.sync="queryCardForm.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total3">
          </el-pagination>
        </div>
      </el-dialog>
    </el-dialog>
  </el-row>
</template>
<style>
  .wadasd .el-drawer.rtl{
    overflow-y: scroll;
  }
  .uytrew{
    color: #3b5998;
    font-weight: 600;
    font-family: Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
  }
  .EditGood {
    padding: 20px 50px 20px 50px;
  }
  .wwwwwwtf{
    width: 95%;
    font-size: 21px;
    font-weight: 700;
    color: #68728c;
    padding: 29px 13px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-bottom: -2px;
  }
  .EditGood .tit {
    width: 95%;
    font-size: 21px;
    font-weight: 700;
    color: #68728c;
    padding: 29px 13px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-bottom: -2px;
  }
  .EditGood .setting{
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
  .EditGood .ww1{
    vertical-align: middle;
    display: inline-block;
    color: #a2a9ba;
    font-size: 15px;
    font-weight: 500;
    margin-left: 16px;
  }
  .EditGood .ww2{
    display: block;
    margin-top: 20px;
    margin-left: 50px;
    color: #68728c;
    font-size: 30px;
    font-weight: 700;
    margin-top: 14px;
    text-indent: 51px;
  }
  .EditGood .ww3{
    margin-left: 13px;
    font-weight: 700;
    color: #68728c;
    font-size: 14px;
  }
  .EditGood .ww4{
    font-size: 12px;
    font-weight: 500;
    color: #a2a9ba;
  }
  .EditGood .ww5{
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
  .EditGood .bb2{
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
  import AddGood from "./AddGood";
  export default {
    data() {
      return {
        chooseImg:null,
        inputStr:null,
        editCardForm:{
          cardId:null,
          oldCards:null,
          goodsCards:null,
          goodsSpc:null,
          goodsId:null
        },
        //卡密表格
        total3:0,
        cardTable:[],
        queryCardForm:{
          pageSize:10,
          pageNumber:1,
          data:{
            goodsId:null,
            goodsSpc:null,
            cardFlag:1,
            goodsCards:null,

          }
        },
        cardVisible:false,
        //选择的内容
        multipleSelection2:[],
        multipleSelection:[],
        addCardVisible:false,
        myTitle:'添加商品规格的价格与库存',
        //用来锁定规格输入
        lockGoodsSpc:false,
        //用来锁定卡密输入框
        lockCards:true,
        //用来锁定库存表
        lockGoodsNum:false,
        addForm:{
          goodsId:null,
          goodsSpc:null,
          goodsPrice:0,
          goodsNum:0,
          goodsAuto:0,
          cards:null,
        },
        chooseId:null,
        total2:0,
        queryForm2:{
          pageSize:10,
          pageNumber:1,
          data:{
            goodsId:null,
          }
        },
        //详细表
        tableDetails:[],
        addDetailVisible:false,
        addVisible:false,
        row:null,
        editDialogVisible:false,
        total:0,
        queryForm:{
          pageSize:10,
          pageNumber:1,
          data:{
            shopId:null,
          }
        },
        //提现金额
        withdraw:null,
        withdrawButton: true,
        tableData:[],
        tableState:{
          loading:false,
          loading2:false,
          loading3:false,
        },
      }
    },
    mounted() {
      this.queryForm.shopId = this.$auth.getUser().id;
      this.getGoods();
    },
    methods:{
      delCards(){
        this.$http.post('/cards/delCards', this.multipleSelection2)
          .then(res => {
            if (res.code === 10000) {
              this.$message.success("删除卡密成功")
              this.getCardInfo();
            }
          });
      },
      tabClick(row, column, cell, event){
        this.editCardForm.oldCards = row.goodsCards
        this.editCardForm.cardId = row.cardId
        this.inputStr = row.goodsCards

      },
      inputBlur(row){
        if (this.inputStr != this.editCardForm.oldCards) {
          this.editCardForm.goodsCards = this.inputStr
          this.$http.post('/cards/editCards', this.editCardForm)
            .then(res => {
              if (res.code === 10000) {
                this.$message.success("修改成功");
                this.getCardInfo();
              }
            });
        }
        this.editCardForm.oldCards = null;
        this.editCardForm.cardId = null;
        this.inputStr = null;
      },
      //获取卡密表格
      getCardInfo(){
        this.tableState.loading3 = true
        this.$http.post('/cards/getListByPage', this.queryCardForm)
          .then(res => {
            if (res.code === 10000) {
              this.cardTable = res.data.list
              this.total3 = res.data.total
            }
            this.tableState.loading3 = false
          });
      },
      openCard(row){
        this.cardVisible = true
        this.queryCardForm.data.goodsId = row.goodsId;
        this.queryCardForm.data.goodsSpc = row.goodsSpc;
        this.getCardInfo()
      },
      close5(){
        this.cardVisible = false
      },
      handleSelectionChange2(val){
        this.multipleSelection2 = val;
      },
      //多选
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      //分页查询商品详细表
      getGoodsDetails(){
        this.tableState.loading2 = true
        this.$http.post('/goodsDetails/getListByPage', this.queryForm2)
          .then(res => {
            if (res.code === 10000) {
              this.tableDetails = res.data.list
              this.total2 = res.data.total
            }
            this.tableState.loading2 = false
          });
      },
      //radio改变
      changeAuto(){
        if (this.addForm.goodsAuto === 1 && this.myTitle !='修改商品规格的价格与库存') {
          this.lockCards = false
          this.addForm.goodsNum = 0
          this.lockGoodsNum = true
        }else if(this.myTitle !='修改商品规格的价格与库存'){
          this.lockGoodsNum = false
          this.addForm.cards = null
          this.lockCards = true
        }else if(this.myTitle =='修改商品规格的价格与库存' && this.addForm.goodsAuto === 0){
          this.lockGoodsNum = false
        }else if(this.myTitle =='修改商品规格的价格与库存' && this.addForm.goodsAuto === 1){
          this.addForm.goodsNum = 0
          this.lockGoodsNum = true
        }
      },
      //新增规格
      saveDetails(){
        if(this.myTitle == '添加商品规格的价格与库存') {
          this.$http.post('/goodsDetails/addGoodsDetails', this.addForm)
            .then(res => {
              if (res.code === 10000) {
                this.$message.success("添加成功");
                this.close3()
                this.getGoodsDetails()
              }
            });
        }else{
          this.$http.post('/goodsDetails/editGoodsDetails', this.addForm)
            .then(res => {
              if (res.code === 10000) {
                this.$message.success("修改成功");
                this.close3()
                this.getGoodsDetails()
              }
            });
        }
      },
      //修改
      editDetails(row){
        this.addForm.goodsId = row.goodsId;
        this.addForm.goodsSpc = row.goodsSpc;
        this.addForm.goodsPrice = row.goodsPrice;
        this.addForm.goodsNum = row.goodsNum;
        this.addForm.goodsAuto = row.goodsAuto;
        this.myTitle = '修改商品规格的价格与库存'
        if (row.goodsAuto === 1) {
          this.lockGoodsNum = true
        }
        this.lockGoodsSpc = true;
        this.lockCards = true
        this.addVisible = true
      },
      //添加卡密
      openAddCard(row){
        this.addForm.goodsId = row.goodsId;
        this.addForm.goodsSpc = row.goodsSpc;
        this.addForm.goodsAuto = row.goodsAuto;
        this.addCardVisible = true
      },
      addCard(){
        this.$http.post('/goodsDetails/addGoodsCard', this.addForm)
          .then(res => {
            if (res.code === 10000) {
              this.$message.success("新增卡密成功")
              this.close4()
              this.getGoodsDetails()
            }
          });
      },
      //批量删除
      delDetails(){
        this.$confirm('此操作将永久删除该商品规格, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('/goodsDetails/delGoodsDetails',this.multipleSelection)
            .then(res => {
              if (res.code === 10000) {
                this.$message.success("删除成功")
                this.getGoodsDetails()
              }else{
                this.$message.error(res.message)
              }
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //打开价格与规格
      openPriceAndSpc(row){
        this.chooseImg = row.goodsPic
        this.addDetailVisible = true
        this.queryForm2.data.goodsId = row.goodsId
        this.addForm.goodsId = row.goodsId
        this.getGoodsDetails()
      },
      //打开商品详细表添加按钮
      openAdd() {
        this.addVisible = true
      },
      //删除
      delGoods(row){
        this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('/goods/delGoods',this.$qs.stringify({goodsId:row.goodsId}))
            .then(res => {
              if (res.code === 10000) {
                this.$message.success("删除成功")
                this.getGoods()
              }else{
                this.$message.error(res.message)
              }
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      init(){
        this.$nextTick(() => {
          this.$refs.test.changeTitle('修改商品')
          this.$refs.test.setRow(this.row);
        });
      },
      close4(){
        this.addCardVisible = false
        this.addForm.goodsSpc = null;
        this.addForm.goodsAuto = 0;
      },
      close3(){
        this.lockGoodsNum = false
        this.lockCards = true
        this.addVisible = false
        this.lockGoodsSpc = false
        //重置表单
        this.addForm.goodsSpc = null;
        this.addForm.goodsPrice = 0;
        this.addForm.goodsNum = 0;
        this.addForm.goodsAuto = 0;
        this.addForm.cards = null;
        this.myTitle = '添加商品规格的价格与库存'
      },
      close2(){
        this.addDetailVisible = false
      },
      close(){
        this.editDialogVisible = false
      },
      openEditDialog(row, column, event){
        this.editDialogVisible = true
        this.row = row
      },
      //获取登陆数据
      getGoods() {
        this.editDialogVisible = false
        this.tableState.loading = true
        this.$http.post('/goods/getGoodsByPage', this.queryForm)
          .then(res => {
            if (res.code === 10000) {
              this.tableData = res.data.list
              console.log(this.tableData)
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
      },

    },
    components:{
      AddGood
    }

  }
</script>
