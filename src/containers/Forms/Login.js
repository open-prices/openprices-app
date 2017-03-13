import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import LoginForm from '../../components/LoginForm'

import * as User from '../../modules/user.js'

import * as API from '../../api/auth'

function ms2p(state, ownProps) {
    return state.user
}
function md2p(dispatch, ownProps) {
    return {
        onSubmit: (username, password) => {
            API.login(username, password).then(user => {
                var action = User.set({
                    ...user.data,
                    token : user
                })
                dispatch(action)
            })
        }
    }
}

export default connect(ms2p, md2p)(props => {
    if (props.username) return (
        <Redirect to={{
            pathname: '/user',
            state: { from: props.location }
        }} />
    )
    return <LoginForm {...props} />
})
