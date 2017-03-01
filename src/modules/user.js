export const SET = 'USER/SET'
export const CLEAR = 'USER/CLEAR'

var init = {}
export default function reducer(state = init, action) {

    switch (action.type) {
        case SET:
            return Object.assign({}, state, action.payload)
        case CLEAR:
            return {}
        default:
            return state
    }

}

export function set(payload) {
    return {
        type: SET,
        payload
    }
}
export function clear() {
    return {
        type: CLEAR
    }
}
