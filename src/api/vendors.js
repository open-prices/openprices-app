import axios from 'axios'

import { endpoint } from './config'

export function getVendors() {
    var ep = endpoint('/api/vendors')
    return axios.get(ep).then(response => response.data.data)
}

export function getVendor(id) {
    var ep = endpoint('/api/vendors/' + id)
    return axios.get(ep).then(response => response.data.data)
}
