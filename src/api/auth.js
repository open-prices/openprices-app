import axios from 'axios'

import { endpoint } from './config'

export function login(username, password) {
    var ep = endpoint('/api/auth/token')
    var data = { username, password }
    return axios.post(ep, data).then(response => {
        sessionStorage.access_token = response.data.jwt
        sessionStorage.access_token_decoded = JSON.stringify(response.data.data)
        return response.data.data
    })
}
export function logout() {
    var ep = endpoint('/api/auth/logout')
    
    delete sessionStorage.access_token
    delete sessionStorage.access_token_decoded

    return axios.get(ep)
}
export function register(username, password, nickname) {
    var ep = endpoint('/api/auth/register')
    return axios.post(ep, {
        username,
        password,
        nickname
    }).then(r => r.data.data)
}

export function verify() {
    return axios.get(endpoint('/api/user')).then(response => response.data.data)
}