import React from 'react'
import { connect } from 'react-redux'

import { Button, Popconfirm } from 'antd'

import * as API from '../api'
var { getProductPrices } = API.Products
var { getVendor } = API.Vendors

import * as Prices from '../modules/prices'
import * as Vendors from '../modules/vendors'



import UserNickname from './UserNickname'
import VendorName from './VendorName'



function ms2p(state, ownProps) {
    var product = state.products.productsByBarcode[ownProps.barcode]
    return {
        prices: state.prices.allIds.map(id => state.prices.byId[id]).filter(price => price.product === product.id)
    }
}
function md2p(dispatch, ownProps) {
    var { barcode } = ownProps
    return {
        load: () => {
            return getProductPrices(barcode).then(prices => {
                prices.map(price => {
                    var action = Prices.add(price)
                    return dispatch(action)
                })
                prices.map(p => p.vendor).filter((e, i, arr) => arr.indexOf(e) === i).map(vendor => {
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
                                    <UserNickname id={price.user} />
                                </td>
                                <td>
                                    <DeletePriceButton id={price.id} />
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

function RelativeDate(props) {
    var moment = require('moment')
    return <span>{moment(props.date).add(1, 'd').format('L')}</span>
}

var DeletePriceButton = connect((state, ownProps) => {

    var { id } = ownProps
    var { user, prices } = state

    var price = prices.byId[id]

    return {
        owns: user.id === price.user
    }

}, (dispatch, ownProps) => {

    var { id } = ownProps

    return {
        onClick() {

            dispatch(Prices.remove(id))

            return API.Products.deletePrice(id)

        }
    }

})(function DeletePriceButton(props) {
    if (!props.owns) return null
    return (
        <Popconfirm title="Delete price?" okText="yes" cancelText="no!" onConfirm={props.onClick}>
            <Button type="danger" size="small">
                <i className="fa fa-times" />
            </Button>
        </Popconfirm>
    )
})