import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class RequireUser extends React.Component {
    render() {
        var { username } = this.props
        //username = 'axel'
        if (!username) return (
            <Redirect to={{
                pathname: '/login',
                state: { from: this.props.location }
            }} />
        )

        return this.props.children
    }
}

export default connect((state, ownProps) => {
    return {
        username: state.user.username
    }
})(RequireUser)
