import React from 'react'
import { Redirect } from 'react-router-dom'

import { connect } from 'react-redux'

import { clear } from '../modules/user'
import * as API from '../api/auth'

import { ButtonGroup, Card } from '../components/UI'

export default connect((state, ownProps) => {
    return { user: state.user }
}, (dispatch, ownProps) => {
    return {
        verify: () => {
            API.verify().then(user => {

            }).catch(err => {
                dispatch(clear())
            })
        },
        logout() {
            dispatch(clear())
            return API.logout()
        }
    }
})(function User(props) {
    props.verify()
    var { username } = props.user

    if (!username) return (
        <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
        }} />
    )

    return (
        <div>
            <div style={{ marginBottom: '1rem', textAlign: 'right' }}>
                <ButtonGroup className="shadow">
                    <button className="btn btn-default" onClick={props.logout}>
                        <span>Logout </span>
                        <i className="fa fa-sign-out" />
                    </button>
                </ButtonGroup>
            </div>
            <Card>
                <pre>{JSON.stringify(props.user, null, 2)}</pre>
            </Card>
        </div>
    )
})
