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
    this.load();
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
