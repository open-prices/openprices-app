import React from 'react'
import { Route, Link, Switch } from 'react-router-dom'

import RequireUser from '../containers/RequireUser'

import { Card } from '../components/UI'
import AddProductForm from '../components/AddProductForm'

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
                        <Card style={{ marginBottom: '1rem' }}>
                            <ProductsListFilters {...props} />
                            <Link to={path.join(match.url, 'create')}>Add {match.url}</Link>
                        </Card>
                        <Card>
                            <ProductsList {...props} />
                        </Card>
                    </div>
                )} />
                <Switch>

                    <Route path={path.join(match.path, '/create')} render={props => (
                        <RequireUser>
                            <Card>
                                <AddProductForm />
                            </Card>
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
