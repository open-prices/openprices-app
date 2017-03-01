import React from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

export default connect((state, ownProps) => {
    return state.user
})(function NavbarUser(props) {
    var { username } = props
    if (!username) return null
    return (
        <Link className="btn btn-sm navbar-btn text-decoration-none" to="/user" style={{
            color:'white'
        }}>{username}</Link>
    )
})
