<!--修改密码-->
<template>
  <el-row class="EditPwd">
    <el-row type="flex" align="middle" style="border-bottom: 2px solid #F4F7FE">
      <el-col class="tit" :span="8">
        {{title}}
      </el-col>
    </el-row>
    <el-row v-if="title=='修改密码'" style="margin-top: 20px;padding-right: 40px;padding-left: 40px">
      <el-form label-position="left" :rules="rules1" :model="editForm" ref="editForm" label-width="auto">
        <el-form-item prop="oldPwd">
          <template slot="label">
            <span class="label">输入旧密码</span>
          </template>
          <el-input type="password"style="width: 400px" v-model="editForm.oldPwd" placeholder="请输入旧密码">
          </el-input>
        </el-form-item>
        <el-form-item prop="newPwd">
          <template slot="label">
            <span class="label">输入新密码</span>
          </template>
          <el-input type="password" style="width: 400px" v-model="editForm.newPwd"placeholder="请输入新密码6-24位">
          </el-input>
        </el-form-item>
        <el-form-item prop="newPwdRep">
          <template slot="label">
            <span class="label">确认新密码</span>
          </template>
          <el-input type="password" style="width: 400px" v-model="editForm.newPwdRep" placeholder="再次输入新密码">
          </el-input>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-button v-if="title=='修改密码'" style="float: left;margin-left: 50px;margin-bottom: 20px" @click="editPwd">保存
      </el-button>
    </el-row>
    <el-row v-if="!(title=='修改密码')" style="margin-top: 20px;padding-right: 40px;padding-left: 40px">
      <el-form label-position="left" key="completeForm" :rules="rules2" :model="completeForm" ref="completeForm" label-width="auto">

        <el-form-item prop="account">
          <template slot="label">
            <span class="label">账户名</span>
          </template>
          <el-input type="text"style="width: 400px" v-model="completeForm.account" placeholder="请输入账户名">
          </el-input>
        </el-form-item>

        <el-form-item prop="pwd">
          <template slot="label">
            <span class="label">输入密码</span>
          </template>
          <el-input type="password" style="width: 400px" v-model="completeForm.pwd" placeholder="请输入密码6-24位">
          </el-input>
        </el-form-item>

        <el-form-item prop="pwdRep">
          <template slot="label">
            <span class="label">确认密码</span>
          </template>
          <el-input type="password" style="width: 400px" v-model="completeForm.pwdRep" placeholder="再次输入密码">
          </el-input>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-button v-if="!(title=='修改密码')" style="float: left;margin-left: 50px;margin-bottom: 20px" @click="completePwd">保存
      </el-button>
    </el-row>
  </el-row>
</template>
<style>
  .EditPwd{
    margin-left: 30px;
    margin-right: 30px;
    border-bottom: 2px solid #f4f7fe;
  }
  .EditPwd .tit {
    font-size: 21px;
    font-weight: 700;
    color: #68728c;
    padding: 29px 13px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-bottom: -2px;
  }
  .EditPwd .el-form-item {
    display: flex;
    justify-content: flex-start;
  }
  .EditPwd .label{
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
  }
</style>
<script>
  export default {
    inject: ['reload'],
    data() {
      let validatePass1 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.completeForm.newPwd) {
          callback(new Error('两次输入密码不一致!'))
        }
        else {
          callback()
        }
      }
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.editForm.newPwd) {
          callback(new Error('两次输入密码不一致!'))
        }
        else {
          callback()
        }
      }

      return {
        //标题默认的title
        title: '修改密码',
        //修改密码的表单
        editForm:{
          oldPwd:null,
          newPwd:null,
          newPwdRep:null,
        },
        completeForm:{
          account:null,
          pwd:null,
          pwdRep:null,
        },
        //表单验证
        rules1:{
          oldPwd:[
            {required: true, message: '请输入旧密码', trigger: 'blur'},
            { min: 6, max: 24, message: '长度在 6 到 24 个字符', trigger: 'blur' },
          ],
          newPwd:[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 24, message: '长度在 6 到 24 个字符', trigger: 'blur' },
          ],
          newPwdRep:[
            { required: true, validator: validatePass2, trigger: 'blur' }
          ],
        },
        rules2:{
          account:[
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur' },
          ],
          pwd:[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 24, message: '长度在 6 到 24 个字符', trigger: 'blur' },
          ],
          pwdRep:[
            { required: true, validator: validatePass1, trigger: 'blur' }
          ],
        }
      };
    },
    mounted() {
      if (this.$auth.getUser().password == 'false') {
        this.title = '完善账户名和密码(未注册)'
      }else{
        this.title = '修改密码'
      }
    },
    methods:{
      //第三方注册完善密码
      completePwd(){
        this.$refs.editForm.validate((valid) => {
          if(valid){
            this.$http.post('/user/completePwd',
              {
                pwd: this.completeForm.pwd,
                account: this.completeForm.account,
              }).then(res => {
              if (res.code === 10000) {
                this.$message.success("修改密码成功")
                this.$http.post('/logout').then(res => {
                  if (res.code === 11000) {
                    this.reload();
                    this.$router.push({
                      name:'主页'
                    });
                  }
                });
                //如果修改密码成功则回到首页并清除登陆
                this.$router.push({
                  name:'主页'
                })
              }else{
                this.$message.error(res.data)
              }
            });
          }else{
            this.$message.error("表单未填写完整");
          }
        })
      },
      //修改密码
      editPwd(){
        this.$refs.editForm.validate((valid) => {
          if(valid){
            this.$http.post('/user/editPwd',
              {
                oldPwd: this.editForm.oldPWd,
                newPwd: this.editForm.newPwd,
              }).then(res => {
              if (res.code === 10000) {
                this.$message.success("修改密码成功")
                this.$http.post('/logout').then(res => {
                  if (res.code === 11000) {
                    this.reload();
                    this.$router.push({
                      name:'主页'
                    });
                  }
                });
                //如果修改密码成功则回到首页并清除登陆
                this.$router.push({
                  name:'主页'
                })
              }else{
                this.$message.error(res.data)
              }
            });
          }else{
            this.$message.error("表单未填写完整");
          }
        })
      }
    },

  }
</script>
