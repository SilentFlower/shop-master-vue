
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
    return store.getters.user;
  }
  static setShopCart(shopCart) {
    store.commit('load_shopCart', shopCart)
  }
  static getShopCart() {
    return store.getters.shopCart;
  }
  static removeUser() {
    Auth.setUser({});
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
