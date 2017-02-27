import React from 'react'
import { Route } from 'react-router-dom'

import ProductsListFilters from '../containers/ProductsListFilters'
import ProductsList from '../containers/ProductsList'
import ProductDetails from '../containers/ProductDetails'

import path from 'path'

class Products extends React.Component {

    render() {
        var { match } = this.props
        return (
            <div>
                <Route exact path={match.url} component={(props) => (
                    <div>
                        <h4>ProductsList</h4>
                        <ProductsListFilters {...props} />
                        <ProductsList {...props} />
                    </div>
                )} />
                <Route path={path.join(match.path, '/:barcode')} render={(props) => (
                    <ProductDetails {...props} barcode={props.match.params.barcode} />
                )} />
            </div>
        )
    }
}

export default Products
