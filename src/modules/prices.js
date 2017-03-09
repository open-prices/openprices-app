export const ADD = 'PRICES/ADD'
export const REMOVE = 'PRICES/REMOVE'

var init = {
    allIds: [],
    byId: {}
}
export default function reducer(state = init, action) {

    switch (action.type) {
        case ADD:
            return onAdd(state, action)
        case REMOVE:
            return onRemove(state, action)
        default:
            return state
    }

}

export function add(price) {
    return {
        type: ADD,
        payload: price
    }
}
export function remove(id) {
    return {
        type: REMOVE,
        payload: id
    }
}
function onAdd(state, action) {

    var { payload } = action

    var { allIds, byId } = state

    if (allIds.indexOf(payload.id) === -1) { allIds.push(payload.id) }

    var price = byId[payload.id]
    byId[payload.id] = Object.assign({}, price, payload)

    return Object.assign({}, state, {
        allIds,
        byId
    })

}
function onRemove(state, action) {

    var { payload } = action

    var { allIds } = state

    return Object.assign({}, state, {
        allIds: allIds.filter(id => id !== payload)
    })

}