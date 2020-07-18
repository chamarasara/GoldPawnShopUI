import React from 'react';
import { connect } from 'react-redux';
import { fetchArticle, editArticle } from '../../actions';
import { reduxForm, Field } from 'redux-form';

class ArticlePayment extends React.Component {
    componentDidMount() {
        console.log(this.props)
        this.props.fetchArticle(this.props.article);
    }
    renderInput = ({ input, label, placeholder, type, meta, defaultValue }) => {
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} placeholder={placeholder} value={defaultValue} type={type} autoComplete="off" />
            </div>
        );
    }
    onSubmit = (formValues) => {
        this.props.editArticle(this.props.article._id, formValues, this.props.article.articleId);
        console.log(this.props.article.articleId)
    }
    render() {
        //console.log(this.props)
        if (!this.props.article) {
            return <div>Loading</div>
        }
        return (
            <div className="" style={{ marginTop: "30px", marginBottom: "30px" }}>
                <h5>Update Payments of Article Number {this.props.article.articleId}</h5>
                <form className="ui mini form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <div className="four fields">
                        <div className="field">
                            <Field name="released_amount" component={this.renderInput} label="Pay Amount" placeholder={this.props.article.released_amount} type="number" />
                        </div>                        
                        <div className="field">
                            <Field name="interest_paid" component={this.renderInput} label="Pay Interest" placeholder={this.props.article.interest_paid} type="number" />
                        </div> 
                        <div className="field">
                            <Field name="additional_amount" component={this.renderInput} label="Increase Amount" placeholder={this.props.article.additional_amount} type="number" />
                        </div>                       
                    </div>
                    <div className="field">
                        <button type="submit" className="ui primary button">Update Payments</button>
                    </div>
                </form>
            </div>
        );
    }

}
const formWrapped = reduxForm({
    form: 'articlePayments'
})(ArticlePayment);

//Map data from the store
const mapToSatate = (state, ownPorps) => {
    //console.log(ownPorps.article)
    return { article: state.articles[ownPorps.article] };
}


export default connect(mapToSatate, { fetchArticle, editArticle })(formWrapped);