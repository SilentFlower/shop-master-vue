<!--购物清单-->
<template>

  <!--    信息栏-->
  <el-row class="shoppingCart">
    <el-row class="ww2" type="flex" align="middle">
      <span class="ww1 el-icon-shopping-cart-1">购物清单</span>
    </el-row>

    <el-row>
      <el-table
        :data="goodsList"
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
          prop="goodsimg"
          label="商品图片"
          width="220">
          <template   slot-scope="scope">
            <img :src="scope.row.goodsimg"  min-width="70" height="70" />
          </template>
        </el-table-column>
        <el-table-column
          prop="goodsName"
          label="商品名称"
          width="220">
        </el-table-column>
        <el-table-column
          prop="price"
          label="商品价格"
          width="220">
        </el-table-column>
        <el-table-column
          label="购买数量">
          <template slot-scope="scope">
            <div class="div_number">
              <el-input-number :min="1"  size="mini" v-model="scope.row.buy_num" placeholder="0" :value="0">
              </el-input-number>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="danger" icon="el-icon-delete" size="mini" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row type="flex" class="ww5" align="middle">
      <el-col :offset="13" style="border-right:2px solid #ECECEC">
        <div class="ww4">已经选择{{checkList.length}}件商品</div>
        <div class="ww3">共计{{goodsList.length}}件商品</div>
      </el-col>
      <el-col :offset="1" class="ww4">
        应付总额：￥{{totalPrice}}
        <el-button type="primary" round>现在结算</el-button>
      </el-col>
    </el-row>

    <recommend style="margin-top: 20px">
    </recommend>
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
  import goodsList from "../../components/nav/goodsList";
  import goodInfo from "../../components/nav/goodInfo";
  import recommend from "../../components/nav/recommend";
  export default {
    data() {
      return {
        //选中的队列
        checkList:[],
        goodsList:[
          {
            goodsimg:'测试图片',
            goodsName:'测试名',
            price:11,
            buy_num:1,
          }

        ]

      }
    },
    mounted() {

    },
    methods:{
      //计算合计
      handleSelectionChange(val) {
        this.checkList = val;
      }

    },
    computed:{
      totalPrice(){
        let all = 0;
        for (let i in this.checkList) {
          all += this.checkList[i].price * this.checkList[i].buy_num;
        }
        return all
      }
    },
    components: {
      goodsList,
      goodInfo,
      recommend,
    },
  }
</script>
