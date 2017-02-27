import React from 'react'
import { connect } from 'react-redux'
import { Route, Link, Switch } from 'react-router-dom'
import memoize from '../memoize'

import * as API from '../api/products'
var getProduct = memoize(API.getProduct, { expires: 1000 * 60 })

import * as Products from '../modules/products'

import { StaticControl } from '../components/UI'

import ProductVendors from './ProductVendors'
import ProductPrices from './ProductPrices'

function ms2p(state, ownProps) {
    var products = state.products.productsByBarcode
    var product = products[ownProps.barcode]

    return {
        product
    }
}
function md2p(dispatch, ownProps) {
    var { barcode } = ownProps
    return {
        loadDetails: () => {
            return getProduct(barcode).then(product => {
                dispatch(Products.add(product))
            })
        }
    }
}

class ProductDetails extends React.Component {
    componentWillMount() {
        this.props.loadDetails()
    }
    render() {
        console.log('ProductDetails.render', this.props)

        var { match, product } = this.props
        if (!product) return null
        var { name, barcode, price } = product

        return (
            <div>
                <h4>{name}</h4>
                <div className="form-horizontal">
                    <StaticControl label="Barcode" value={barcode} size={6} />
                    <StaticControl label="Name" value={name} size={6} />
                    <StaticControl label="Average Price" value={price} size={6} />
                </div>
                <ul className="nav nav-tabs nav-justified">
                    <Route path={match.url + '/prices'} children={(props) => (
                        <li className={props.match ? 'active' : ''}>
                            <Link to={match.url + '/prices'}>prices</Link>
                        </li>
                    )} />
                    <Route path={match.url + '/vendors'} children={(props) => (
                        <li className={props.match ? 'active' : ''}>
                            <Link to={match.url + '/vendors'}>vendors</Link>
                        </li>
                    )} />
                </ul>
                <Switch>
                    <Route exact path={match.url} />
                    <Route render={() => (
                        <div className="flex" style={{ border: '1px solid gainsboro', borderTop: 'none', padding: '1rem' }}>
                            <Route path={match.url + '/vendors'} render={(props) => (<ProductVendors barcode={barcode} />)} />
                            <Route path={match.url + '/prices'} render={(props) => (<ProductPrices barcode={barcode} />)} />
                        </div>
                    )} />
                </Switch>
            </div>
        )
    }
}

export default connect(ms2p, md2p)(ProductDetails)
