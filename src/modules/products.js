export const ADD = 'PRODUCTS/ADD'
export const DELETE_PRICE = 'PRODUCTS/PRICES/DELETE'

var init = {
    products: [],
    productsByBarcode: {}
}
export default function reducer(state = init, action) {

    switch (action.type) {
        case ADD:
            return onAdd(state, action)
        case DELETE_PRICE:
            return onDeletePrice(state, action)
        default:
            return state
    }

}

export function add(product) {
    return { type: ADD, payload: product }
}
export function deletePrice(price) {
    return {
        type: DELETE_PRICE,
        payload: price
    }
}
function onAdd(state, action) {

    var { payload } = action
    var { barcode } = payload

    var products = state.products
    var productsByBarcode = state.productsByBarcode

    if (products.indexOf(payload.barcode) === -1) {
        products = products.concat(payload.barcode).sort()
    }

    var product = productsByBarcode[barcode]
    productsByBarcode[barcode] = Object.assign({}, product, payload)

    return Object.assign({}, state, {
        products, productsByBarcode
    })

}
function onDeletePrice(state, action) {

    var { payload } = action

    var { products, productsByBarcode } = state

    products.map(barcode => {
        var product = productsByBarcode[barcode]
        if (!product.prices) return
        product.prices = product.prices.filter(price => {
            return price.id !== payload.id
        })
        productsByBarcode[barcode] = product
    })

    return Object.assign({}, state, {
        products, productsByBarcode
    })

}