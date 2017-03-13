import store from './store'

import * as User from './modules/user'

function checkToken() {
    var i = setInterval(() => {
        
        var { user } = store.getState()

        var { token } = user

        if (!token) return

        console.log('Job', 'isTokenExpired', token.exp < Date.now() / 1000)
        if (token.exp < Date.now() / 1000) {
            store.dispatch(User.clear())
        }

    }, 1000)
    return i
}

checkToken()
