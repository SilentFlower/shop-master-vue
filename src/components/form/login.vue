<template>
  <el-dialog
    width="480px"
    custom-class="sign-up"
    :modal-append-to-body='false'
    :visible.sync="dialogVisible"
    :before-close="onClose">
    <div slot="title">
      <h1 class="signup-heading">登陆</h1>
      <a href="javascript:void(0);" class="signup-google" v-google-signin-button="clientId">
        <img class="google" src="static/google.png">
        <span class="signup-google-text">第三方登陆</span>
      </a>
      <el-form ref="form" :model="form" class="wtf" :rules="rules">
        <el-form-item prop="username" label="用户名">
          <el-input v-model="form.username" type="text"  placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model="form.password" type="password"  placeholder="密码"></el-input>
        </el-form-item>
      </el-form>
      <button  class="form-submit" @click="submit">登陆</button>
      <p class="signup-already">
        还未注册?
        <a href="javascript:void(0);" class="signup-already-link" @click="goToRegister">注册</a>
      </p>
    </div>
  </el-dialog>
</template>

<script>
  import jsonwebtoken from 'jsonwebtoken'
  import GoogleSignInButton from 'vue-google-signin-button-directive'
  export default {
    inject: ['reload'],
    directives: {
      GoogleSignInButton,
      jsonwebtoken,
    },
    data() {
      return {
        clientId:'148612162992-qr5f26e18vn3nm7rg7nlmceitsv4e7l0.apps.googleusercontent.com',
        form: {
          username:null,
          password:null,
        },
        rules:{
          username:[
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur' },
          ],
          password:[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 24, message: '长度在 6 到 24 个字符', trigger: 'blur' },
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
        let info = jsonwebtoken.decode(idToken);
        if (info.aud == this.clientId && info.exp > 0) {
          this.loginWithGoogle(info);
        }
      },
      //使用谷歌第三方登陆
      loginWithGoogle(info){
        this.$http.post('/user/loginWithGoogle', info)
          .then(res => {
            if (res.code === 10001) {
              this.$message.success("登陆成功");
              this.reload()
            }else{
              this.$message.error("登陆失败");
            }
          });
      },
      OnGoogleAuthFail (error) {
        console.log(error)
      },
      //登陆操作
      submit(){
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$http.post('/login',this.$qs.stringify(this.form),{
              headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            })
              .then(res => {
                if(res.code === 10001){
                  this.$message.success("登陆成功");
                  this.reload()
                }
              });
          }
          else{
            this.$message.error("表单未填写完整");
          }
        });
      },
      //返回注册界面
      goToRegister(){
        this.onClose();
        this.$emit('openRegister');
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
  .signup-google-icon {
    width: 50px;
    height: 50px;
    display: -webkit-box;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    color: #ff7870;
    border-radius: 10px;
    background-color: white;
    font-size: 25px;
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



