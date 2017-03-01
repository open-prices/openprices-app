import React from 'react'
import { Link, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'

import { clear } from '../modules/user'
import * as API from '../api/auth'

export default connect((state, ownProps) => {
    return { user: state.user }
}, (dispatch, ownProps) => {
    return {
        verify : ()=>{
            API.verify().then(user => {

            }).catch(err => {
                dispatch(clear())
            })
        }
    }
})(function User(props) {
    //props.verify()
    var { username } = props.user

    if (!username) return (
        <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
        }} />
    )

    return (
        <pre>{JSON.stringify(props.user, null, 2)}</pre>
    )
})
