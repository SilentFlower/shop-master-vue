<!--登陆页面-->
<template>
  <div>
    <el-container>
      <el-header>
        <router-link to="/blogs">
          <img src="https://www.markerhub.com/dist/images/logo/markerhub-logo.png"
               style="height: 60%; margin-top: 10px;">
        </router-link>
      </el-header>
      <el-main>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                 class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input type="text" maxlength="12" v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
    <button type="primary" @click="submit">登录</button>
    <button type="primary" @click="test">测试连接</button>
    <button type="primary" @click="logout">测试登出</button>
    <button type="primary" @click="edit">测试修改密码</button>
  </div>
</template>
<script>
  export default {
    name: 'Login',
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          password: null,
          username: null
        },
        rules: {
          password: [
            {validator: validatePass, trigger: 'blur'}
          ],
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      submit(){
        this.$http.post('/login',this.$qs.stringify(this.ruleForm),{
          headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
          .then(res => {
            if(res.code === 10000){
              alert("成功登陆");
            }
          });
      },
      test(){
        this.$http.get('/index')
          .then(res => {
            if(res.code === 10000){
              alert("成功登陆");
            }
          });
      },
      logout(){
        this.$http.post('/logout')
          .then(res => {
            if(res.code === 10000){
              alert("成功登出");
            }
          });
      },
      edit(){
        this.$http.post('/editPasswd')
          .then(res => {
            if(res.code === 10000){
              alert("成功修改");
            }
          });
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 提交逻辑
            this.$http.post('/login', this.ruleForm)
              .then(res => {
                if(res.code === 10000){
                  alert("成功登陆");
                }
              });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }

    },
    mounted() {
    }
  }
</script>
