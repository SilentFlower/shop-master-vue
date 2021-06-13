<template>
  <el-dialog
             :visible.sync="withdrawVisible"
             width="35%" v-if="withdrawVisible"
             :close-on-click-modal="false"
             :before-close=close
  >
    <div slot="title" class="dialogTitle">
      补齐提款方式
    </div>
    <el-form label-position="left" :model="withdrawForm" :rules="rules2" ref="withdrawForm" style="margin-top: 20px">
      <el-form-item  prop="withdrawType" label="收款类型" label-width="80px">
        <el-select v-model="withdrawForm.withdrawType">
          <el-option label="支付宝" value="支付宝">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item  prop="withdrawName" label="支付宝姓名" label-width="140px">
        <el-input v-model="withdrawForm.withdrawName">
        </el-input>
      </el-form-item>
      <el-form-item  prop="withdrawAccount" label="支付宝账号" label-width="140px">
        <el-input  v-model="withdrawForm.withdrawAccount">
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submitWithdraw">提 交</el-button>
    </div>
  </el-dialog>
</template>
<script>
  export default {
    data() {
      return {
        rules2: {
          withdrawType: [
            {required: true, message: '请输入相关内容', trigger: 'blur'},
          ],
          withdrawName: [
            {required: true, message: '请输入相关内容', trigger: 'blur'},
          ],
          withdrawAccount: [
            {required: true, message: '请输入相关内容', trigger: 'blur'},
          ]
        },
        withdrawForm:{
          withdrawType:null, //提款类型
          withdrawName:null, //提款姓名
          withdrawAccount:null, //提款账户
        },
      }
    },
    methods:{
      setWithdrawInfo(info){
        this.withdrawForm = info;
      },
      close() {
        this.$emit('close');
      },
      //提交提现绑定
      submitWithdraw(){
        this.$refs.withdrawForm.validate((valid) => {
          if (valid) {
            this.$http.post('/withdraw/addWithdraw',this.withdrawForm)
              .then(res => {
                if (res.code === 10000) {
                  this.$message.success("绑定成功");
                }else{
                  this.$message.success("绑定失败");
                }
                this.close()
                this.$emit('getWithdrawPre');
              });
          }else{
            this.$message.error("请填写相关内容");
          }
        })
      },
    },
    props:{
      withdrawVisible:Boolean
    }
  }
</script>
