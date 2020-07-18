import React from 'react';
import { connect } from 'react-redux';
import { fetchUser, editUser } from '../../actions';
import { reduxForm, Field } from 'redux-form';
class EditProfile extends React.Component{
    componentDidMount() {
        //console.log(this.props.match.params.id)
        this.props.fetchUser(this.props.match.params.id);
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
        console.log(formValues)
        this.props.editUser(this.props.match.params.id, formValues);
        console.log(formValues)
    }
    render(){
        if (!this.props.user) {
            return <div>Loading user... </div>
        }
    return (
        <div className="ui container">
            <h3>Edit details for User : {this.props.user.first_name}</h3>
            <form className="ui form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <div className="fields">
                    <div className="eight wide field">
                        <Field name="first_name" component={this.renderInput} label="First Name" placeholder={this.props.user.first_name} type="text" />
                    </div>
                    <div className="eight wide field">
                        <Field name="last_name" component={this.renderInput} label="Last Name" placeholder={this.props.user.last_name} type="text" />
                    </div>
                    
            </div>
            <div className="fields">
                    <div className="eight wide field">
                        <Field name="user_name" component={this.renderInput} label="Username" placeholder={this.props.user.user_name} type="text" />
                    </div>
                    <div className="eight wide field">
                        <Field name="password" component={this.renderInput} label="Password" placeholder="**********" type="text" />
                    </div>
            </div>
            <div className="fields">
                    <div className="eight wide field">
                        <Field name="user_role" component="select" label="User Role" className="ui search dropdown" >
                            <option value="1">Admin</option>
                            <option value="2">Manager</option>
                            <option value="3">Cashier</option>
                        </Field>
                    </div>
            </div>
                <div>
                    <button type="submit" className="ui primary button">Update Details</button>
                </div>
            </form>
        </div>
    );
}}

const formWrapped = reduxForm({
    form: 'editUser'
})(EditProfile);  
  
const mapToSatate = (state, ownPorps) => {
    //console.log(state.users[ownPorps.match.params.id])
    return { user: state.users[ownPorps.match.params.id] };
}
export default connect(mapToSatate, { fetchUser, editUser })(formWrapped);
