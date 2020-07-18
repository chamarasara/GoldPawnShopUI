import _ from 'lodash';
import {
    SEARCH_REPORTS,
    SEARCH_REPORTS_DATE,
} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case SEARCH_REPORTS_DATE:
            return { ...state, searchDates: action.payload };
        case SEARCH_REPORTS:
            return { ...state, ..._.mapKeys(action.payload, '_id') };
        default:
            return state;
    }
}
