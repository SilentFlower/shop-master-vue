/**
 * ajax请求配置
 */
import axios from 'axios';
import Auth from '@/utils/auth.js';
// import Bridge from '@/utils/frame-bridge.js';
import { MessageBox, Message } from 'element-ui';


// axios默认配置
axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;
axios.defaults.timeout = 10000;   // 超时时间
axios.defaults.baseURL = "https://shop.747698.xyz/api/master";  // 默认地址


// 请求拦截
// http request 拦截器
axios.interceptors.request.use(
  config => {
    //判断是否存在token，如果存在的话，则每次请求都携带token
    if(Auth.getToken()){
      config.headers[Auth.getTokenKey()] = Auth.getToken();
    }
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    return config;
  },
  error => {
    return Promise.reject(error.response);
  });

// 响应拦截
// http response 拦截器
axios.interceptors.response.use(
  response => {
    const result = response.data
    console.log(result.code);
    if(result.code === 10001){
      console.log(result.data);
      Auth.setToken(result.data.token);
      Auth.setUser(result.data.user);
    }

    // 11000: token失效或者无token代表登录状态异常;
    if (result.code == 11000) {
      console.log("???")
      Auth.removeToken();
      Auth.removeUser();
    }

    // 请求码大于11000或等于-99的均为异常情况
    if (result.code >= 11001 || result.code === -99) {
      // 窗口通知
      Message({
        message: result.data || result.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(JSON.stringify(result)|| 'Error'))
    }
    return result
  },
  error => {
    return Promise.reject(error.response)   // 返回接口返回的错误信息
  });

export default axios;
