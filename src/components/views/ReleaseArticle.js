import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Modal from '../Modal';
import history from '../../history';
import moment from 'moment';
import { fetchArticle, releaseArticle, editArticle, activityLog, fetchRates, fetchArticles } from '../../actions';

class ReleaseArticle extends React.Component {
    componentDidMount() {
        console.log(this.props.match.params.id)        
        this.props.fetchArticle(this.props.match.params.id);
        this.props.fetchArticles()
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
        return sum;
    }

    amountPayable() {
        const amountPawned = this.props.article.amount + this.props.article.additional_amount;
        const amountPaid = this.toTotalAmountPaid();
        const released_amount = amountPawned - amountPaid;
        console.log(released_amount)
        return released_amount;
    }
    interestPayable() {
        const interest1 = this.articleInterest() + this.props.article.additional_charges;
        const interest = interest1 + (10 - interest1 % 10);
        console.log(interest)
        const interestPaid = this.toTotalInterestPaid();
        const interest_paid = interest - interestPaid;
        console.log(interest_paid)
        return interest_paid;
    }
    releaseArticle() {
        const article_status = "Released";
        const formValues = {}
        const released_amount = this.amountPayable()
        const interest_paid = this.interestPayable()
        const interestPaidDate = this.getCurrentDate()
        const values = { ...formValues, released_amount, article_status, interest_paid, interestPaidDate  }
        return values;
    }
    getCurrentDate() {
        const date = moment().format('MM/DD/YYYY');
        return date;
    }
    renderActions() {
        const id = this.props.match.params.id;
        console.log(id)
        const formValues = this.releaseArticle()
        return (
            <React.Fragment>
                <button onClick={() => this.props.releaseArticle(id, formValues, this.props.article.articleId)} className="ui red button">Yes</button>
                <Link to={`/singlearticle/${this.props.match.params.id}`} className="ui cancel button">No</Link>
            </React.Fragment>
        );
    }

    renderContent() {
        if (!this.props.article) {
            return 'Are you sure, you want to release this Article? '
        }
        return `Are you sure, you want to release this Article?: ${this.props.article.articleId}`
    }
    render() {
        return (
            <Modal header="Release Article " content={this.renderContent()} actions={this.renderActions()} onDismiss={() => history.push(`/singlearticle/${this.props.match.params.id}`)} />
        );
    }
}

//Map data from the store
const mapToSatate = (state, ownPorps) => {
    //console.log(ownPorps.match.params.id)
    const intId = '5f12c185e1b005f6656aca78';
    const activities = Object.values(state.activities)
    activities.reverse()
    console.log(state.articles)
    console.log(ownPorps.match.params.id)
    return { interest: state.interest[intId], article: state.articles[ownPorps.match.params.id], activities: activities };
}
export default connect(mapToSatate, { releaseArticle, editArticle, activityLog, fetchRates, fetchArticle, fetchArticles })(ReleaseArticle);