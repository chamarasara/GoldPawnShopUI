import {
    FETCH_RATES,    
    EDIT_RATES,
} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_RATES:
            return { ...state, [action.payload._id]: action.payload };        
        case EDIT_RATES:
            return { ...state, [action.payload._id]: action.payload };        
        default:
            return state;
    }
}