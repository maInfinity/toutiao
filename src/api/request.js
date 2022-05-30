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

requests.interceptors.response.use(
    (res) => {
        return res.data
    },
    (err) => {
        return Promise.reject(new Error('fail'))
    }
)

export default requests
