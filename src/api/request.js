import axios from "axios";
import token from "@/utils/token";

const requests = axios.create({
    baseURL: 'http://geek.itheima.net/',
    timeout: 5000
})
requests.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token.getToken()}`
    return config
})

import router from '@/router'
requests.interceptors.response.use(
    (res) => {
        return res.data
    },
    (error) => {
        if (error.response.status === 401) { // 身份过期
            router.push({ path: '/login' })
        } 
        return Promise.reject(new Error('fail'))
    }
)

export default requests
