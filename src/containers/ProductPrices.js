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
                prices.map(p => p.vendor).filter((e, i, arr) => {
                    return arr.indexOf(e) === i
                }).map(vendor => {
                    return getVendor(vendor).then(vendor => {
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
                <caption>
                </caption>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Price</th>
                        <th>Vendor</th>
                        <th>User</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {prices.map((price, i) => {
                        return (
                            <tr key={i}>
                                <td>
                                    <RelativeDate date={price.date} />
                                </td>
                                <td>{price.price}</td>
                                <td><VendorName id={price.vendor} /></td>
                                <td>
                                    {price.user}
                                </td>
                                <td>
                                    <DeletePriceButton price={price} priceId={price.id} userId={price.user} />
                                </td>
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

function RelativeDate(props) {
    var moment = require('moment')
    return <span>{moment(props.date).add(1, 'd').format('L')}</span>
}
var DeletePriceButton = connect((state, ownProps) => {
    
    var { price } = ownProps
    var { user } = state

    return { owns : user.id === price.user }

}, (dispatch, ownProps)=>{
    var { price } = ownProps
    return {
        onClick(){
            
            dispatch(Products.deletePrice(price))

            return API.Products.deletePrice(price.id)
        }
    }
})(function DeletePriceButton(props) {
    if (!props.owns) return null
    return (
        <button className="btn btn-danger btn-xs" onClick={props.onClick}>
            <i className="fa fa-times"/>
        </button>
    )
})