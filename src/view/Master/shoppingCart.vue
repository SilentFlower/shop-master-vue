<!--购物清单-->
<template>

  <!--    信息栏-->
  <el-row class="shoppingCart" v-if="loading">
    <el-row class="ww2" type="flex" align="middle">
      <span class="ww1 el-icon-shopping-cart-1">购物清单</span>
    </el-row>

    <el-row>
      <el-table
        :data="buyList"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column
          type="index"
          label="序号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="goodsPic"
          label="商品图片">
          <template slot-scope="scope">
            <el-popover placement="top-start" title="" trigger="hover">
              <img :src="scope.row.goodsPic" alt="" style="width: 150px;height: 150px">
              <img slot="reference" :src="scope.row.goodsPic" style="width: 30px;height: 30px">
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="goodsName"
          label="商品名称">
        </el-table-column>
        <el-table-column
          prop="goodsPrice"
          label="商品价格">
          <template slot-scope="scope">
            <span>￥{{scope.row.goodsPrice}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="购买数量">
          <template slot-scope="scope">
            <div class="div_number">
              <el-input-number
                :min="1"
                :max="scope.row.stock"
                size="mini"
                v-model="scope.row.goodsNum"
                @change="changeNum(scope.row)"
                placeholder="0"
                :value="0">
              </el-input-number>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="stock"
          label="库存">
          <template slot-scope="scope">
            <span>{{scope.row.stock}}件</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="delShopcart(scope.row)" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row type="flex" class="ww5" align="middle">
      <el-col :span="6" :offset="10" style="border-right:2px solid #ECECEC">
        <div class="ww4">已经选择{{checkList.length}}件商品</div>
        <div class="ww3">共计{{buyList.length}}件商品</div>
      </el-col>
      <el-col :span="8" class="ww4">
        <el-col :span="12">
          应付总额：￥{{totalPrice}}
        </el-col>
        <el-col :span="4">
          <el-button type="danger" round @click="clearShopcart">清空</el-button>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" round @click="settleAccounts">现在结算</el-button>
        </el-col>
      </el-col>
    </el-row>

    <recommend2 :typeId="recommendTypeId" v-if="recommendTypeId !=''" style="margin-top: 20px">
    </recommend2>
  </el-row>

</template>
<style>
  .shoppingCart{
    margin: 0 auto;
    width: 1524px;
    padding: 30px 150px 30px 150px;
  }
  .shoppingCart .ww2{
    background-color: #FAFAFA;
    border-bottom: 2px solid #E4E4E4;
  }

  .shoppingCart .ww5{
    height: 81px;
    background-color: #FFFFFF;
    border-bottom: 2px solid #E4E4E4;
  }
  .shoppingCart .ww4{
    color: #323232;
    font-weight: 700;
  }
  .shoppingCart .ww3{
    color: #959595;
    margin-top: 4px;
    font-weight: 700;
  }

  .shoppingCart .ww1{
    float: left;
    margin-left: 25px;
    font-weight: bolder;
    font-size: 18px;
    line-height: 60px;
    color: #666;
  }

</style>

<script>
  import recommend2 from "../../components/nav/recommend2";
  export default {
    data() {
      return {
        loading:true,
        recommendTypeId:'',
        updateForm:{
          goodsId:null,
          goodsSpc:null,
          goodsNum:null,
        },
        //选中的队列
        checkList:[],
        buyList:[],
      }
    },
    mounted() {
      this.init();
    },
    methods:{
      //结算
      settleAccounts(){
        if (this.checkList.length <= 0) {
          this.$message.error("未选择商品");
        }else{
          this.$auth.setShopCart(this.checkList);
          this.$router.push({
            name:'结算'
          });
        }
      },
      init(){
        this.getShopcart();
      },
      changeNum(data){
        this.updateNum(data)
      },
      clear(){
        this.updateForm.goodsId = null;
        this.updateForm.goodsSpc = null;
        this.updateForm.goodsNum = null;
      },
      updateNum(data){
        this.updateForm.goodsId = data.goodsId;
        this.updateForm.goodsSpc = data.goodsSpc;
        this.updateForm.goodsNum = data.goodsNum;
        this.$http.post('/shopcart/editShopcart', this.updateForm)
          .then(res => {
            if (res.code === 10000) {
              this.clear();
            }
          });
      },
      delShopcart(row){
        this.$http.delete('/shopcart/delShopcart?goodsId='+row.goodsId+'&goodsSpc='+row.goodsSpc)
          .then(res => {
            if (res.code === 10000) {
              this.$message.success("清除商品成功");
              this.getShopcart();
            }
          });
      },
      clearShopcart(){
        this.$http.delete('/shopcart/delShopcart?emptyFlag=1')
          .then(res => {
            if (res.code === 10000) {
              this.$message.success("清空购物车成功");
              this.getShopcart();
            }
          });
      },
      getShopcart(){
        this.$http.get('/shopcart/getShopcartById')
          .then(res => {
            if (res.code === 10000) {
              let datas = res.data;
              //随机生成数用于推荐
              if (datas.length != 0) {
                let count = Math.floor(Math.random() * datas.length);
                this.recommendTypeId = datas[count].typeId;
              }
              this.buyList = res.data;
            }
          });
      },

      //计算合计
      handleSelectionChange(val) {
        this.checkList = val;
      }

    },
    computed:{
      totalPrice(){
        let all = 0;
        for (let i in this.checkList) {
          all += this.checkList[i].goodsPrice * this.checkList[i].goodsNum;
        }
        return all
      }
    },
    components: {
      recommend2,
    },
  }
</script>
