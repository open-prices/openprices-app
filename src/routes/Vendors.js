import React from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { Card } from '../components/UI'

import path from 'path'

class Vendors extends React.Component {

    render() {
        var { match } = this.props
        return (
            <div>
                <Route exact path={match.url} component={(props) => (
                    <Card>
                        <VendorsList {...props} />
                    </Card>
                )} />
                <Route path={path.join(match.path, '/:id')} render={(props) => (
                    null
                )} />
            </div>
        )
    }
}

export default Vendors

var VendorsList = connect((state, ownProps) => {
    
    var { vendors, vendorsById } = state.vendors

    return {
        vendors : vendors.sort().map(id => vendorsById[id])
    }
})(function VendorsList(props) {
    return <pre>{JSON.stringify(props, null, 2)}</pre>
})