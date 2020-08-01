import React from 'react';
import { connect } from 'react-redux';
import { fetchArticle, fetchRates, activityLog } from '../../actions';
import { Link } from "react-router-dom";
import * as jwt_decode from "jwt-decode";
import ArticleState from './ArticleState';
import ArticlePayments from './ArticlePayments';
import RelatedArticle from './RelatedArticle';
import moment from 'moment';
import ArticlePayInterest from './ArticlePayInterest';
import ArticleChangeAmount from './ArticleChangeAmount';

class SingleArticle extends React.Component {
    componentDidMount() {
        this.props.fetchRates('5f12c185e1b005f6656aca78');
        this.props.fetchArticle(this.props.match.params.id);
        this.props.activityLog()
    }
    adminRendering() {
        const token = localStorage.getItem('user');
        const decoded = jwt_decode(token);        
        if (decoded.user_role === 1) {
            return <Link to={`/deletearticle/${this.props.match.params.id}`} className="ui red button">
                Delete Article
                    </Link>

        }
    }
    articleInterest() {
        const amount = this.props.article.amount + this.props.article.additional_amount;
        const datetime = new Date();
        const startDate = moment(this.props.article.createdAt).format('MM/DD/YYYY');
        const endDate = moment(datetime).format('MM/DD/YYYY');
        const date1 = new Date(endDate);
        const date2 = new Date(startDate);
        const diffTime = Math.abs(date1 - date2);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const noOfDates = 0;
        var rates = 0;

        if (this.props.interest.min_amount < amount && amount <= this.props.interest.mid_amount) {
            if (diffDays <= 1) {
                // console.log("Only 1 day")
                return rates = amount * this.props.interest.oneDay_onetoten / 100
            } else if (diffDays > 1 && diffDays <= 7) {
                // console.log("1< days <= 7")
                return rates = amount * this.props.interest.oneWeek_onetoten / 100
            } else if (7 < diffDays && diffDays <= 30) {
                // console.log("7< days <= 30")
                return rates = amount * this.props.interest.oneMonth_onetoten / 100
            } else if (diffDays > 30) {
                // console.log("days > 30")
                return rates = amount * this.props.interest.oneMonth_onetoten / 100 + (amount * this.props.interest.oneMonth_onetoten / 30) * (diffDays - 30) / 100
            }

        } else if (this.props.interest.mid_amount < amount && amount <= this.props.interest.max_amount) {
            //console.log("10000<amount && amount < 65000");
            if (diffDays <= 1) {
                // console.log("Only 1 day")
                // console.log(rates);
                return rates = amount * this.props.interest.oneDay_tentosixtyfive / 100
            } else if (diffDays > 1 && diffDays <= 7) {
                // console.log("1< days <= 7")
                // console.log(this.props.interest.oneWeek_onetoten)
                return rates = amount * this.props.interest.oneWeek_tentosixtyfive / 100
            } else if (7 < diffDays && diffDays <= 30) {
                // console.log("7< days <= 30")
                return rates = amount * this.props.interest.oneMonth_tentosixtyfive / 100
            } else if (diffDays > 30) {
                // console.log("days > 30")
                return rates = amount * this.props.interest.oneMonth_tentosixtyfive / 100 + (amount * this.props.interest.oneMonth_tentosixtyfive / 30) * (diffDays - 30) / 100
            }
        } else if (amount > this.props.interest.max_amount) {
            //console.log("amount>65000");
            if (diffDays <= 1) {
                // console.log("Only 1 day")
                // console.log(rates);
                return rates = amount * this.props.interest.oneDay_abovesixtyfive / 100
            } else if (diffDays > 1 && diffDays <= 7) {
                // console.log("1< days <= 7")
                // console.log(this.props.interest.oneWeek_abovesixtyfive)
                return rates = amount * this.props.interest.oneWeek_abovesixtyfive / 100

            } else if (7 < diffDays && diffDays <= 30) {
                // console.log("7< days <= 30")
                return rates = amount * this.props.interest.oneMonth_abovesixtyfive / 100
            } else if (diffDays > 30) {
                // console.log("days > 30")
                return rates = amount * this.props.interest.oneMonth_abovesixtyfive / 100 + (amount * this.props.interest.oneMonth_abovesixtyfive / 30) * (diffDays - 30) / 100
            }

        }

    }

    articleStatus() {
        const article_status = this.props.article.article_status;
        if (article_status === "Active") {
            return <div className="item">
                <div className="ui horizontal label">Current Status of Article </div>
                Active
            </div>
        } else if (article_status === "Released") {
            return <div className="item">
                <div className="ui horizontal label">Current Status of Article </div>
                Released
            </div>
        } else if (article_status === "Blocked") {
            return <div className="item">
                <div className="ui horizontal label">Current Status of Article </div>
                Blocked
            </div>
        } else if (article_status === "Expired") {
            return <div className="item">
                <div className="ui horizontal label">Current Status of Article </div>
                Expired
            </div>
        } else if (article_status === "Renewed") {
            return <div className="item">
                <div className="ui horizontal label">Current Status of Article </div>
                Renewed
            </div>
        }
    }
    getTotalCredits() {
        var sum = 0;
        var reports = this.props.reports;

        for (var i = 0; i < reports.length; i++) {
            sum += reports[i].amount;
        }
        console.log('total', sum)
        return sum;
    }
    //count total amount paid
    toTotalAmountPaid() {
        var sum = 0;
        var values = this.props.activities;

        for (var i = 0; i < values.length; i++) {
            let record = values[i];
            if (record && record.released_amount && record.articleId == this.props.article.articleId) {
                console.log(record.released_amount)
                sum += record.released_amount
            }
        }
        return sum;
    }

    //count total interest paid
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
    duration() {
        const duration = this.props.article.duration;
        if (duration == 1) {
            return <div className="item">
                <div className="ui horizontal label">Duration</div>
                One year
            </div>
        } else if (duration == 3) {
            return <div className="item">
                <div className="ui horizontal label">Duration</div>
                Three months
            </div>
        }
    }
    releaseSlip = () => {
        const printableElements = document.getElementById('release-slip').innerHTML;
        const orderHtml = '<html><head><title></title></head><body>' + printableElements + '</body></html>'
        const oldPage = document.body.innerHTML;
        document.body.innerHTML = orderHtml;
        window.print();
        document.body.innerHTML = oldPage
    }

    changeAmountSlip = () => {
        const printableElements = document.getElementById('change-amount-slip').innerHTML;
        const orderHtml = '<html><head><title></title></head><body>' + printableElements + '</body></html>'
        const oldPage = document.body.innerHTML;
        document.body.innerHTML = orderHtml;
        window.print();
        document.body.innerHTML = oldPage
    }
    payInterestSlip = () => {
        const printableElements = document.getElementById('pay-interest-slip').innerHTML;
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
    renderReleasedSlip(){
        const article_status = this.props.article.article_status;
        if (article_status === "Released") {
            return(
                <div className="ui card" style={{ marginTop: "170px", marginBottom: "10px", textAlign: "center" }}>
                    <div id="release-slip">
                        <div className="content">
                            <div className="center aligned header" style={{ marginTop: "30px", marginBottom: "10px", textAlign: "center" }}>Released</div>
                        </div>
                        <div className="content">
                            <h3 className="ui center aligned header">{this.props.article.articleId}</h3>
                            <div className="ui small feed">
                                <div className="event">
                                    <div className="center aligned content">
                                        <div className="center aligned summary" style={{ textAlign: "center" }}>
                                            {this.props.article.released_date}
                                        </div>
                                    </div>
                                </div>
                                <div className="event">
                                    <div className="content">
                                        <div className="center aligned summary" style={{ textAlign: "center" }}>
                                            {this.toTotalAmountPaid() + ".00"}
                                        </div>
                                    </div>
                                </div>
                                <div className="event">
                                    <div className="content">
                                        <div className="center aligned summary" style={{ textAlign: "center" }}>
                                            <span style={{ textDecoration: "underline" }}>{this.toTotalInterestPaid() + ".00"}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="event" style={{ marginBottom: "40px" }}>
                                    <div className="extra content">
                                        <div className="center aligned summary" style={{ textAlign: "center" }}>
                                            <span style={{ textDecoration: "underline", borderBottom: "1px solid #000" }}>{this.toTotalInterestPaid() + this.toTotalAmountPaid() + ".00"}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="ui horizontal divider">
                                    .
                                        </div>
                            </div>
                        </div>
                    </div>
                    <button className="ui button" onClick={() => this.releaseSlip()}>Print</button>
                </div> 
            )      
        }
    }
    render() {
        if (!this.props.article || !this.props.interest) {
            return <div>Loading...</div>
        }
        const interest = this.articleInterest();
        const roundedInterest = interest + (10 - interest % 10);
        const date = moment(this.props.article.createdAt).format('MM/DD/YYYY');


        return (
            <div className="ui container" style={{ marginTop: "30px", marginBottom: "30px" }}>
                <h3>Details for Article Number {this.props.article.articleId}</h3>
                <div className="ui grid">
                    <div className="eight wide column">
                        <div className="ui divided selection list">
                            <div className="item" >
                                <div className="ui horizontal label">Full Name </div>
                                {this.props.article.first_name + " " + this.props.article.last_name}
                            </div>
                            <div className="item">
                                <div className="ui horizontal label">Date </div>
                                {date}
                            </div>
                            {this.articleStatus()}
                            <div className="item">
                                <div className="ui horizontal label">ID Number </div>
                                {this.props.article.id_number}
                            </div>
                            <div className="item">
                                <div className="ui horizontal label">Phone Number</div>
                                {this.props.article.phone_number}
                            </div>
                            <div className="item">
                                <div className="ui horizontal label">Address </div>
                                {this.props.article.address}
                            </div>
                            <div className="item">
                                <div className="ui horizontal label">Weight</div>
                                {this.props.article.weight}
                            </div>
                            {this.duration()}
                            <div className="item">
                                <div className="ui horizontal label">Final Date</div>
                                {this.props.article.released_final_date}
                            </div>
                            <div className="item">
                                <div className="ui horizontal label">Released Date</div>
                                {this.props.article.released_date}
                            </div>
                            <div className="item">
                                <div className="ui horizontal label">Additional Details </div>
                                {this.props.article.addtional_details}
                            </div>
                            <div className="item">
                                <div className="ui horizontal label">Special Circumstance</div>
                                {this.props.article.speacial_circumstances}
                            </div>
                        </div>
                    </div>
                    <div className="eight wide column">
                        <div className="ui divided selection list">
                            <div className="item">
                                <div className="ui horizontal label">Amount Pawned</div>
                                {this.props.article.amount + ".00"}
                            </div>
                            <div className="item">
                                <div className="ui horizontal label">Additional Amount Pawned</div>
                                {this.props.article.additional_amount + ".00"} (Date: {this.props.article.amountChangedDate})
                            </div>
                            <div className="item">
                                <div className="ui horizontal label">Total Amount Pawned</div>
                                {this.props.article.amount + this.props.article.additional_amount + ".00"} 
                            </div>
                            <div className="item">
                                <div className="ui horizontal label">Amount Paid</div>
                                {this.props.article.released_amount + ".00"}
                            </div>
                            <div className="item">
                                <div className="ui horizontal label">Total Amount Paid</div>
                                {this.toTotalAmountPaid() + ".00"}
                            </div>
                            <div className="item">
                                <div className="ui horizontal label">Inerest</div>
                                {roundedInterest + ".00"}
                            </div>
                            <div className="item">
                                <div className="ui horizontal label">Inerest Paid</div>
                                {this.props.article.interest_paid + ".00"} (Date: {this.props.article.interestPaidDate})
                            </div>
                            <div className="item">
                                <div className="ui horizontal label">Total Inerest Paid</div>
                                {this.toTotalInterestPaid() + ".00"}
                            </div>
                        </div>
                        <ArticleState article={this.props.match.params.id} />
                        <div style={{ marginTop: "20px" }}>
                            <Link to={`/singlearticle/${this.props.article.previous_article_id}`} className="ui primary button">
                                Previous Article
                            </Link>
                            <Link to={`/renewbypaying/${this.props.match.params.id}`} className="ui primary button">
                                Renew Article
                            </Link>
                            <Link to={`/editarticle/${this.props.match.params.id}`} className="ui primary button">
                                Edit Article
                            </Link>
                            {this.adminRendering()}
                        </div>
                    </div>
                </div>
                <div className="ui grid">
                    <div className="six wide column">
                        <ArticlePayInterest article={this.props.match.params.id} />     
                    </div>
                    <div className="six wide column">
                        <ArticleChangeAmount article={this.props.match.params.id} />
                    </div>
                    <div className="four wide column" style={{ marginTop: "30px", marginBottom: "10px", textAlign: "center" }}>
                        {this.renderReleasedSlip()}
                    </div>
                </div>                
                <div style={{ marginTop: "30px", marginBottom: "50px", textAlign: "center" }}>
                    <RelatedArticle userId={this.props.article.id_number} articleId={this.props.article.articleId} />
                </div>
            </div>
        );
    }
}

//Map data from the store
const mapToSatate = (state, ownPorps) => {
    const intId = '5f12c185e1b005f6656aca78';
    const activities = Object.values(state.activities)
    activities.reverse()
    console.log(state)
    return { interest: state.interest[intId], article: state.articles[ownPorps.match.params.id], activities: activities };
}

export default connect(mapToSatate, { fetchArticle, fetchRates, activityLog })(SingleArticle);