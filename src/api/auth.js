import axios from 'axios'

import { endpoint } from './config'

export function login(username, password) {
    var ep = endpoint('/api/auth/token')
    var data = { username, password }
    return axios.post(ep, data).then(response => response.data.data)
}

export function verify() {
    return axios.get(endpoint('/api/user')).then(response => response.data.data)
}