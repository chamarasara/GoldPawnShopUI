import React from 'react';
import { connect } from 'react-redux';
import { fetchArticle, editArticle } from '../../actions';
import { reduxForm, Field } from 'redux-form';
import moment from 'moment';

class ArticlePayInterest extends React.Component {
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
    getCurrentDate() {
        const date = moment().format('MM/DD/YYYY');
        return date;
    }
    payInterestSlip = () => {
        const printableElements = document.getElementById('pay-interest-slip').innerHTML;
        const orderHtml = '<html><head><title></title></head><body>' + printableElements + '</body></html>'
        const oldPage = document.body.innerHTML;
        console.log(oldPage)
        document.body.innerHTML = orderHtml;
        window.print();
        document.body.innerHTML = oldPage
    }
    render() {
        //console.log(this.props)
        if (!this.props.article) {
            return <div>Loading</div>
        }
        return (
            <div>
                <div className="" style={{ marginTop: "30px", marginBottom: "30px" }}>
                    <h5>Pay Interest for Article Number {this.props.article.articleId}</h5>
                    <form className="ui mini form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <div className="four fields">
                            <div className="field">
                                <Field name="interest_paid" component={this.renderInput} label="Pay Interest" placeholder={this.props.article.interest_paid} type="number" />
                            </div>
                        </div>
                        <div className="field">
                            <button type="submit"  className="ui primary button">Update</button>
                        </div>
                    </form>
                </div>
                <div className="four wide column" style={{ marginTop: "30px", marginBottom: "10px", textAlign: "center" }}>
                    <div className="ui card">
                        <div id="pay-interest-slip">
                            <div className="content">
                                <div className="center aligned header" style={{ marginTop: "30px", marginBottom: "10px", textAlign: "center" }}>Pay Interest</div>
                            </div>
                            <div className="content">
                                <h3 className="ui center aligned header">{this.props.article.articleId}</h3>
                                <div className="ui small feed">
                                    <div className="event">
                                        <div className="center aligned content">
                                            <div className="center aligned summary" style={{ textAlign: "center" }}>
                                                {this.getCurrentDate()}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="event" style={{ marginBottom: "40px" }}>
                                        <div className="extra content">
                                            <div className="center aligned summary" style={{ textAlign: "center" }}>
                                                <span style={{ textDecoration: "underline" }}>{this.props.article.interest_paid + ".00"}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ui horizontal divider">
                                        .
                                        </div>
                                </div>
                            </div>
                        </div>
                        <button className="ui button" onClick={() => this.payInterestSlip()}>Print</button>
                    </div>
                </div>
            </div>
            
        );
    }

}
const formWrapped = reduxForm({
    form: 'articlePayInterest'
})(ArticlePayInterest);

//Map data from the store
const mapToSatate = (state, ownPorps) => {
    //console.log(ownPorps.article)
    return { article: state.articles[ownPorps.article] };
}


export default connect(mapToSatate, { fetchArticle, editArticle })(formWrapped);