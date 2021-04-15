import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

/**
 * Vuex全局状态管理
 * @param options {Array} 用于渲染tabs的数组
 */
const store = new Vuex.Store({
  state: {
    options: [],
    activeIndex: '/user',
    userInfo: {},
    authority: {
      empty: true, // 状态true 代表认证信息还没有初始化
      token:'',
      user: {}, // 当前登录的用户信息
      roles: [], // 全部 角色名称
      permissions: [], // 全部 权限id+权限名称
      urls: [], // 全部 权限uri
      buttons: [], // 部分 按钮id+按钮名称
      menus:[]
    }
  },
  mutations: {
    // 添加tabs
    add_tabs(state, data) {
      this.state.options.push(data);
    },
    // 删除tabs
    delete_all_tabs(state, route) {
      this.state.options = [];
    },
    // 删除tabs
    delete_tabs(state, route) {
      let index = 0;
      for (let option of state.options) {
        if (option.route === route) {
          break;
        }
        index++;
      }
      this.state.options.splice(index, 1);
    },
    // 设置当前激活的tab
    set_active_index(state, index) {
      this.state.activeIndex = index;
    },
    // 设置详情信息
    save_detail_info(state, info) {
      this.state.userInfo = info;
    },
    // 载入用户认证需要的相关数据
    load_authority(state, {
      user,
      authorities
    }) {
      this.state.authority.empty = false;
      if(Object.keys(this.state.authority.user).length === 0){
        this.state.authority.user = user;
      }
      if(this.state.authority.roles.length === 0){
        this.state.authority.roles = user.roles;
      }
      this.state.authority.permissions = authorities.map(a => a.funcId + '#' + a.funcName);
      this.state.authority.urls = authorities.map(a => a.funcUri);
      this.state.authority.buttons = authorities.filter(a => a.funcType === 2).map(a => a.funcId);
    },
    load_user(state,user) {
      this.state.authority.user = user;
      this.state.authority.roles = user.roles;
    },
    load_token(state,token) {
      this.state.authority.token = token;
    },
    load_menus(state,menus) {
      this.state.authority.menus = menus;
    }
  },
  getters: {
    authority: state => {
      return state.authority;
    },
    token: state => {
      return state.authority.token;
    },
    user: state => {
      return state.authority.user;
    },
    menus:state => {
      return state.authority.menus;
    }
  }

});

export default store;
