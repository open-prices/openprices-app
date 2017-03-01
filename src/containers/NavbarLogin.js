import React from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

export default connect((state, ownProps) => {
    return state.user
})(function NavbarLogin(props) {
    if (props.username) return null
    return <Link className="btn btn-sm btn-default navbar-btn" to="/login">Login</Link>
})
