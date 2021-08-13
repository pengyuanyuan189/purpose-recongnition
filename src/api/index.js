import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://121.48.164.243:8000/api',
  timeout: 10000,
  headers:{'Content-Type':'application/x-www-form-urlencoded'},
});

// 添加请求拦截器
instance.interceptors.request.use(config => {
  // 在发送请求之前做某事，比如说 设置token
  console.log(config);
  return config;
}, error => {
  // 请求错误时做些事
  return Promise.reject(error);
});

// // 添加响应拦截器
instance.interceptors.response.use(response => {
  // 对响应数据做些事
  if (response.status === 200) {
    return response.data;
  }
  return response;
}, error => {
  return Promise.reject(error); // 返回接口返回的错误信息
})

export default instance;