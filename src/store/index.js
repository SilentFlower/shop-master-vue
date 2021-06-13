import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

/**
 * Vuex全局状态管理
 * @param options {Array} 用于渲染tabs的数组
 */
const store = new Vuex.Store({
  state: {
    shopCart:null,
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
    //加载shopCart
    load_shopCart(state,shopCart) {
      this.state.shopCart = shopCart;
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
    shopCart: state => {
      return state.shopCart;
    },
  }

});

export default store;
