import { createStore, compose, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import products from './modules/products'
import productsListFilters from './modules/productsListFilters'
import vendors from './modules/vendors'

var middleware = applyMiddleware(thunk)
var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ name: 'Products' }) : compose;
var enhancers = composeEnhancers(middleware);

var reducers = combineReducers({ products, productsListFilters, vendors })

var store = createStore(reducers, {}, enhancers)

export default store
