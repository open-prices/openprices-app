import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import * as API from '../api/users'
import * as Users from '../modules/users'

var UserNickname = connect((state, ownProps) => {

    var user = (state.users || {
        byId: {}
    }).byId[ownProps.id] || {}

    return {
        nickname: user.nickname
    }

}, (dispatch, ownProps) => {
    var { id } = ownProps
    return {
        load() {
            return API.findById(id).then(user => {
                dispatch(Users.add(user))
            })
        }
    }
})(props => {
    if (!props.nickname) {
        props.load()
    }
    return (
        <Link to={'/users/' + props.id} style={{ color: 'inherit', textDecoration: 'inherit' }}>
            {props.nickname}
        </Link>
    )
})

export default UserNickname
