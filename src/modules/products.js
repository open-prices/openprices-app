export const ADD = 'PRODUCTS/ADD'

var init = {
    products: [],
    productsByBarcode: {}
}
export default function reducer(state = init, action) {

    switch (action.type) {
        case ADD:
            return onAdd(state, action)
        default:
            return state
    }

}

export function add(product) {
    return { type: ADD, payload: product }
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