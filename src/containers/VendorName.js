import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

var VendorName = connect((state, ownProps) => {
    var vendor = state.vendors.vendorsById[ownProps.id] || {}
    var name = vendor.name
    return { name }
})(function VendorName(props) {
    return (
        <Link to={'/vendors/' + props.id} style={{ color: 'inherit', textDecoration: 'inherit' }}>
            {props.name}
        </Link>
    )
})

export default VendorName
