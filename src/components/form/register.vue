<template>
  <el-dialog
    width="480px"
    custom-class="sign-up"
    :modal-append-to-body='false'
    :visible.sync="dialogVisible"
    :before-close="onClose">
    <div slot="title">
      <h1 class="signup-heading">注册</h1>
      <a href="#" class="signup-google" v-google-signin-button="clientId">
        <img class="google" src="static/google.png">
        <span class="signup-google-text">第三方注册</span>
      </a>
      <div class="signup-or">
        <span class="signup-or-text">或</span>
      </div>
      <el-form ref="form" :model="form" class="wtf" :rules="rules">
        <el-form-item prop="account" label="用户名">
          <el-input v-model="form.account" type="text"  placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="nickName" label="昵称">
          <el-input v-model="form.nickName" type="text"  placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item prop="passwords" label="密码">
          <el-input v-model="form.passwords" type="password"  placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item prop="passwordsRep" label="再次输入密码">
          <el-input v-model="form.passwordsRep" type="password"  placeholder="重复密码"></el-input>
        </el-form-item>
      </el-form>
      <button class="form-submit" @click="submit">注册</button>
      <p class="signup-already">
        已经注册?
        <a href="javascript:void(0);" class="signup-already-link" @click="goToLogin">登陆</a>
      </p>
    </div>
  </el-dialog>
</template>

<script>
  import jsonwebtoken from 'jsonwebtoken'
  import GoogleSignInButton from 'vue-google-signin-button-directive'
  export default {
    directives: {
      GoogleSignInButton,
      jsonwebtoken
    },
    data() {
      var validatePass1 = (rule, value, callback) => {
        if (value === this.form.account) {
          callback(new Error('密码不能与用户名相同'))
        } else {
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.form.passwords) {
          callback(new Error('两次输入密码不一致!'))
        }
        else {
          callback()
        }
      }
      return {
        clientId:'148612162992-qr5f26e18vn3nm7rg7nlmceitsv4e7l0.apps.googleusercontent.com',
        form: {
          account:null,
          passwords:null,
          passwordsRep:null,
          nickName:null,
        },
        rules:{
          account:[
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur' },
          ],
          nickName:[
            { required: true, message: '请输入昵称', trigger: 'blur' },
            { max: 20, message: '最多20个字符', trigger: 'blur' },
          ],
          passwords:[
            { required: true, validator: validatePass1, trigger: 'blur' },
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 24, message: '长度在 6 到 24 个字符', trigger: 'blur' },
          ],
          passwordsRep:[
            { required: true, validator: validatePass2, trigger: 'blur' }
          ],
        },

      };
    },
    props:{
      dialogVisible:Boolean
    },
    methods: {
      onClose(){
        this.$emit('close');
      },
      OnGoogleAuthSuccess (idToken) {
        console.log(idToken,"tokesdasdasd") //返回第三方结果信息 默认是全token 要用jsonwebtoken 解析
        console.log(jsonwebtoken.decode(idToken))
        // Receive the idToken and make your magic with the backend
      },
      OnGoogleAuthFail (error) {
        console.log(error)
      },
      //返回注册界面
      goToLogin(){
        this.onClose();
        this.$emit('openLogin');
      },
      //注册
      submit(){
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$http.post('/user/addUser',this.form)
              .then(res => {
                if(res.code === 10000){
                  this.$message.success("注册成功")
                  this.goToLogin();
                }else{
                  if (res.data != null) {
                    this.$message.error(res.data);
                  }else{
                    this.$message.error(res.message);
                  }
                }
              });
          }
          else{
            this.$message.error("表单未填写完整");
          }
        });
      },

    }
  };
</script>
<style>
  .google{
    width: 50px;
    height: 50px;
    border-radius: 10px;
    background-color: white;
  }
  .sign-up {
    padding: 28px 53px;
    background-color: white;
    border-radius: 30px;
    width: 100%;
    max-width: 480px;
  }
  .signup-heading {
    text-align: center;
    font-weight: 600;
    color: #363A40;
    font-size: 35px;
    margin-bottom: 35px;
  }
  .signup-google {
    display: -webkit-box;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    width: 100%;
    border-radius: 16px;
    background-color: #4C6EF4;
    text-decoration: none;
    padding: 8px;
    margin-bottom: 45px;
    box-shadow: 0 10px 20px -5px rgba(76, 110, 244, 0.9);
  }
  .signup-google-text {
    color: white;
    font-weight: 500;
    display: block;
    margin: 0 auto;
  }
  .signup-or {
    color: #363A40;
    display: block;
    text-align: center;
    position: relative;
    margin-bottom: 55px;
  }
  .signup-or-text {
    display: inline-block;
    padding: 5px 20px;
    background-color: white;
    position: relative;
    font-size: 14px;
  }
  .signup-or:before {
    content: "";
    height: 1px;
    width: 100%;
    position: absolute;
    top: 50%;
    left: 0;
    background-color: #999;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
  }
   .wtf .el-input__inner {
     display: block;
     width: 100%;
     padding: 20px;
     height: 55px;
     border-radius: 15px;
     border: 0;
     outline: none;
     font-family: "Poppins", sans-serif;
     background-color: #F2F3F5;
     color: #363A40;
     font-size: 16px;
  }

  .form-submit {
    display: block;
    margin-top: 45px;
    width: 100%;
    padding: 20px;
    color: white;
    text-align: center;
    cursor: pointer;
    border: 0;
    border-radius: 15px;
    background-color: #81C91D;
    font-size: 16px;
    font-weight: 500;
    font-family: "Poppins", sans-serif;
    margin-bottom: 20px;
    box-shadow: 0 10px 20px -5px rgba(129, 201, 29, 0.9);
    outline: none;
  }
  .signup-already {
    text-align: center;
    color: #363A40;
    font-size: 13px;
  }
  .signup-already-link {
    color: #4C6EF4;
    text-decoration: none;
  }
</style>



