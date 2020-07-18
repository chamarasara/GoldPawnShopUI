import { combineReducers } from "redux";
import { reducer as formReducer} from 'redux-form';
import articleReducer from './articleReducer';
import searchArticleReducer from './searchArticleReducer'
import authReducer from './authReducer';
import  userReducer  from "./userReducer";
import _ from 'lodash';
import interestReducer from './interstReducer';
import activityReducer from "./activityReducer";
import reportsReducer from "./reportsReducer";
import searchReportsReducer from "./searchReportsReducer";
//import interstReducer from './interstReducer';


//All reports

//Combining Reducers 
export default combineReducers({
    articles: articleReducer,
    searchArticles: searchArticleReducer,
    users: userReducer,
    auth: authReducer,
    form: formReducer,
    interest: interestReducer,
    activities : activityReducer,
    reports: reportsReducer,
    searchReports: searchReportsReducer
});
//