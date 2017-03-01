export var BASE_URL = (function resolveBaseURL() {
    
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