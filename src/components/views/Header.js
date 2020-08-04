import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { signOutAction } from '../../actions'
import * as jwt_decode from "jwt-decode";

class Header extends React.Component {

    handleLogout = () => {
        this.props.signOutAction();
    }

    navbarLinks() {
        if (sessionStorage.getItem('user')) {
            const token = sessionStorage.getItem('user');
            console.log(token)
            const decoded = jwt_decode(token);
            if (decoded.user_role == 1) {
                return [
                    <div className="ui fluid container" key="10">
                        <div className="ui tabular menu">
                            <Link to="/" key="20" className="item">
                                Dashboard
                            </Link>
                            <Link to={`/userprofile/${decoded._id}`} key="30" className="item">
                                My Profile
                            </Link>

                            <Link to="/userlist" key="40" className="item">
                                Users List
                            </Link>
                            <Link to="/reports" key="29" className="item">
                                Reports
                            </Link>
                            <Link to="/settings" key="226" className="item">
                                Settings
                            </Link>
                            <Link to="/activitylog" key="296" className="item">
                                Activity Log
                            </Link>
                            <div className="right menu">
                                <button type="button" className="ui item" onClick={this.handleLogout}>
                                    Logout
                            </button>
                            </div>
                        </div>
                    </div>
                ]
            } else {
                return [
                    <div className="ui fluid container" key="102">
                        <div className="ui tabular menu" key="23">
                            <Link to="/" key="11" className="item">
                                Dashboard
                            </Link>
                            <Link to={`/userprofile/${decoded._id}`} key="31" className="item">
                                My Profile
                            </Link>
                            <div className="right menu">
                                <button type="button" className="ui item" onClick={this.handleLogout}>
                                    Logout
                            </button>
                            </div>
                        </div>
                    </div>
                ]
            }

        }

    }
    render() {
        return (
            <ul>
                {this.navbarLinks()}
            </ul>
        );
    }

}
const mapStateToProps = (state) => {

}

export default connect(null, { signOutAction })(Header);