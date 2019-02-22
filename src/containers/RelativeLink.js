import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'

import path from 'path'

class RelativeLink extends React.Component {
    
    render() {
        var { router } = this.context
        var { match } = router

        var to = path.join(match.url, this.props.to)
        return <Link {...this.props} to={to}></Link>
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


export default RelativeLink
