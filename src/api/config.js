import axios from 'axios'

(axios => {
    axios.defaults.baseURL = 'http://localhost:3001'
    axios.interceptors.request.use(function (config) {
        if (sessionStorage.access_token) {
            config.headers['Authorization'] = 'Bearer ' + sessionStorage.access_token
        }
        return config
    })
})(axios)


export var BASE_URL = (function resolveBaseURL() {

    if (localStorage.BASE_URL) return localStorage.BASE_URL

    var { hostname, port } = window.location

    switch (hostname) {
        case 'open-prices.github.io':
            return 'https://openprices-api.zapto.org'
        default:
            if (port === '3000') return 'http://localhost:3001'
            return ''
    }

})()

export function endpoint(path) {
    return BASE_URL + path
}