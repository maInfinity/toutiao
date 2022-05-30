export default {
    getToken() {
        return localStorage.getItem('token')
    },
    setToken(key, value) {
        localStorage.setItem(key, value)
    }
}