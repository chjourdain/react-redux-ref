import * as actionTypes from '../actionTypes'

function handleLoginActions (state, action) {
    
    switch (action.type) {
        case actionTypes.LOGIN:
            return { isLogging: true };
        case actionTypes.LOGIN_SUCCESS:
            return {
                isLogged: action.isLogged,
                username: action.username,
                password: action.password,
                isLogging: false
            };
        case actionTypes.LOGIN_FAILURE:
            return {
                isLogged: false,
                isLogging: false,
                error: action.error
            }
        default:
            return state
    }
}

function loggingReducer (state = {}, action) {
    return Object.assign({}, state, handleLoginActions(state, action))
}

export default loggingReducer