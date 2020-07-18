import React from 'react';
import { connect } from 'react-redux';
import { editSelectedUser } from '../../actions';
import ProfileImage from './profile-image.png';
import NewUser from './NewUser';
import { Link } from "react-router-dom";
import { fetchUsers } from '../../actions';


class UserList extends React.Component{
    componentDidMount(){
        //console.log(props)
        this.props.fetchUsers()
    }
    renderList() {
        return this.props.users.map((users) => {
            return (
                <div className="card" key={users._id}>
                    <div className="content">
                        <img className="right floated mini ui image" src={ProfileImage} />
                        <div className="header">
                            {users.first_name + " " + users.last_name}
                            </div>
                        <div className="meta">
                            {"@"+users.user_name}
                            </div>
                    </div>
                    <div className="extra content">
                        <Link to={`/userprofile/${users._id}`} className="ui primary button">View Profile</Link>
                    </div>
                </div>
            );
        });
    }
    render(){
        //console.log(this.props)
        return (
            <div className="ui container">
                <div>
                    <h3>Create A User</h3>
                    <NewUser />
                </div>
                <div className="ui container">
                    <h3>All Users</h3>
                    <div className="ui cards">
                        {this.renderList()}                                             
                    </div>
                </div>
            </div>
        );
    }
}
//Map data from the store
const mapToSatate = (state) => {
   console.log(state)
    return {
        users: Object.values(state.users)
    };
}
export default connect(mapToSatate, { fetchUsers })(UserList);
