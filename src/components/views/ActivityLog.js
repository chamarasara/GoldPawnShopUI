import React from 'react';
import { connect } from 'react-redux';
import { activityLog } from '../../actions'
import moment from 'moment';

class ActivityLog extends React.Component {
    componentDidMount() {
        
        this.props.activityLog()
        console.log(this.props.activities)
    }
  
    renderList(){
        return this.props.activities.map(activities =>{
            const date = moment(activities.createdAt).format('MM/DD/YYYY, h:mm:ss a') ;
            return(
                <tr key={activities._id}>
                    <td className="collapsing" style={{ fontSize: "12px" }}>{date}</td>
                    <td className="collapsing" style={{ fontSize: "12px" }}>{activities.user}</td>
                    <td className="collapsing" style={{ fontSize: "12px" }}>{activities.articleId}</td>
                    <td className="collapsing" style={{ fontSize: "12px" }}>{activities.released_amount}</td>
                    <td className="collapsing" style={{ fontSize: "12px" }}>{activities.additional_amount}</td>
                    <td className="collapsing" style={{ fontSize: "12px" }}>{activities.interest_paid}</td>
                    <td className="collapsing" style={{ fontSize: "12px" }}>{activities.article_status}</td>
                    <td className="collapsing" style={{ fontSize: "12px" }}>{activities.phone_number}</td>
                </tr>
            );
        }
        )
    }
    render() {
        return (
            <div className="ui center aligned container">
                <div className="row">
                    <h3>Activity Log</h3>
                    <div className="ui grid">
                        <table className="ui celled structured table">
                            <thead>
                                <tr>
                                    <th rowSpan="2">Time</th>
                                    <th rowSpan="2">User</th>
                                    <th rowSpan="2">Article Number</th>
                                    <th colSpan="5">Updates</th>
                                </tr>
                                <tr>
                                    <th>Amount (paid)</th>
                                    <th>Amount (increased)</th>
                                    <th>Interest (paid)</th>
                                    <th>Article Status</th>
                                    <th>Phone Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderList()}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        );
    }
}

const mapToSatate = (state) => {
    //var items = Object.values(state.activities.slice[0]);
    //items.sort()
    
    const activities = Object.values(state.activities)
    activities.reverse()
    console.log(state)
    return {
        activities: activities
    };
}
export default connect(mapToSatate, { activityLog })(ActivityLog);