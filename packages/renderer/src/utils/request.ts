import { notify } from '@kyvg/vue3-notification';
import axios from 'axios';

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: 'http://localhost:5000',
  timeout: 15000, // 请求超时时间
});

// 异常拦截处理器
const errorHandler = (error: any) => {
  notify({
    type: 'error',
    title: '服务器错误',
    text: '请稍后再试',
  });
  return Promise.reject(error);
};

// request interceptor
request.interceptors.request.use(config => {
  return config;
}, errorHandler);

// response interceptor
request.interceptors.response.use((response) => {
  const code = response.data.code;
  const msg = response.data.msg;

  if (code !== 0) {
    notify({
      type: 'error',
      title: '错误',
      text: msg,
    });
    return Promise.reject(response);
  }

  return response.data;
}, errorHandler);

export default request;
