import axios from 'axios'
const instance = axios.create({
    baseURL: 'http://kumanxuan1.f3322.net:8881/cms/',
    timeout:4000
})
// 请求拦截器
instance.interceptors.request.use(
    config => {
        let token = localStorage.getItem('x-auth-token');
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        console.log("请求拦截中",config);
        return config;//参数请求的数据
    },
   error=> {
        
    }
)


//相应拦截器
instance.interceptors.response.use(
    sucess => {
        return sucess.data;
    },
    error => {
        
    }
)
export default instance