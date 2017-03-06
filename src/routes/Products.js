import React from 'react'
import { Route, Link, Switch } from 'react-router-dom'

import RequireUser from '../containers/RequireUser'

import { Card } from '../components/UI'
import AddProductForm from '../containers/Forms/AddProduct'
import AddProductPrice from '../containers/Forms/AddProductPrice'

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
                        <div style={{ marginBottom: '1rem' }} className="flex flex-space-around">
                            <ProductsListFilters {...props} className="shadow" />
                            <Link className="btn btn-default shadow" to={path.join(match.url, 'create')}>Add</Link>
                        </div>
                        <Card>
                            <ProductsList {...props} />
                        </Card>
                    </div>
                )} />
                <Switch>
                    <Route path={path.join(match.path, '/create')} render={props => (
                        <RequireUser>
                            <div>
                                <Card>
                                    <h4>Add a product</h4>
                                </Card>
                                <AddProductForm />
                            </div>
                        </RequireUser>
                    )} />
                    <Route path={path.join(match.path, '/:barcode/prices/add')} render={(props) => (
                        <RequireUser>
                            <AddProductPrice {...props} barcode={props.match.params.barcode} />
                        </RequireUser>
                    )} />
                    <Route path={path.join(match.path, '/:barcode')} render={(props) => (
                        <ProductDetails {...props} barcode={props.match.params.barcode} />
                    )} />
                </Switch>
            </div>
        )
    }
}

export default Products
