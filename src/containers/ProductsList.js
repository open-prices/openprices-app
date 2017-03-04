import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

function ms2p(state, ownProps) {
    var barcodes = state.products.products
    var productsByBarcode = state.products.productsByBarcode
    var filters = state.productsListFilters

    var simple_products = barcodes.map(bc => {
        var product = productsByBarcode[bc]
        return {
            barcode: bc,
            name: product.name || bc,
            price: product.price
        }
    });
    if (filters.name) {
        var filtered_products = simple_products.filter(product => {
            return product.name.toLowerCase().indexOf(filters.name.toLowerCase()) !== -1
        })
    }

    return {
        products: (filtered_products || simple_products).sort((a, b) => {
            return a.name.localeCompare(b.name)
        })
    }
}

class ProductsList extends React.Component {
    componentWillMount() {
        load()
    }
    render() {

        var { match, products } = this.props

        return (
            <div className="flex flex-wrap flex-space-around">
                {products.map(p => (
                    <div key={p.barcode} style={{
                        margin:'0.2rem',
                        padding:'0.5rem'
                    }}>
                        <Link className="ProductLink text-decoration-none" to={`${match.path}/${p.barcode}/prices`}>
                            {p.name}
                            {p.price && <span className=""> ({p.price})</span>}
                        </Link>
                    </div>
                ))}
            </div>
        )

    }
}

export default connect(ms2p)(ProductsList)

function load() {
    var store = require('../store').default
    require('../api/products').getProducts().then(ps => {
        ps.map(p => {
            return store.dispatch({
                type: 'PRODUCTS/ADD',
                payload: p
            })
        })
    })
}
