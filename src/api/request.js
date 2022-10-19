//二次封装axios
import axios from 'axios';
//引入进度条 start:进度条开始  done：进度条结束
import nprogress from 'nprogress'
//引入store仓库
import store from '@/store'
//引入进度条样式
import 'nprogress/nprogress.css'
//创建axios实例
const requests = axios.create({
    //配置对象
    //基础路径，requests发出的请求在端口号后面会跟改baseURl
    baseURL: '/api',
    timeout: 5000,
});

//请求拦截器
requests.interceptors.request.use((config) => {
    //config内主要是对请求头Header配置
    //进度条开始
    nprogress.start()
    // if (store.state.detail.uuid_token) {
    //     //请求头添加字段
    //     config.headers.userTempId = store.state.detail.uuid_token
    // }
    if (store.state.user.token) {
        //请求头添加字段
        config.headers.token = store.state.user.token
    }
    return config;
});

//响应拦截器
requests.interceptors.response.use((res) => {
    //成功的回调函数
    //进度条结束
    nprogress.done()
    return res.data
}, (err) => {
    //失败的回调函数
    return Promise.reject(new Error(err))
});

export default requests;