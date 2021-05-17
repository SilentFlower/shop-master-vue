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
import Meta from "vue-meta";
import Auth from '@/utils/auth.js';
Vue.use(Meta);
Vue.prototype.$store=store
Vue.prototype.$qs=qs
Vue.prototype.$http = axios;
Vue.prototype.$auth = Auth;
Vue.config.productionTip = false

Vue.use(Element)
Vue.directive('resize',{
  bind(el, binding) { // el为绑定的元素，binding为绑定给指令的对象
    let width = '', height = '';
    function isReize() {
      const style = document.defaultView.getComputedStyle(el);
      if (width !== style.width || height !== style.height) {
        binding.value();  // 关键
      }
      width = style.width;
      height = style.height;
    }
    el.__vueSetInterval__ = setInterval(isReize, 300);
  },
  unbind(el) {
    clearInterval(el.__vueSetInterval__);
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'

})
