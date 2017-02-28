import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

function ms2p(state, ownProps) {
    var barcodes = state.products.products
    var productsByBarcode = state.products.productsByBarcode
    var filters = state.productsListFilters
    console.log(state.productsListFilters)

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
        console.log('ProductsList.render')

        var { match, products } = this.props

        // eslint-disable-next-line
        var groups = splitArray(products, 15)

        var colWidth = Math.floor(12 / groups.length)

        return (
            <div className="row">
                {groups.map(products => (
                    <div key={products[0].barcode} className={'col-sm-' + colWidth}>
                        {products.map(p => (
                            <div key={p.barcode} className="ProductLink">
                                <Link to={`${match.path}/${p.barcode}/prices`}>{p.name}</Link>
                                {p.price && <span> ({p.price})</span>}
                            </div>
                        ))}
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

var splitArray = function splitArray(arr, size) {

    var arr2 = arr.slice(0),
        arrays = [];

    while (arr2.length > 0) {
        arrays.push(arr2.splice(0, size));
    }

    return arrays;
}