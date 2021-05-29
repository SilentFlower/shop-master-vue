<!--商户信息页面-->
<template>
  <el-row class="MerchantInformation">
    <el-row style="border-bottom: 2px solid #F4F7FE;padding-bottom: 20px">
      <el-row style="float: left">
        <span class="tit">商户信息</span>
      </el-row>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-alert
        title="更改手机号请联系客服"
        type="info"
        show-icon>
      </el-alert>
    </el-row>
    <el-row style="margin-top: 20px;border-bottom: 2px solid #e4eaf1;padding-bottom: 20px" type="flex">
      <el-col :span="4">
        <span class="bll">{{firstName}}</span>
      </el-col>
      <el-col :span="20">
        <el-row>
          <el-col :span="4">
            <span>登陆账户{{userName}}</span>
          </el-col>
        </el-row>
        <el-row style="margin-top: 20px" type="flex" justify="flex-start">
            <span class="el-icon-mobile-phone">手机号码:<span :class="{'kk1':phone=='未填写'}" @click="addPhone">{{phone}}</span></span>
            <span class="el-icon-mobile-phone" style="margin-left: 20px">收款方式：<span :class="{'kk1':withdraw=='未补齐'}" @click="addWithdraw">{{withdraw}}</span></span>
        </el-row>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px;padding-left: 40px;padding-right: 180px">
      <el-form label-position="left" label-width="140px" :model="shopForm">
        <el-form-item label="商户联系方式">
          <el-input placeholder="填写的联系方式，将出现在店铺页面" v-model="shopForm.shopContactContent"></el-input>
        </el-form-item>
        <el-form-item label="店铺名称">
          <el-input placeholder="请填写店铺网站，将出现在店铺页面" v-model="shopForm.shopName"></el-input>
        </el-form-item>
        <el-form-item label="付款提示">
          <el-input type="textarea" placeholder="买家付款时弹出，建议写上售后联系方式，注意事项等" v-model="shopForm.shopMemo"></el-input>
        </el-form-item>
        <el-form-item label="店铺公告">
          <el-input type="textarea" placeholder="店铺公告在店铺页面展示，建议带上售后方式" v-model="shopForm.shopNotice"></el-input>
        </el-form-item>
        <el-form-item label="店铺图片" v-model="shopForm.shopPicUrl">
          <el-row type="flex">
            <el-col>
              <el-image :src="shopForm.shopPicUrl"  style="width: 128px;height: 128px"></el-image>
            </el-col>
            <el-col>
              <cropUpload @cropFinish="cropFinish"/>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <el-button type="success" @click="save">
        保存
      </el-button>
    </el-row>

    <el-dialog :visible.sync="phoneVisible" width="35%" v-if="phoneVisible">
      <div slot="title" class="dialogTitle">
        绑定手机号
      </div>
      <el-form :model="phoneForm" :rules="rules1" ref="phoneForm" style="margin-top: 20px">
        <el-form-item  prop="phone" label="手机号码" label-width="80px">
          <el-input type="number" v-model="phoneForm.phone">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="phoneVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitPhone">提 交</el-button>
      </div>
    </el-dialog>
    <withdrawInfo :withdrawVisible="withdrawVisible" @getWithdrawPre="getWithdrawPre" @close="closeWithdraw"></withdrawInfo>
  </el-row>
</template>
<style>
  .MerchantInformation {
    padding: 20px 50px 20px 50px;
  }
  .MerchantInformation .tit{
    width: 95%;
    font-size: 21px;
    font-weight: 700;
    color: #68728c;
    padding: 29px 13px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-bottom: -2px;
  }
  .MerchantInformation .bll{
    display: inline-block;
    width: 92px;
    height: 92px;
    border-radius: 50%;
    background: #b7c3cd;
    line-height: 92px;
    text-align: center;
    color: #fff;
    font-weight: 700;
    font-size: 40px;
  }
  .MerchantInformation .kk1{
    color: #4B79FA;
    cursor: pointer;
  }
</style>
<script>
  import cropUpload from "../../components/upload/crop-upload"
  import withdrawInfo from "../../components/form/withdrawInfo"
  export default {
    data() {
      var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'));
        } else {
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
          if (reg.test(value)) {
            callback();
          } else {
            return callback(new Error('请输入正确的手机号'));
          }
        }
      };
      return {
        rules1:{
          phone:[
            {required: true, message: '请输入相关内容', trigger: 'blur'},
            {validator: checkPhone,message: '请输入正确的手机号',trigger: 'blur'}
          ]
        },
        rules2:{
          withdrawType:[
            {required: true, message: '请输入相关内容', trigger: 'blur'},
          ],
          withdrawName:[
            {required: true, message: '请输入相关内容', trigger: 'blur'},
          ],
          withdrawAccount:[
            {required: true, message: '请输入相关内容', trigger: 'blur'},
          ]
        },
        phoneForm:{
          phone:null,
        },
        phoneVisible:false,
        withdrawVisible:false,
        phone:'未填写',
        //收款方式是否补齐
        withdraw:'未补齐',
        picFile:null,
        dialogVisible:true,
        userName:null,
        firstName:null,
        formData: "",
        //商户信息表单
        shopForm: {
          shopName: null, //商家名
          shopMemo: null, //商家备注
          shopNotice: null, //商家公告
          shopContactContent: null, //联系方式内容
          shopPicUrl: null,//图片
        }

      }
    },
    mounted() {
      this.userName = this.$auth.getUser().username;
      this.firstName = this.userName.slice(0,1)
      this.getshopInfo();
      this.getWithdrawPre();
      this.getPhonePre();
    },
    methods:{
      submitPhone(){
        this.$refs.phoneForm.validate((valid) => {
          if (valid) {
            this.$http.get('/user/setPhone?phone='+this.phoneForm.phone)
              .then(res => {
                if (res.code === 10000) {
                  this.$message.success("绑定成功");
                }else{
                  this.$message.success("绑定失败");
                }
                this.phoneVisible = false
                this.getPhonePre()
              });
          }else{
            this.$message.error("请填写相关内容");
          }
        })
      },
      //填写手机
      addPhone(){
        if (this.phone == '未填写') {
          this.phoneVisible = true;
        }
      },
      //填写提现方式
      getPhonePre(){
        this.$http.get('/user/getPhonePre')
          .then(res => {
            if (res.code === 10000) {
              if (res.data == '' || res.data == null) {
                this.phone = '未填写'
              }else{
                this.phone = res.data
              }
            }
          });
      },
      closeWithdraw(){
        this.withdrawVisible = false;
      },
      //补齐提现方式
      addWithdraw(){
        if (this.withdraw == '未补齐') {
          this.withdrawVisible = true;
        }
      },
      //提现预检查
      getWithdrawPre(){
        this.$http.get('/walletFlow/withdrawPre')
          .then(res => {
            if (res.code === 10000) {
              if (res.data == '正常') {
                this.withdraw = '已补齐'
              }
            }
          });
      },
      //完成裁剪
      cropFinish(file){
        this.picFile = file
        let str = URL.createObjectURL(file)
        this.shopForm.shopPicUrl = str
      },
      //读取商户信息
      getshopInfo(){
        this.$http.get('/shop/getShopInfo')
          .then(res => {
            if (res.code === 10000) {
              this.shopForm = res.data
              this.shopForm.shopPicUrl+='?'+Math.random();
            }
          });
      },
      //保存
      save(){
        this.formData = new FormData();
        this.formData.append('shopPic', this.picFile);
        this.formData.append('shopName', this.shopForm.shopName);
        this.formData.append('shopMemo', this.shopForm.shopMemo);
        this.formData.append('shopNotice', this.shopForm.shopNotice);
        this.formData.append('shopContactContent', this.shopForm.shopContactContent);
        this.$http.post('/shop/editShop', this.formData,{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then(res => {
            if (res.code === 10000) {
              this.$message.success("修改成功");
              this.getshopInfo();
            }
          });
      },
    },
    components:{
      cropUpload,
      withdrawInfo
    }
  }
</script>
