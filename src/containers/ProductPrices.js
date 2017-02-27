import React from 'react'
import { connect } from 'react-redux'
import { StaticControl } from '../components/UI'

import { getProductPrices } from '../api/products'
import * as Products from '../modules/products'

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
            <div className="flex">
                {prices.map((price, i) => {
                    return (
                        <StaticControl key={i} label={price.date} value={price.price} size={6} />
                    )
                })}
            </div>
        )
    }
}

export default connect(ms2p, md2p)(ProductPrices)
