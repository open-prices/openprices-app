export const ADD = 'USERS/ADD'
export const REMOVE = 'USERS/REMOVE'

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

export function add(user) {
    return {
        type: ADD,
        payload: user
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

    var user = byId[payload.id]
    byId[payload.id] = Object.assign({}, user, payload)

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