import _ from 'lodash';
import {
    FETCH_REPORTS,
    SEARCH_REPORTS_DATE
} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_REPORTS:
            return { ...state, ..._.mapKeys(action.payload, '_id') };
        default:
            return state;
    }
}
