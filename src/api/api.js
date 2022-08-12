import axios from 'axios'
//单独引入一个loading组件;
import { Loading } from "element-ui";
// 导入 NProgress 包对应的JS和CSS
let loadingAll;//配置一个loading实例，方便后面使用
let loading_count = 0; //请求计数器
function startLoading() {
  if (loading_count == 0) {
    loadingAll = Loading.service({
      lock: true,
    //   text: "别急，请求加载数据中...",
      fullscreen: true,
      background: "rgba(0,0,0,0.7)",
    //   spinner: "el-icon-loading", //自定义加载图标类名
    });
  }
  //请求计数器
  loading_count++;
}

function endLoading() {
  loading_count--; //只要进入这个函数，计数器就自减，直到。。
  if (loading_count <= 0) {
    loadingAll.close();
  }
}

const instance = axios.create({
    baseURL:"/api",
    timeout:5000
})

// 请求拦截
instance.interceptors.request.use(config=>{
    //请求拦截
    startLoading();
    config.headers.token = "wwwwwwwwwwwww"
    return config
},(error)=>{
  return Promise.reject(error)
})

// 相应拦截
instance.interceptors.response.use(response=>{
    // 对响应数据做点什么
    
    setTimeout(()=>{
        endLoading();
    },300)
    return response;
},(error)=>{
  return Promise.reject(error)
});
export default instance;
