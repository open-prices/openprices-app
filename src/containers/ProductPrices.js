import React from 'react'
import { connect } from 'react-redux'

import * as API from '../api'

import * as Products from '../modules/products'
var { getProductPrices } = API.Products

import * as Vendors from '../modules/vendors'
var { getVendor } = API.Vendors



function ms2p(state, ownProps) {
    var product = state.products.productsByBarcode[ownProps.barcode]
    return {
        prices: product.prices || []
    }
}
function md2p(dispatch, ownProps) {
    var { barcode } = ownProps
    return {
        load: () => {
            return getProductPrices(barcode).then(prices => {
                var action = Products.add({
                    barcode,
                    prices
                })
                dispatch(action)
                prices.map(price => {
                    return getVendor(price.vendor).then(vendor => {
                        var action = Vendors.add(vendor)
                        dispatch(action)
                    })
                })
            })
        }
    }
}

class ProductPrices extends React.Component {
    componentWillMount() {
        this.props.load(this.props.product)
    }
    render() {
        var { prices } = this.props
        return (
            <table className="table table-condensed">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Price</th>
                        <th>Vendor</th>
                        <th>User</th>
                    </tr>
                </thead>
                <tbody>
                    {prices.map((price, i) => {
                        return (
                            <tr key={i}>
                                <td>{new Date(price.date).toDateString()}</td>
                                <td>{price.price}</td>
                                <td><VendorName id={price.vendor} /></td>
                                <td>{price.user}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }
}

export default connect(ms2p, md2p)(ProductPrices)

var VendorName = connect((state, ownProps) => {
    var vendor = state.vendors.vendorsById[ownProps.id] || {}
    var name = vendor.name
    return { name }
})(function VendorName(props) {
    return <span>{props.name}</span>
})