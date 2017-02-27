export const ADD = 'VENDORS/ADD'

var init = {
    vendors: [],
    vendorsById: {}
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
    var { id } = payload

    var vendors = state.vendors
    var vendorsById = state.vendorsById

    if (vendors.indexOf(id) === -1) {
        vendors = vendors.concat(id).sort()
    }

    var vendor = vendorsById[id]
    vendorsById[id] = Object.assign({}, vendor, payload)

    return Object.assign({}, state, {
        vendors, vendorsById
    })

}