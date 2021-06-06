<!-- 生成优惠券 -->
<template>
  <el-row class="Coupon">
    <el-row style="border-bottom: 2px solid #F4F7FE;padding-bottom: 20px">
      <el-row style="float: left">
        <span class="tit">生成优惠券</span>
      </el-row>
    </el-row>
    <el-row style="margin-top: 20px;padding-left: 150px;" type="flex" justify="flex-start">
      <el-form label-position="left" label-width="140px" :model="Coupon">
        <el-form-item>
          <template slot="label">
            <span class="jiji">优惠券名</span>
          </template>
          <el-input v-model="Coupon.couponName"></el-input>
        </el-form-item>
        <el-form-item>
          <template slot="label">
            <span class="jiji">优惠券类型</span>
          </template>
          <div>
            <el-radio v-model="Coupon.couponType" label="店铺优惠券" border >店铺优惠券</el-radio>
            <el-radio v-model="Coupon.couponType" label="商品优惠券" border >商品优惠券</el-radio>
          </div>
        </el-form-item>
        <el-form-item>
          <template slot="label">
            <span class="jiji">商品类别</span>
          </template>
          <el-cascader
            :disabled="Coupon.couponType == '店铺优惠券'"
            clearable
            @change="getGoods"
            :options="options" :props="props" ref="cas2" v-model="goodsType">
          </el-cascader>
        </el-form-item>
        <el-form-item>
          <template slot="label">
            <span class="jiji">商品列表</span>
          </template>
          <el-select :disabled="goodsType == null" v-model="Coupon.goodsId">
            <el-option
              v-for="item in goods"
              :key="item.goodsId"
              :value="item.goodsId"
              :label="item.goodsName"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <template slot="label">
            <span class="jiji">价值类型</span>
          </template>
          <el-radio v-model="Coupon.couponUseType" label="折扣优惠券" border >折扣优惠券</el-radio>
          <el-radio v-model="Coupon.couponUseType" label="满减优惠券" border >满减优惠券</el-radio>
        </el-form-item>
        <el-form-item>
          <template slot="label">
            <span class="jiji">券价值</span>
          </template>
          <el-input
            placeholder="请填写店铺网站，将出现在店铺页面" v-model="Coupon.couponValue">
            <template slot="suffix">
              <span v-if="Coupon.couponUseType =='折扣优惠券' ">折</span>
              <span v-else>元</span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <template slot="label">
            <span class="jiji">准用金额</span>
          </template>
          <el-input placeholder="请填写店铺网站，将出现在店铺页面" v-model="Coupon.couponLimit"></el-input>
        </el-form-item>
        <el-form-item>
          <template slot="label">
            <span class="jiji">有效期</span>
          </template>
          <div class="block">
            <el-date-picker
              v-model="Coupon.couponDateEnd"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <template slot="label">
            <span class="jiji">生成张数</span>
          </template>
          <el-input placeholder="请填写店铺网站，将出现在店铺页面" v-model="Coupon.couponNum"></el-input>
        </el-form-item>
      </el-form>
    </el-row>
    <el-button type="success" @click="save">保存</el-button>



  </el-row>
</template>
<style>
  .Coupon {
    padding: 20px 50px 20px 50px;
  }
  .Coupon .jiji{
    width: 222px;
    font-size: 14px;
    font-weight: 700;
    color: #68728c;
    text-indent: 14px;
    -ms-flex-item-align: start;
    align-self: flex-start;
    padding-top: 10px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    text-indent: 8px;
  }
  .Coupon .tit {
    width: 95%;
    font-size: 21px;
    font-weight: 700;
    color: #68728c;
    padding: 29px 13px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-bottom: -2px;
  }
  .Coupon .setting{
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
  .Coupon .ww1{
    vertical-align: middle;
    display: inline-block;
    color: #a2a9ba;
    font-size: 15px;
    font-weight: 500;
    margin-left: 16px;
  }
  .Coupon .ww2{
    display: block;
    margin-top: 20px;
    margin-left: 50px;
    color: #68728c;
    font-size: 30px;
    font-weight: 700;
    margin-top: 14px;
    text-indent: 51px;
  }
  .Coupon .ww3{
    margin-left: 13px;
    font-weight: 700;
    color: #68728c;
    font-size: 14px;
  }
  .Coupon .ww4{
    font-size: 12px;
    font-weight: 500;
    color: #a2a9ba;
  }
  .Coupon .ww5{
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
  .Coupon .bb2{
    color: #fff;
    background: #b7c3cd;
    border-radius: 5px;
  }
  .Coupon .bb1{
    color: #fff;
    background: #386cfa;
    border-radius: 5px;
  }
</style>
<script>
  export default {
    inject: ['reload'],
    data() {
      return {
        options:[],
        props: {
          label:'typeName',
          value:'typeId',
          leaf:'leafFlag',
          lazy:true,
          lazyLoad:this.myLazyLoad
        },
        //商品表
        goods:[],
        goodsType:null,
        type:null,
        //优惠券表单
        Coupon:{
          couponType:'店铺优惠券',//类别
          goodsId:null,
          couponUseType:'折扣优惠券',
          couponValue:null,
          couponLimit:null,
          couponDateEnd:null,
          couponNum:null,
          couponName:null
        },

      }
    },
    mounted() {
      this.getRoot();
    },
    methods:{
      init(){
        this.goodsType = null
        this.type =  null
        this.Coupon.couponType = '店铺优惠券'
        this.Coupon.goodsId = null
        this.Coupon.couponUseType = '折扣优惠券'
        this.Coupon.couponValue = null
        this.Coupon.couponLimit = null
        this.Coupon.couponDateEnd = null
        this.Coupon.couponNum = null
        this.Coupon.couponName = null
      },
      //保存优惠券
      save(){
        this.$http.post('/coupon/addCoupon', this.Coupon)
          .then(res => {
            if (res.code === 10000) {
              this.$message.success("创建成功")
              this.Coupon.couponType = '店铺优惠券'
              this.init();
            }
          });
      },
      getGoods(){
        this.getGoodsType();
        this.$http.get('/goods/getGoodsByType?typeId='+this.type)
          .then(res => {
            if (res.code === 10000) {
              this.goods = res.data
            }
          });
      },
      getRoot(){
        this.$http.get('/type/getRoot')
          .then(res => {
            if (res.code === 10000) {
              this.options = res.data
            }
          });
      },
      getGoodsType(){
        if (this.$refs.cas2.getCheckedNodes(false)[0] != null) {
          this.type = this.$refs.cas2.getCheckedNodes(false)[0].value
        }
      },
      //懒加载
      myLazyLoad(node, resolve) {
        //获取层级
        const {level} = node
        const {children} = node
        const {data} = node
        console.log(node)
        if (!node.root) {
          let nodes = [];
          this.$http.get('/type/getChildren?parentId=' + node.value)
            .then(res => {
              if (res.code === 10000) {
                for (let item of res.data) {
                  nodes.push(item);
                }
              }
              resolve(nodes)
            });
        }
      },

    }

  }
</script>
