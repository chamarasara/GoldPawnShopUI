import React from 'react';
import { connect } from 'react-redux';
import { fetchArticle, editArticle } from '../../actions';
import { reduxForm, Field } from 'redux-form';
import DateDiff from 'date-diff';
import { Link } from "react-router-dom";
import moment from 'moment';

class ArticleChangeAmount extends React.Component {
    componentDidMount() {
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
        const amountChangedDate = this.getCurrentDate()
        const additional_charges = this.getAdditionalCharges();
        const values = { ...formValues, amountChangedDate, additional_charges }
        this.props.editArticle(this.props.article._id, values, this.props.article.articleId);
    }
    getDateDifference() {
        const date1 = moment(this.props.article.createdAt).format('MM/DD/YYYY')
        const pawnedDate = new Date(date1);
        const date2 = moment().format('MM/DD/YYYY')
        const currentDate = new Date(date2);
        var differentInTime = new DateDiff(currentDate, pawnedDate);
        const diffDays = differentInTime.months()
        return diffDays;
    }
    getAdditionalCharges() {
        var additionalCharges = 0;
        var articleDuration = this.props.article.duration;
        console.log(articleDuration)
        const months = this.getDateDifference();
        console.log(months)
        if (articleDuration == 1 && months <= 6) {
            additionalCharges = 100;
        } else if (articleDuration == 1 && months > 6) {
            additionalCharges = 20;
        } else if (articleDuration == 3 && months <= 1.5) {
            additionalCharges = 100;
        } else if (articleDuration == 3 && months > 1.5) {
            additionalCharges = 20;
        }
        console.log(additionalCharges)
        return additionalCharges;

    }
    getCurrentDate() {
        const date = moment().format('MM/DD/YYYY');
        return date;
    }
    changeAmountSlip = () => {
        const printableElements = document.getElementById('change-amount-slip').innerHTML;
        const orderHtml = '<html><head><title></title></head><body>' + printableElements + '</body></html>'
        const oldPage = document.body.innerHTML;
        document.body.innerHTML = orderHtml;
        window.print();
        document.body.innerHTML = oldPage
    }
    render() {
        if (!this.props.article) {
            return <div>Loading</div>
        }
        return (
            <div className="ui container" style={{ marginTop: "30px", marginBottom: "30px" }}>
                <div>
                    <h5>Update Amount of Article Number {this.props.article.articleId}</h5>
                    <form className="ui mini form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <div className="four fields">
                            <div className="field">
                                <Field name="additional_amount" component={this.renderInput} label="Increase Amount" placeholder={this.props.article.additional_amount} type="number" />
                            </div>
                        </div>
                        <div className="field">
                            <button type="submit" className="ui primary button">Update Payments</button>
                        </div>
                    </form>
                </div>
                <div className="ui card" style={{ marginTop: "30px", marginBottom: "10px", textAlign: "center" }}>
                    <div id="change-amount-slip">
                        <div className="content">
                            <div className="center aligned header" style={{ marginTop: "30px", marginBottom: "10px", textAlign: "center" }}>Changed Amount</div>
                        </div>
                        <div className="content">
                            <h3 className="ui center aligned header">{this.props.article.articleId}</h3>
                            <div className="ui small feed">
                                <div className="event">
                                    <div className="center aligned content">
                                        <div className="center aligned summary" style={{ textAlign: "center" }}>
                                            {this.props.article.amountChangedDate}
                                        </div>
                                    </div>
                                </div>
                                <div className="event">
                                    <div className="content">
                                        <div className="center aligned summary" style={{ textAlign: "center" }}>
                                            Previous: {this.props.article.amount + ".00"}
                                        </div>
                                    </div>
                                </div>
                                <div className="event">
                                    <div className="content">
                                        <div className="center aligned summary" style={{ textAlign: "center" }}>
                                            <span style={{ textDecoration: "underline" }}>Additional: {this.props.article.additional_amount + ".00"}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="event" style={{ marginBottom: "40px" }}>
                                    <div className="extra content">
                                        <div className="center aligned summary" style={{ textAlign: "center" }}>
                                            <span style={{ textDecoration: "underline", borderBottom: "1px solid #000" }}>{this.props.article.additional_amount + this.props.article.amount + ".00"}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="ui horizontal divider">
                                    .
                                        </div>
                            </div>
                        </div>
                    </div>
                    <button className="ui button" onClick={() => this.changeAmountSlip()}>Print</button>
                </div>
            </div>
        );
    }

}
const formWrapped = reduxForm({
    form: 'articleIncreaseAmount'
})(ArticleChangeAmount);

//Map data from the store
const mapToSatate = (state, ownPorps) => {
    return { article: state.articles[ownPorps.article] };
}


export default connect(mapToSatate, { fetchArticle, editArticle })(formWrapped);