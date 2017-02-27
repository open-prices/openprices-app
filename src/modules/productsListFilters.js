export const SET = 'PRODUCTS_LIST_FILTERS/SET'

export default function reducer(state = {}, action) {

    switch (action.type) {
        case SET:
            return Object.assign({}, state, action.payload)
        default:
            return state
    }

}

export function set(obj) {
    return { type: SET, payload: obj }
}
