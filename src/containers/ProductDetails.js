import React from 'react'
import { connect } from 'react-redux'
import { Route, Link, Switch } from 'react-router-dom'
import memoize from '../memoize'

import * as API from '../api/products'
var getProduct = memoize(API.getProduct, { expires: 1000 * 60 })

import * as Products from '../modules/products'

import { StaticControl, Card } from '../components/UI'

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
                <Card style={{ marginBottom: '1rem' }}>
                    <h4>{name}</h4>
                </Card>
                <Card style={{ marginBottom: '1rem' }}>
                    <div className="form-horizontal">
                        <StaticControl label="Barcode" value={barcode} size={6} />
                        <StaticControl label="Name" value={name} size={6} />
                        <StaticControl label="Average Price" value={price ? price.toFixed(2) : null} size={6} />
                    </div>
                </Card>
                <Card style={{ marginBottom: '1rem' }}>
                    <ul className="nav nav-pills nav-justified">
                        <Route exact path={match.url + '/'} children={(props) => (
                            <li className={props.match ? 'active' : ''}>
                                <Link to={match.url}>description</Link>
                            </li>
                        )} />
                        <Route exact path={match.url + '/prices'} children={(props) => (
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
                </Card>
                <Switch>
                    <Route exact path={match.url} />
                    <Route render={() => (
                        <Card>
                            <div className="" style={{ padding: '1rem' }}>
                                <Route path={match.url + '/vendors'} render={(props) => (<ProductVendors barcode={barcode} />)} />
                                <Route exact path={match.url + '/prices'} render={(props) => (
                                    <div>
                                        <Link className="btn btn-default" to={match.url + '/prices/add'}>
                                            <i className="fa fa-plus" />
                                            <span> Add price</span>
                                        </Link>
                                        <ProductPrices barcode={barcode} />
                                    </div>
                                )} />
                            </div>
                        </Card>
                    )} />
                </Switch>
            </div>
        )
    }
}

export default connect(ms2p, md2p)(ProductDetails)
