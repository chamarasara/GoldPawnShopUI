import React from "react";
import { connect } from 'react-redux';
import { dailyReports } from '../../actions';
import SearchByDate from "./SearchByDate";
import PrintReports from "./PrintReports";
import ReactToPrint from "react-to-print";
import reports from "../../apis/reports";


class Reports extends React.Component {
    componentDidMount() {
        this.props.dailyReports()
    }
    printOrder = () => {
        const printableElements = document.getElementById('printme').innerHTML;
        const orderHtml = '<html><head><title></title></head><body>' + printableElements + '</body></html>'
        const oldPage = document.body.innerHTML;
        console.log(oldPage)
        document.body.innerHTML = orderHtml;
        window.print();
        document.body.innerHTML = oldPage
    }
    renderListCredit() {
        return this.props.reports.map((reports) => {
            if (reports.interest_paid === 0 && reports.released_amount === 0 && reports.amount > 0 || reports.additional_amount > 0) {
                return (
                    <tr key={reports._id}>
                        <td className="collapsing" style={{ fontSize: "12px", paddingLeft: "50px" }}>
                            {reports.articleId}
                        </td>
                        <td className=" collapsing" style={{ fontSize: "12px", paddingLeft: "50px" }}>{reports.amount + reports.additional_amount}</td>
                    </tr>
                );
            }

        });
    }
    getTotalCredits() {
        var sum = 0;
        var reports = this.props.reports;

        for (var i = 0; i < reports.length; i++) {
            sum += reports[i].amount + reports[i].additional_amount;
        }
        console.log('total', sum)
        return sum;
    }
    renderListDebit() {
        return this.props.reports.map((reports) => {
            if (reports.amount === 0 && reports.additional_amount === 0 && reports.interest_paid > 0 || reports.released_amount > 0) {
                return (
                    <tr key={reports._id}>
                        <td className="collapsing" style={{ fontSize: "12px", paddingLeft: "50px" }}>
                            {reports.articleId}
                        </td>
                        <td className="collapsing" style={{ fontSize: "12px", paddingLeft: "50px" }}>{reports.interest_paid}</td>
                        <td className=" collapsing" style={{ fontSize: "12px", paddingLeft: "50px"}}>{reports.released_amount}</td>
                        <td className="collapsing" style={{ fontSize: "12px", paddingLeft: "50px" }}>{reports.released_amount + reports.interest_paid}</td>
                    </tr>
                );
            }

        });
    }
    getTotalDebits() {
        var sum = 0;
        var reports = this.props.reports;

        for (var i = 0; i < reports.length; i++) {
            sum += reports[i].released_amount + reports[i].interest_paid;
        }
        return sum;
    }
    getTotalAmountPaid() {
        var sum = 0;
        var reports = this.props.reports;

        for (var i = 0; i < reports.length; i++) {
            sum += reports[i].released_amount;
        }
        return sum;
    }
    getTotalInterst() {
        var sum = 0;
        var reports = this.props.reports;

        for (var i = 0; i < reports.length; i++) {
            sum += reports[i].interest_paid;
        }
        return sum;
    }


    render() {
        console.log(this.props)
        if (this.props.reports.length <= 1) {
            return (
                <div className="ui container">
                    <h2>Reports</h2>
                    <div>
                        <SearchByDate />
                    </div>
                    <div className="ui grid">
                        <div className="six wide column"></div>
                        <div className="four wide column">
                            <h4>No results found!</h4>
                        </div>
                        <div className="six wide column"></div>
                    </div>

                </div>
            );
        } else {
            return (
                <div className="ui container">
                    <h2>Reports</h2>
                    <div>
                        <SearchByDate />
                    </div>
                    <div id="printme">
                        <div>
                            <h3 style={{ textAlign: "center", marginTop: "40px" }}>Report for {this.props.dates.startDate} to {this.props.dates.endDate}</h3>
                        </div>
                        <table className="ui celled table" >
                            <thead >
                                <tr>
                                    <th style={{ paddingLeft: "50px", paddingRight: "50px" }} colspan="2">Credits</th>
                                </tr>
                                <tr>
                                    <th style={{ paddingLeft: "50px", paddingRight: "50px" }}>Article Number</th>
                                    <th style={{ paddingLeft: "50px", paddingRight: "50px" }}>Amount </th>
                                </tr></thead>
                            <tbody>
                                {this.renderListCredit()}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th style={{ paddingLeft: "50px", paddingRight: "50px" }}><strong>Total</strong></th>
                                    <th style={{ paddingLeft: "50px", paddingRight: "50px" }}><strong>{this.getTotalCredits()}</strong></th>
                                </tr>
                            </tfoot>
                        </table>
                        <table className="ui celled table" >
                            <thead>
                                <tr>
                                    <th style={{ paddingLeft: "50px", paddingRight: "50px" }} colspan="4">Debits</th>                                    
                                </tr>
                                <tr>
                                    <th style={{ paddingLeft: "50px", paddingRight: "50px" }}>Article Number</th>
                                    <th style={{ paddingLeft: "50px", paddingRight: "50px" }}>Interest Paid</th>
                                    <th style={{ paddingLeft: "50px", paddingRight: "50px" }}>Amount Paid </th>
                                    <th style={{ paddingLeft: "50px", paddingRight: "50px" }}>Total Paid </th>
                                </tr></thead>
                            <tbody>
                                {this.renderListDebit()}
                            </tbody>
                            <tfoot>
                                <tr>
                                    
                                    <th style={{ paddingLeft: "50px", paddingRight: "50px" }}><strong>Total</strong></th>
                                    <th style={{ paddingLeft: "50px", paddingRight: "50px" }}><strong>{this.getTotalInterst()}</strong></th>
                                        <th style={{ paddingLeft: "50px", paddingRight: "50px" }}><strong>{this.getTotalAmountPaid()}</strong></th>
                                    <th style={{ paddingLeft: "50px", paddingRight: "50px" }}><strong>{this.getTotalDebits()}</strong></th>
                                </tr>
                            </tfoot>
                        </table>

                    </div>
                    <div>

                    </div>
                    <div style={{ textAlign: "center" }}>
                        <button onClick={() => this.printOrder()} className="ui primary button" style={{ marginTop: "20px", marginBottom: "50px" }}>
                            Print Report
                        </button>
                    </div>
                </div>
            );
        }

    }

}
//Map data from the store
const mapToSatate = (state) => {
    const reports = Object.values(state.searchReports)
    reports.reverse()
    reports.pop()
    console.log(reports)
    const datesForReports = Object.values(state.searchReports);
    const dates = datesForReports[0];
    //console.log(dates)
    return { dates: dates, reports: reports };
}
export default connect(mapToSatate, { dailyReports })(Reports);


