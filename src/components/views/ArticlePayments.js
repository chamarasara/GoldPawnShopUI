import React from 'react';
import { connect } from 'react-redux';
import { fetchArticle, editArticle } from '../../actions';
import { reduxForm, Field } from 'redux-form';
import { Link } from "react-router-dom";
import moment from 'moment';

class ArticlePayment extends React.Component {
    componentDidMount() {
        this.props.fetchArticle(this.props.match.params.id);
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
        const reNewDate = this.getCurrentDate()
        const article_status = "Renewed";
        const values = { ...formValues, reNewDate, article_status }
        this.props.editArticle(this.props.article._id, values, this.props.article.articleId);
       
    }
    paymentSlip = () => {
        const printableElements = document.getElementById('payment-slip').innerHTML;
        const orderHtml = '<html><head><title></title></head><body>' + printableElements + '</body></html>'
        const oldPage = document.body.innerHTML;
        document.body.innerHTML = orderHtml;
        window.print();
        document.body.innerHTML = oldPage
    }
    getCurrentDate() {
        const date = moment().format('MM/DD/YYYY');
        return date;
    }
    render() {
        //console.log(this.props)
        if (!this.props.article) {
            return <div>Loading</div>
        }
        return (
            <div className="ui container" style={{ marginTop: "30px", marginBottom: "30px" }}>
                <div>
                    <h5>Renew Article Number {this.props.article.articleId} by Paying</h5>
                    <form className="ui mini form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <div className="four fields">
                            <div className="field">
                                <Field name="released_amount" component={this.renderInput} label="Pay Amount" placeholder={this.props.article.released_amount} type="number" />
                            </div>
                            <div className="field">
                                <Field name="interest_paid" component={this.renderInput} label="Pay Interest" placeholder={this.props.article.interest_paid} type="number" />
                            </div>                            
                        </div>
                        <div className="field">
                            <button type="submit" className="ui primary button">Update Payments</button>
                            <Link to={`/renewarticle/${this.props.match.params.id}`} className="ui primary button">Next</Link>
                        </div>
                    </form>
                </div> 
                <div style={{marginTop:"50px"}}>
                    <div className="ui card">
                        <div id="payment-slip">
                            <div className="content">
                                <div className="center aligned header" style={{ marginTop: "30px", marginBottom: "10px", textAlign: "center" }}>Payments with Interest</div>
                            </div>
                            <div className="content">
                                <h3 className="ui center aligned header">{this.props.article.articleId}</h3>
                                <div className="ui small feed">
                                    <div className="event">
                                        <div className="center aligned content">
                                            <div className="center aligned summary" style={{ textAlign: "center" }}>
                                                {this.props.article.reNewDate}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="event">
                                        <div className="content">
                                            <div className="center aligned summary" style={{ textAlign: "center" }}>
                                                {this.props.article.released_amount + ".00"} ({this.props.article.amount + this.props.article.additional_amount - this.props.article.released_amount + ".00"})
                                                </div>
                                        </div>
                                    </div>
                                    <div className="event">
                                        <div className="content">
                                            <div className="center aligned summary" style={{ textAlign: "center" }}>
                                                <span style={{ textDecoration: "underline" }}>{this.props.article.interest_paid + ".00"}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="event" style={{ marginBottom: "40px" }}>
                                        <div className="extra content">
                                            <div className="center aligned summary" style={{ textAlign: "center" }}>
                                                <span style={{ textDecoration: "underline", borderBottom: "1px solid #000" }}>{this.props.article.released_amount + this.props.article.interest_paid + ".00"}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ui horizontal divider">
                                        .
                                        </div>
                                </div>
                            </div>
                        </div>
                        <button className="ui button" onClick={() => this.paymentSlip()}>Print</button>
                    </div>
                </div>               
            </div>
        );
    }

}
const formWrapped = reduxForm({
    form: 'articlePayments'
})(ArticlePayment);

//Map data from the store
const mapToSatate = (state, ownPorps) => {
    console.log(state)
    return { article: state.articles[ownPorps.match.params.id] };
}


export default connect(mapToSatate, { fetchArticle, editArticle })(formWrapped);