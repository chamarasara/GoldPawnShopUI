import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { createUser } from '../../actions';

class NewUser extends React.Component {
    
    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="Header">{error}</div>
                </div>
            );
        }
    }

    renderInput = ({ input, label, placeholder, type, meta }) => {
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} placeholder={placeholder} type={type} autoComplete="off" />
                {this.renderError(meta)}
            </div>

        );
    }
    onSubmit = (formValues) => {
        this.props.createUser(formValues)
        //console.log(formValues)
    }

    render(){
        return (
            <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)} style={{ marginTop: "10px", marginBottom: "50px" }}>
                <div className="two fields">
                    <div className="field">
                        <Field name="first_name" component={this.renderInput} label="First Name" placeholder="First Name" type="text" />
                    </div>
                    <div className="field">
                        <Field name="last_name" component={this.renderInput} label="Last Name" placeholder="Last Name" type="text" />
                    </div>
                </div>
                <div className="two fields">
                    <div className="field">
                        <Field name="user_name" component={this.renderInput} label="Username" placeholder="Username" type="text" />
                    </div>
                    <div className="field">
                        <label>User Role</label>                        
                        <Field name="user_role" component="select" label="User Role">
                            <option value="1">Admin</option>
                            <option value="2">Manager</option>
                            <option value="3">Cashier</option>
                        </Field>
                    </div>
                </div>
                <div className="three wide field">
                    <Field name="password" component={this.renderInput} label="Password" placeholder="Password" type="password" />
                </div>
                <button className="ui submit primary button" type="submit">Create User</button>
            </form>
        );
    }
    }
    
//Form input validation
const validate = (formValues) => {
    const errors = {}
    if (!formValues.FirstName) {
        errors.FirstName = 'Please enter the First Name';
    }
    if (!formValues.LastName) {
        errors.LastName = 'Please enter the Last Name';
    }
    if (!formValues.Username) {
        errors.Username = 'Please enter the Username';
    }
    if (!formValues.Password) {
        errors.Password = 'Please enter the Password';
    }
    

    return errors;
}
 const formWrapped =  reduxForm({
     form: 'newUser', 
     validate: validate
    })(NewUser);

export default connect(null, { createUser })(formWrapped);