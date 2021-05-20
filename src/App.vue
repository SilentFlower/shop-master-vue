<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
  import Auth from '@/utils/auth.js'
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    // 解决登陆成功后重新加载当前页面方法
    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    },
    initWindowMsgListen(){
      let _this = this;
      window.addEventListener('message',function(e){
        let msg = e.data;
        let type = msg.type; // Q代表提问，A代表回答,P代表推送
        let action = msg.action; // 动作
        let data = msg.data;
        if (type === 'A'){
          switch (action) {
            case 'getAuthToken': // 子系统向主系统请求获取用户登录token
              Auth.setToken(data);
              break;
            case 'getUserInfo':  // 子系统向主系统请求获取当前登录的用户信息
              data.user.roles = data.authorities.map(a=>a.authority);
              Auth.setUser(data.user);
              break;
            case 'getUserMenu':
              if(data!=null){
                Auth.setMenu(data[0].children);
              }
              break;
            case 'getUserFunc':
              Auth.setAuthority(data);// 初始化用户认证需要的相关数据
              break;
          }
        }else if(type === 'P'){
          switch (action) {
            case 'pushSystemID': // 子系统向主系统请求获取用户登录token
              Auth.setSystemID(data);
              window.parent.postMessage({type:'Q',action:'getAuthToken'},'*');
              window.parent.postMessage({type:'Q',action:'getUserInfo'},'*');
              window.parent.postMessage({type:'Q',action:'getUserMenu',data:{systemID:data}},'*');
              window.parent.postMessage({type:'Q',action:'getUserFunc'},'*');
              break;
          }
        }
      });
    },
   load(){
      //查看登陆状态
      let flag = this.$auth.getFirstFlag();
      if(flag){
        this.$http.get('/index')
          .then(res => {
            if(res.code === 10000){
              this.$auth.setToken(res.data.token)
              this.$auth.setUser(res.data.user)
            }
            this.$auth.firstFlagChange();
          })
      }
    }
  },
  mounted() {

  },
  created() {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store") ) {
      this.$store.replaceState(Object.assign({},this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
    }
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
      sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    })
    // this.initWindowMsgListen();
    this.load();
  },

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
  body{
    margin: 0px;
  }
</style>
