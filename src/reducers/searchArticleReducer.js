import _ from 'lodash';
import {
    SEARCH_ARTICLE,
    SEARCH_ARTICLE_BY_TEXT,
    SEARCH_ARTICLE_DATE

} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {    
        case SEARCH_ARTICLE_BY_TEXT:
            return { ...state, searchText: action.payload };
        case SEARCH_ARTICLE_DATE:
            return { ...state, searchDates: action.payload };
        case SEARCH_ARTICLE:
            return { ...state, ..._.mapKeys(action.payload, '_id') };        
        default:
            return state;
    }
}
