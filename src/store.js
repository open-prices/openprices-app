import { createStore, compose, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import products from './modules/products'
import prices from './modules/prices'
import productsListFilters from './modules/productsListFilters'
import vendors from './modules/vendors'
import user from './modules/user'
import users from './modules/users'

var middleware = applyMiddleware(thunk)
var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ name: 'Products' }) : compose;
var enhancers = composeEnhancers(middleware);

var reducers = combineReducers({
    products,
    prices,
    productsListFilters,
    vendors,
    user,
    users
})

var store = createStore(reducers, {}, enhancers)

window.store = store

export default store
