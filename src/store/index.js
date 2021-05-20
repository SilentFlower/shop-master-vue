import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

/**
 * Vuex全局状态管理
 * @param options {Array} 用于渲染tabs的数组
 */
const store = new Vuex.Store({
  state: {
    firstFlag:true,
    user: {},
    token:'',
  },
  mutations: {
    //首次加载标志
    changeFlag(state) {
      state.firstFlag = false;
    },
    // 设置详情信息
    load_user(state, user) {
      this.state.user = user;
    },
    //加载token
    load_token(state,token) {
      this.state.token = token;
    },
  },
  getters: {
    firstFlag:state => {
      return state.firstFlag;
    },
    token: state => {
      return state.token;
    },
    user: state => {
      return state.user;
    },
  }

});

export default store;
