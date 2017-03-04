import axios from 'axios'

import { endpoint } from './config'

export function getProducts() {
    var ep = endpoint('/api/products')
    return axios.get(ep).then(response => response.data.data)
}

export function getProduct(barcode, options = {}) {

    var ep = endpoint('/api/products/' + barcode)
    return axios.get(ep).then(response => response.data.data).then(product => {
        if (options) {
            return getProductPrice(barcode).then(price => {
                return Object.assign(product, { price })
            })
        }
        return product
    })

}

export function getProductPrice(barcode) {
    var ep = endpoint('/api/products/' + barcode + '/price')
    return axios.get(ep).then(response => response.data.data)
}

export function getProductPrices(barcode) {
    var ep = endpoint('/api/products/' + barcode + '/prices')
    return axios.get(ep).then(response => response.data.data)
}

export function createProduct(barcode, name) {
    var ep = endpoint('/api/products')
    return axios.post(ep, {
        barcode, name
    }).then(r => r.data.data)
}
