import React, { PropTypes } from 'react'
import { NavLink } from 'react-router-dom'

import path from 'path'

class RelativeNavLink extends React.Component {
    
    render() {
        var { router } = this.context
        var { match } = router

        var to = path.join(match.url, this.props.to)
        return <NavLink {...this.props} to={to}></NavLink>
    }

    static contextTypes = {
        router: PropTypes.shape({
            history: PropTypes.shape({
                push: PropTypes.func.isRequired,
                replace: PropTypes.func.isRequired,
                createHref: PropTypes.func.isRequired
            }).isRequired
        }).isRequired
    }

}


export default RelativeNavLink
