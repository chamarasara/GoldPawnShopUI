import React from 'react';
import { connect } from 'react-redux';
import { fetchRates } from '../../actions';
import { reduxForm, Field } from 'redux-form';
import EditRates from './EditRates';
import { Link } from "react-router-dom";
class Settings extends React.Component {
    componentDidMount() {
        this.props.fetchRates('5ede1d0434c8e4192cc45222');
        console.log(this.props)
    }

    render() {
        if (!this.props.interest) {
            return <div>Loading Interest... </div>
        }
        return (
            <div className="ui center aligned container">
                <div className="row">
                    <h3>Settings</h3>
                    <div className="ui grid">
                        <div className="eight sixteen column">
                            <table className="ui celled table">
                                <thead>
                                    <tr><th>Amount</th>
                                        <th>Day</th>
                                        <th>Week</th>
                                        <th>Month</th>
                                    </tr></thead>
                                <tbody>
                                    <tr>
                                        <td data-label="Name">{this.props.interest.min_amount}-{this.props.interest.mid_amount}</td>
                                        <td data-label="Age">{this.props.interest.oneDay_onetoten}</td>
                                        <td data-label="Job">{this.props.interest.oneWeek_onetoten}</td>
                                        <td data-label="Job">{this.props.interest.oneMonth_onetoten}</td>
                                    </tr>
                                    <tr>
                                        <td data-label="Name">{this.props.interest.mid_amount}-{this.props.interest.max_amount}</td>
                                        <td data-label="Age">{this.props.interest.oneDay_tentosixtyfive}</td>
                                        <td data-label="Job">{this.props.interest.oneWeek_tentosixtyfive}</td>
                                        <td data-label="Job">{this.props.interest.oneMonth_tentosixtyfive}</td>
                                    </tr>
                                    <tr>
                                        <td data-label="Name">Above {this.props.interest.max_amount}</td>
                                        <td data-label="Age">{this.props.interest.oneDay_abovesixtyfive}</td>
                                        <td data-label="Job">{this.props.interest.oneWeek_abovesixtyfive}</td>
                                        <td data-label="Job">{this.props.interest.oneMonth_abovesixtyfive}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div>
                                <Link to={`/rates/${this.props.interest._id}`} className="ui primary button">
                                    Edit 
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        );
    }
}



const mapToSatate = (state, ownPorps) => {
    //console.log(ownPorps.match.params.id)
    const intId = '5ede1d0434c8e4192cc45222';
    console.log(state.interest[intId])
    return { interest: state.interest[intId] };
}
export default connect(mapToSatate, { fetchRates })(Settings);
