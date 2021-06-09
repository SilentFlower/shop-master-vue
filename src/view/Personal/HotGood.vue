<!-- 热门商品 -->
<template>
  <el-row class="HotGood">
    <el-row style="border-bottom: 2px solid #F4F7FE;padding-bottom: 20px">
      <el-row style="float: left">
        <span class="tit">热门商品</span>
      </el-row>

      <el-card style="display: block;width: 100%">
        <el-form :inline="true">
          <el-button type="primary" @click="openAddDraw">
            添加
          </el-button>
          <el-form-item label-width="100px" label="商品名">
            <el-input v-model="queryForm.goodsName"></el-input>
          </el-form-item>
          <el-form-item label-width="100px" label="商家名">
            <el-input v-model="queryForm.shopName"></el-input>
          </el-form-item>
          <el-form-item label-width="100px" label="类别">
            <el-select v-model="queryForm.typeId">
              <el-option
                v-for="item in typeList"
                :label="item.typeName"
                :key="item.typeId"
                :value="item.typeId"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-card>

      <el-row>
        <el-table
          :data="tableData"
          v-loading="loading"
          stripe
          :header-cell-style="getHeadClass"
          style="width: 100%;margin-top: 20px">
          <el-table-column
            prop="typeName"
            label="商品类别">
          </el-table-column>
          <el-table-column
            prop="goodsName"
            label="商品名称">
          </el-table-column>
          <el-table-column
            prop="shopName"
            label="商家名称">
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
            prop="hotAddTime"
            label="添加时间">
            <template slot-scope="scope">
              {{$date.format(scope.row.hotAddTime)}}
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button type="danger" size="mini" @click.stop="delHotGoods(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-row>

    <el-dialog :visible.sync="addDraw" width="60%"  @close="close" v-if="addDraw">
      <el-row>
        <el-row>
          <span class="tit">添加热门商品</span>
        </el-row>
      </el-row>
      <el-row style="margin-top: 20px">
        <el-card>
          <el-form :inline="true">
            <el-form-item label-width="100px" label="商品名">
              <el-input  v-model="queryForm2.data.goodsName"></el-input>
            </el-form-item>
            <el-form-item label-width="100px" label="商家名">
              <el-input  v-model="queryForm2.data.shopName"></el-input>
            </el-form-item>
            <el-form-item label-width="100px" label="类别">
              <el-select v-model="queryForm2.data.typeId">
                <el-option
                  v-for="item in typeList"
                  :label="item.typeName"
                  :key="item.typeId"
                  :value="item.typeId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-button type="primary"  @click="getGoods">查找</el-button>
          <el-button type="success" :disabled="multipleSelection.length <= 0" @click="addHotGood">添加</el-button>
        </el-card>
      </el-row>
      <el-row style="margin-top: 20px">
        <el-row>
          <el-table
            :data="goods"
            v-loading="loading2"
            @selection-change="handleSelectionChange"
            stripe
            :header-cell-style="getHeadClass"
            style="width: 100%">
            <el-table-column
            type="selection">
            </el-table-column>
            <el-table-column
              prop="typeName"
              label="商品类别">
            </el-table-column>
            <el-table-column
              prop="goodsName"
              label="商品名称">
            </el-table-column>
            <el-table-column
              prop="shopName"
              label="商家名称">
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
          </el-table>
        </el-row>
        <div class="block" style="margin-top: 20px">
          <el-pagination
            @size-change="getGoods"
            @current-change="getGoods"
            :current-page.sync="queryForm2.pageNumber"
            :page-sizes="[10, 20, 50, 100]"
            :page-size.sync="queryForm2.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </el-row>
    </el-dialog>
  </el-row>
</template>
<style>
  .HotGood {
    padding: 20px 50px 20px 50px;
  }
  .HotGood .tit {
    width: 95%;
    font-size: 21px;
    font-weight: 700;
    color: #68728c;
    padding: 29px 13px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-bottom: -2px;
  }
  .HotGood .setting{
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
  .HotGood .ww1{
    vertical-align: middle;
    display: inline-block;
    color: #a2a9ba;
    font-size: 15px;
    font-weight: 500;
    margin-left: 16px;
  }
  .HotGood .ww2{
    display: block;
    margin-top: 20px;
    margin-left: 50px;
    color: #68728c;
    font-size: 30px;
    font-weight: 700;
    margin-top: 14px;
    text-indent: 51px;
  }
  .HotGood .ww3{
    margin-left: 13px;
    font-weight: 700;
    color: #68728c;
    font-size: 14px;
  }
  .HotGood .ww4{
    font-size: 12px;
    font-weight: 500;
    color: #a2a9ba;
  }
  .HotGood .ww5{
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
  .HotGood .bb2{
    color: #fff;
    background: #b7c3cd;
    border-radius: 5px;
  }
</style>
<script>
  export default {
    data() {
      return {
        queryForm:{
          goodsName:null,
          shopName:null,
          typeId:null,
        },
        loading2:false,
        total:0,
        goods:[],
        multipleSelection:[],
        queryForm2:{
          pageSize:10,
          pageNumber:1,
          data:{
            goodsName:null,
            shopName:null,
            typeId:null,
            hotFlag:1,
          }
        },
        loading:false,
        tableData:[],
        typeList:[],
        addDraw:false,
      }
    },
    mounted() {
      this.getTypeChild();
      this.getHotGoods();
    },
    methods:{
      //分页获取需要添加的
      getGoods(){
        this.loading2 = true;
        this.$http.post('/goods/getListByPage',this.queryForm2)
          .then(res => {
            if (res.code === 10000) {
              this.goods = res.data.list;
              this.total = res.data.total
            }
            this.loading2 = false;
          });
      },
      //获取所有类别子节点
      getTypeChild(){
        this.$http.get('/type/getChild')
          .then(res => {
            if (res.code === 10000) {
              this.typeList = res.data;
            }
          });
      },
      //获取热门商品
      getHotGoods(){
        this.loading = true;
        this.$http.post('/hotGoods/getHotGoodsByParam',this.queryForm)
          .then(res => {
            if (res.code === 10000) {
              this.tableData = res.data;
            }
            this.loading = false;
          });
      },
      openAddDraw(){
        this.addDraw  = true
        this.getGoods()
      },
      handleSelectionChange(val){
        this.multipleSelection = [];
        for (let item of val){
          this.multipleSelection.push({goodsId:item.goodsId});
        }
      },
      close(){
        this.addDraw = false
      },
      addHotGood(){
        this.$http.post('/hotGoods/addHotGoods',this.multipleSelection)
          .then(res => {
            if (res.code === 10000) {
              this.$message.success("添加成功")
              this.getHotGoods()
              this.close()
            }
          });
      },
      delHotGoods(row){
        this.$http.post('/hotGoods/delHotGoods',[row.goodsId])
          .then(res => {
            if (res.code === 10000) {
              this.getHotGoods();
            }
          });

      },
      //表头样式
      getHeadClass(){
        return ' color: #68728c!important;\n' +
          '    font-weight: 700;'+
          'background: #FCFDFF'
      },

    },
  }
</script>
