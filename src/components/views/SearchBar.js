import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { searchArticles, searchArticlesByText } from '../../actions';

class SearchBar extends React.Component {
    onClick = () => {
        window.location.reload()
    }
    onSubmit = (formvalues) => {
        const startDate = null;
        const endDate = null;
        const searchText = formvalues.searchText
        this.props.searchArticles(searchText, startDate, endDate)
        this.props.searchArticlesByText(formvalues.searchText)
    }
    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="Header">{error}</div>
                </div>
            );
        }
    }
    renderInput = ({ input, label, placeholder, type, meta }) => {
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} placeholder={placeholder}  type={type} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );
    }
    render() {
        return (
            <div className="search-bar ui segment">
                <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <div className="eight wide field">
                        <Field name="searchText" component={this.renderInput} label="Search" placeholder="Search by ID Number or Article Number" type="text" />
                    </div>
                    <button type="submit" className="ui primary button">Search</button>
                    <button onClick={this.onClick} className="ui red button">Clear</button>
                </form>
            </div>
        );
    };
};
const validate = (formvalues) => {
    const errors = {}
    if (!formvalues.searchText) {
        errors.searchText = 'Please enter ID Number or Article Number';
    }
    return errors;
}
const formWrapped = reduxForm({
    form: 'searchForm',
    validate: validate
})(SearchBar);
const mapToSatate = (state) => {
    //console.log(state.articles.searchText)
    return { searchText: state.articles.searchText };
}

export default connect(mapToSatate, { searchArticles, searchArticlesByText })(formWrapped);


