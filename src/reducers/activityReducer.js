import _ from 'lodash';
import {
    FETCH_ACTIVITIES
} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_ACTIVITIES:
            return { ...state, ..._.mapKeys(action.payload, '_id') };
        default:
            return state;
    }
}
