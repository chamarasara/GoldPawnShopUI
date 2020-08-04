import articles from "../apis/articles";
import activities from "../apis/activities";
import reports from '../apis/reports';
import * as jwt_decode from "jwt-decode";
import user from "../apis/user";
import history from '../history';
import moment from 'moment';
import {
    CREATE_ARTICLE,
    ARTICLE_EXISTS,
    FETCH_ARTICLES,
    FETCH_ARTICLE,
    EDIT_ARTICLE,
    DELETE_ARTICLE,
    SEARCH_ARTICLE,
    SEARCH_ARTICLE_BY_TEXT,
    SEARCH_ARTICLE_DATE,
    CREATE_USER,
    EDIT_USER,
    FETCH_USERS,
    FETCH_USER,
    DELETE_USER,
    AUTHENTICATED,
    UNAUTHENTICATED,
    AUTHENTICATION_ERROR,
    FETCH_RATES,
    EDIT_RATES,
    FETCH_ACTIVITIES,
    FETCH_REPORTS,
    SEARCH_REPORTS,
    SEARCH_REPORTS_DATE
} from './types';


//Add new article
export const newArticle = (formValues, previous_article_id) => async dispatch => {
    try {
        const token = sessionStorage.getItem('user');
        const decoded = jwt_decode(token);
        const userId = decoded.user_name;
        const header = { headers: { 'authorization': token } };
        console.log(formValues)
        const previous_article = previous_article_id;
        console.log(previous_article)
        const response = await articles.post('/articles', { ...formValues, userId, previous_article }, header);
        console.log(response)
        dispatch({ type: CREATE_ARTICLE, payload: response.data });
        window.location.reload();
    } catch (error) {
        dispatch({
            type: ARTICLE_EXISTS,
            payload: 'Article Number Already Exists'
        });
    }
    
};
//Fetch all articles
export const fetchArticles = () => async dispatch => {
    const token = sessionStorage.getItem('user');
    const header = { headers: { "authorization": token } };
    const response = await articles.get('/articles', header);
    dispatch({ type: FETCH_ARTICLES, payload: response.data });
};
//Search articles 
export const searchArticles = (searchText, startDate, endDate) => async dispatch => {
    const response = await articles.post('/articles/searchArticles', {searchText,startDate, endDate});
    //window.location.reload()
    dispatch({ type: SEARCH_ARTICLE, payload: response.data });
};
//Search article
export const searchArticlesByText = (searchText) => async dispatch => {
    dispatch({ type: SEARCH_ARTICLE_BY_TEXT, payload: searchText });
};
//Sort Article by date
export const searchArticlesByDate = (formvalues) => async dispatch => {
    dispatch({ type: SEARCH_ARTICLE_DATE, payload: formvalues });
};
//Fetch single article
export const fetchArticle = (id) => async dispatch => {
    console.log(id)
    const token = sessionStorage.getItem('user');
    console.log(token)
    var header = { headers: { "authorization": token } };
    const response = await articles.get(`/articles/${id}`, header);
    dispatch({ type: FETCH_ARTICLE, payload: response.data });
};
//Edit article
export const editArticle = (id, formValues, articleId) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const decoded = jwt_decode(token);
    const userId = decoded.user_name;
    const article_status = formValues.article_status;
    const current_date = moment().format('MM/DD/YYYY');
    const final_date = current_date;
    console.log(formValues)
    const header = { headers: { 'authorization': token } };
    const response = await articles.patch(`/articles/${id}`, { ...formValues, userId, articleId}, header);
    console.log(response)
    dispatch({ type: EDIT_ARTICLE, payload: id });    
    window.location.reload();
};
//Release article
export const releaseArticle = (id, formValues, articleId) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const decoded = jwt_decode(token);
    const userId = decoded.user_name;
    const current_date = moment().format('MM/DD/YYYY');
    const final_date = current_date;
    console.log(formValues)
    const header = { headers: { 'authorization': token } };
    const response = await articles.patch(`/articles/${id}`, { ...formValues, userId, articleId }, header);
    console.log(response)
    dispatch({ type: EDIT_ARTICLE, payload: id });
    history.push(`/singlearticle/${id}`);
};
//Delete article 
export const deleteArticle = (id) => async dispatch => {
    const token = sessionStorage.getItem('user');
    const decoded = jwt_decode(token);
    const userId = decoded._id;
    const header = { headers: { "authorization": token } };
    await articles.delete(`/articles/${id}`, header, { userId, id });
    dispatch({ type: DELETE_ARTICLE, payload: id });
    history.push('/allarticles');
};
//Add new user
export const createUser = formValues => async dispatch => {
    const response = await articles.post('/users/signup', formValues);
    dispatch({ type: CREATE_USER, payload: response.data });
    window.location.reload();
};
//List all users
export const fetchUsers = () => async dispatch => {
    const response = await articles.get('/users');
    dispatch({ type: FETCH_USERS, payload: response.data });
};
//View single user
export const fetchUser = (id) => async dispatch => {
    const response = await articles.get(`/users/${id}`);
    dispatch({ type: FETCH_USER, payload: response.data });
};
//Edit user
export const editUser = (id, formValues) => async dispatch => {
    const response = await articles.patch(`/users/${id}`, formValues);
    console.log(formValues)
    dispatch({ type: EDIT_USER, payload: id });
    window.location.reload()
};
//Delete user
export const deleteUser = (id) => async dispatch => {
    await articles.delete(`/users/${id}`);
    dispatch({ type: DELETE_USER, payload: id });
    history.push('/userlist');
};
//Autheticate User
export function signInAction({ user_name, password }, history) {
    return async (dispatch) => {
        try {
            const res = await user.post('/users/login', { user_name, password });
            console.log(res);
            sessionStorage.setItem('user', res.data.token)
            dispatch({ type: AUTHENTICATED, payload: res.data });
            console.log(res.data.token);            
            history.push('/');
            window.location.reload();
        } catch (error) {
            dispatch({
                type: AUTHENTICATION_ERROR,
                payload: 'Invalid username or password'
            });
        }
    };
}
//logout user
export function signOutAction() {
    sessionStorage.clear();
    window.location.reload();
    return {
        type: UNAUTHENTICATED
    };
}
//Fetch Rates
export const fetchRates = (id) => async dispatch => {
    const response = await articles.get(`/rates/${id}`);
    dispatch({ type: FETCH_RATES, payload: response.data });
};
export const editRates = (id, formValues) => async dispatch => {
    const response = await articles.patch(`/rates/${id}`, formValues);
    console.log(formValues)
    dispatch({ type: EDIT_RATES, payload: id });
    history.push('/settings');
};
//Activity log
export const activityLog = () => async dispatch => {
    const response = await activities.get('/activitylog');
    console.log(response.data)
    dispatch({ type: FETCH_ACTIVITIES, payload: response.data });
};

export const dailyReports = () => async dispatch => {
    const response = await activities.get('/reports');
    console.log(response.data)
    dispatch({ type: FETCH_REPORTS, payload: response.data });
};

//Search reports 
export const searchReports = (startDate, endDate) => async dispatch => {
    const response = await reports.post('reports/searchReports', { startDate, endDate });
    console.log(response.data);
    //window.location.reload()
    dispatch({ type: SEARCH_REPORTS, payload: response.data });
};
//Search reports by date
export const searchReportsByDate = (formvalues) => async dispatch => {
    //console.log(formvalues)
    dispatch({ type: SEARCH_REPORTS_DATE, payload: formvalues });
};