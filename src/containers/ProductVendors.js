import React from 'react'
import { connect } from 'react-redux'
import { StaticControl } from '../components/UI'

function ms2p(state, ownProps) {
    var product = state.products.productsByBarcode[ownProps.barcode]
    return {
        vendors: product.vendors
    }
}
function md2p(state, ownProps) {
    return {}
}

class ProductVendors extends React.Component {
    render() {
        var {
            vendors = []
        } = this.props
        return (
            <div className="flex">
                {vendors.map((vendor, i) => {
                    return (
                        <StaticControl key={i} label={vendor.code} value={vendor.name} size={6}/>
                    )
                })}
            </div>
        )
    }
}

export default connect(ms2p, md2p)(ProductVendors)
