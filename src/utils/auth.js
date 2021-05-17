
import store from '@/store/index.js'

const TokenKey = 'S-TOKEN'
const Session = window.sessionStorage;
class Auth{

  static getTokenKey() {
    return TokenKey;
  }
  static getToken() {
    return store.getters.token
  }
  static setToken(token) {
    store.commit('load_token', token)
  }
  static removeToken() {
    Auth.setToken(null);
  }
  static setUser(user) {
    store.commit('load_user', user)
  }
  static getUser() {
    return store.getters.authority.user;
  }
  static removeUser() {
    Auth.setUser({});
  }
  static setAuthority(data) {
    store.commit('load_authority', {user:Auth.getUser(),authorities:data});
  }
  static getAuthority() {
    return store.getters.authority;
  }
  static setMenu(data) {
    store.commit('load_menus', data);
  }
  static getMenu() {
    return store.getters.menus;
  }

  static firstFlagChange() {
    store.commit("changeFlag");
  }

  static getFirstFlag() {
    return store.getters.firstFlag;
  }
  static clear() {
    Session.clear();
    store.replaceState({})
  }

}
export default Auth;
