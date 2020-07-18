
import { AUTHENTICATED, UNAUTHENTICATED, AUTHENTICATION_ERROR } from '../actions/types';
export default (state = {}, action)=> {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case AUTHENTICATED:
            localStorage.setItem('user', action.payload.token);
            return { ...state, token: action.payload.token, authenticated: true };
        case UNAUTHENTICATED:
            return { ...state, authenticated: false };
        case AUTHENTICATION_ERROR:
            localStorage.removeItem('user');
            //window.location.reload()
            return { ...state, error: action.payload, authenticated: false };
        default:
            return state;
    }
}
