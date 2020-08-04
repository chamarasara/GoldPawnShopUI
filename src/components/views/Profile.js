import React from "react";
import { connect } from 'react-redux';
import ProfileImage from './profile-image.png';
import { Link } from "react-router-dom";
import * as jwt_decode from "jwt-decode";
//import EditProfile from "./EditProfile";
import {fetchUser} from '../../actions';

class Profile extends React.Component{
    componentDidMount() {
        //console.log(this.props.match.params.id)
        this.props.fetchUser(this.props.match.params.id);
    }
    adminRendering() {
        const token = sessionStorage.getItem('user');
        const decoded = jwt_decode(token);
        //console.log(decoded)
        if (decoded.user_role === 1) {
            return <div>
                <Link to={`/useredit/${this.props.match.params.id}`} className="ui primary button">
                   Edit 
                    </Link>
                <Link to={`/userdelete/${this.props.match.params.id}`} className="ui button">
                    Delete 
                    </Link>
            </div>
        }
    }
    userRole(){
        const user_role = this.props.user.user_role;
        if (user_role==1) {
            return <div className="item">
                <div className="ui horizontal label">User Role </div>
                Admin
            </div>
        }else if (user_role==2){
            return <div className="item">
                <div className="ui horizontal label">User Role </div>
                Manager
            </div>
        }else if(user_role==3){
            return <div className="item">
                <div className="ui horizontal label">User Role </div>
                Cashier
            </div>
        }
    }
    render(){
    if(!this.props.user) {
        return <div>Select a user </div>
    }
    return (
        <div className="ui container">
            <div className="ui grid" >
                <div className="six wide column">
                    <div className="ui divided selection list">
                        <div className="item" >
                            <div className="ui horizontal label">Full Name </div>
                            {this.props.user.first_name + " " + this.props.user.last_name}
                        </div>
                        
                        <div className="item">
                            <div className="ui horizontal label">Username</div>
                            {"@" + this.props.user.user_name}
                        </div>
                        {this.userRole()}
                    </div>
                    {this.adminRendering()}
                </div>
                <div className="ten wide column" >
                    
                </div >
            </div>
        </div>
    );
}
}
   
const mapToSatate = (state, ownPorps) => {
    console.log(state)
    return { user: state.users[ownPorps.match.params.id] };
}
export default connect(mapToSatate, { fetchUser })(Profile);