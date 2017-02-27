import React from 'react'
import { connect } from 'react-redux'

import { getProduct } from '../api/products'

function ms2p() {
    return {}
}
function md2p(dispatch, ownProps) {
    var { barcode } = ownProps
    return {
        onClick: function (ev) {
            return getProduct(barcode).then(product => {
                dispatch({
                    type: 'PRODUCTS/ADD',
                    payload: product
                })
            })
        }
    }
}

function ProductRefresh(props) {
    var {
        className,
        onClick
    } = props
    return (
        <button className={className} onClick={onClick}>R</button>
    )
}

export default connect(ms2p, md2p)(ProductRefresh)
