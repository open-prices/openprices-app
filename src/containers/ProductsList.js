import { connect } from 'react-redux'

import * as API from '../api/products'
import * as Products from '../modules/products'

import ProductsList from '../components/ProductsList'

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
            var matches_name = product.name.toLowerCase().indexOf(filters.name.toLowerCase()) !== -1
            var matches_barcode = product.barcode.toLowerCase().indexOf(filters.name.toLowerCase()) !== -1

            return matches_name || matches_barcode
        })
    }

    return {
        products: (filtered_products || simple_products).sort((a, b) => {
            return a.name.localeCompare(b.name)
        })
    }
}

export default connect(ms2p, (dispatch, ownProps) => {
    return {
        loadProduct(barcode) {
            return API.getProduct(barcode).then(product => {
                dispatch(Products.add(product))
            })
        },
        loadProducts() {
            return API.getProducts().then(ps => {
                ps.map(p => { return dispatch(Products.add(p)) })
                return ps
            })
        }
    }
})(ProductsList)
