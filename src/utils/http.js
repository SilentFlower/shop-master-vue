/**
 * ajax请求配置
 */
import axios from 'axios';
import Auth from '@/utils/auth.js';
// import Bridge from '@/utils/frame-bridge.js';
import { MessageBox, Message } from 'element-ui';


// axios默认配置
axios.defaults.withCredentials = true;
axios.defaults.timeout = 10000;   // 超时时间
axios.defaults.baseURL = "http://127.0.0.1:11000/master";  // 默认地址


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
    if(result.code === 10001){
      console.log(result.data);
      Auth.setToken(result.data);
    }

    // 请求码大于11000或等于-99的均为异常情况
    if (result.code >= 11000 || result.code === -99) {
      // 窗口通知
      Message({
        message: result.data || result.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })


      // 11000: token失效或者无token代表登录状态异常;
      if (result.code === 11000) {
        // to re-login
        Auth.removeToken();
        MessageBox.confirm('您已注销，可以取消停留在此页面上，或者再次登录', '确认注销', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log("未登录")
          //  清除Token信息并跳转到登录页面
          Bridge.logout();

        })
      }
      return Promise.reject(new Error(JSON.stringify(result)|| 'Error'))
    }

    return result
  },
  error => {
    return Promise.reject(error.response)   // 返回接口返回的错误信息
  });

export default axios;
