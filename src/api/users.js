import axios from 'axios'

import { endpoint } from './config'

export function findById(id) {
    var ep = endpoint('/api/users/' + id)
    return axios.get(ep).then(response => response.data.data)
}
