// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
import axios from '@/utils/http';
import store from '@/store/index';
import qs from 'qs'


Vue.prototype.$store=store
Vue.prototype.$qs=qs
Vue.prototype.$http = axios;
Vue.config.productionTip = false

Vue.use(Element)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
