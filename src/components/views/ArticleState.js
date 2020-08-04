import React from 'react';
import { connect } from 'react-redux';
import { fetchArticle, editArticle, activityLog } from '../../actions';
import { reduxForm, Field } from 'redux-form';
import * as jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";

class ArticleState extends React.Component {
    componentDidMount() {
        //console.log(this.props.article)
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
        console.log(formValues)
    }
    toTotalAmountPaid() {
        var sum = 0;
        var values = this.props.activities;

        for (var i = 0; i < values.length; i++) {
            let record = values[i];
            if (record && record.released_amount && record.articleId == this.props.article.articleId) {
                sum += record.released_amount
            }
        }
        return sum;
    }
    toTotalInterestPaid() {
        var sum = 0;
        var values = this.props.activities;

        for (var i = 0; i < values.length; i++) {
            let record = values[i];
            if (record && record.interest_paid && record.articleId == this.props.article.articleId) {
                sum += record.interest_paid
            }
        }
        console.log('total', sum)
        return sum;
    }

    amountPayable(){
        const amountPawned = this.props.article.amount + this.props.article.additional_amount;
        const amountPaid = this.toTotalAmountPaid();
        const released_amount = amountPawned - amountPaid;
        console.log(released_amount)
        return released_amount;
    }
    interestPayable(){
        const interest = this.props.totalInterest + this.props.article.additional_charges;
        const interestPaid = this.props.article.interest_paid;
        const interest_paid = interest - interestPaid;
        console.log(interest_paid)
        return interest_paid;
    }
    releaseArticle(){
        const article_status = "Released";
        const formValues = {}
        const released_amount = this.amountPayable()
        const interest_paid = this.interestPayable()
        const values = {...formValues, released_amount, article_status, interest_paid}
        window.alert(values )
        console.log(values)
    }
    adminRendering() {
        const token = sessionStorage.getItem('user');
        const decoded = jwt_decode(token);
        if (decoded.user_role ===1 ) {
            return <Field name="article_status" component="select" label="Weight">
                <option>---</option>
                <option value="Active">Active</option>
                <option value="Released">Released</option>
                <option value="Blocked">Blocked</option>
                <option value="Expired">Expired</option>
                <option value="Renewed">Renewed</option>
            </Field>

        } else if (decoded.user_role === 2 || decoded.user_role === 3) {
            return <Field name="article_status" component="select" label="Weight">
                <option>---</option>
                <option value="Released">Released</option>
                <option value="Blocked">Blocked</option>
                <option value="Expired">Expired</option>
                <option value="Renewed">Expired</option>
            </Field>

        }
    }
    render() {
        //console.log(this.props)
        if (!this.props.article) {
            return <div>Something went wrong</div>
        }
        return (
            <div>
                <div className="" style={{ marginTop: "30px", marginBottom: "30px" }}>
                    <h5>Update Status of Article Number {this.props.article.articleId}</h5>
                    <form className="ui mini form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <div className="four fields">
                            <div className="field">
                                <label>Change State</label>
                                {this.adminRendering()}
                            </div>
                        </div>
                        <div className="field">
                            <button type="submit" className="ui primary button">Update Status</button>
                        </div>
                    </form>
                </div>
                <div>
                    <Link to={`/releasearticle/${this.props.article._id}`} className="ui red button">Release</Link>
                </div>
            </div>
            
        );
    }

}
const formWrapped = reduxForm({
    form: 'updateArticleStatus'
})(ArticleState);

//Map data from the store
const mapToSatate = (state, ownPorps) => {
    //console.log(ownPorps.article)
    const intId = '5f12c185e1b005f6656aca78';
    const activities = Object.values(state.activities)
    activities.reverse()
    console.log(ownPorps)
    return { interest: state.interest[intId], article: state.articles[ownPorps.article], activities: activities, amountPaid: ownPorps.toTotalAmountPaid, totalInterest: ownPorps.totalInterest };
}


export default connect(mapToSatate, { fetchArticle, editArticle, activityLog })(formWrapped);