import axios from "axios";
import {Message} from "element-ui";

// const baseURL =
// "http://www.easy-mock.com/mock/59b4a262e0dc663341a3c043/weixin/api";

const baseURL = "http://csq.weixin.caishangqing.com";
// const baseURL = "http://rap2api.taobao.org/app/mock/data/8528";

const fetch = axios.create({baseURL, timeout: 5e3, withCredentials: true});
fetch
  .interceptors
  .request
  .use(config => {
    // Do something before request is sent
    /* if (store.getters['user/token']) {
     config.headers['X-Token'] = store.getters['user/token'] // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    } */
    return config;
  }, error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  });

// respone拦截器
fetch
  .interceptors
  .response
  .use(response => {
    /**
     * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
     * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
     */
    const res = response.data;
    return res;
  }, error => {
    // for debug
    console.log("网路好像出问题了");
    return Promise.reject(error);
  });

export default fetch;
