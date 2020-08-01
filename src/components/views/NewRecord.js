import React from "react";
import { Field, reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import { newArticle } from '../../actions';



class NewRecord extends React.Component{
    //Show errors in the form fields
    renderError({error, touched}){
        if (touched && error) {
            return(
                <div className="ui error message">
                    <div className="Header">{error}</div>
                </div>
            );
        }
    }
    errorMessage() {
        if (this.props.errorMessage) {
            return (
                <div className="ui error message">
                    {this.props.errorMessage}
                </div>
            );
        }
    }
    renderInput = ({ input, label, placeholder, type, meta}) => {
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} placeholder={placeholder} type={type} autoComplete="off"/>
                {this.renderError(meta)}
                </div>
        );
    }
    onSubmit = (formValues) => {
        this.props.newArticle(formValues);
        console.log(formValues)
    }

    render(){
    return (
            <div className="ui container" style={{ marginTop: "30px", marginBottom: "30px" }}>
                <h4>Add New Record</h4>
                <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <div className="fields">
                        <div className="eight wide field">                            
                        <Field name="first_name" component={this.renderInput} label="First Name" placeholder="First Name" type="text"/>
                        </div>
                        <div className="eight wide field">
                        <Field name="last_name" component={this.renderInput} label="Last Name" placeholder="Last Name" type="text"/>
                        </div>
                    </div>
                    <div className="sixteen wide field">
                    <Field name="address" component={this.renderInput} label="Address" placeholder="Address" type="text" />
                    </div>
                    <div className="four fields">
                        <div className="field">
                        <Field name="id_number" component={this.renderInput} label="ID Number" placeholder="ID Number" type="number" />
                        </div>
                        <div className="field">
                        <Field name="phone_number" component={this.renderInput} label="Phone Number" placeholder="Phone Number" type="number" />
                        </div>
                        <div className="field">
                        <Field name="amount" component={this.renderInput} label="Amount" placeholder="Amount" type="number" />
                        </div>
                        <div className="field">
                        <Field name="weight" component={this.renderInput} label="Weight" placeholder="Weight" type="number" />
                        </div>
                        <div className="field">
                            <label>Duration</label>
                        <Field name="duration" component="select" label="Weight">
                            <option />
                            <option value="1">One Year</option>
                            <option value="3">Three Months</option>                            
                        </Field>                                               
                        </div>                    
                    </div>
                    <div className="four fields">
                    <div className="field">
                        <Field name="articleId" component={this.renderInput} label="Article Number" placeholder="Article Number" type="number" />
                        {this.errorMessage()}
                    </div>
                    <div className="field">
                        <label>Color</label>
                        <Field name="color" component="select" label="Weight">
                            <option />
                            <option value="1">Red</option>
                            <option value="2">Black</option>
                            <option value="3">Blue</option>
                        </Field>
                    </div>                    
                    </div>
                    <div className="field">
                    <Field name="addtional_details" component={"textarea"} label="Additional Details" placeholder="Additional Details" type="textarea" />
                    </div>
                    <div className="field">
                        <button type="submit" className="ui primary button">Add New Record</button>
                    </div>
                </form>
            </div>
        );
}
}

//Form input validation
const validate = (formValues) =>{
    const errors = {}
    if (!formValues.first_name) {
        errors.first_name='Please enter the First Name';
    }
    if (!formValues.last_name) {
        errors.last_name = 'Please enter the Last Name';
    }
    if (!formValues.address) {
        errors.address = 'Please enter the Address';
    }
    if (!formValues.id_number) {
        errors.id_number = 'Please enter the ID Nummber';
    }
    if (!formValues.phone_number) {
        errors.phone_number = 'Please enter the Phone Number';
    }
    if (!formValues.amount) {
        errors.amount = 'Please enter the Amount';
    }
    if (!formValues.weight) {
        errors.weight = 'Please enter the Weight';
    }
    if (!formValues.duration) {
        errors.duration = 'Please select the Duration';
    }
    if (!formValues.articleId) {
        errors.articleId = 'Please select the Article Number';
    }
    if (!formValues.color) {
        errors.color = 'Please select the Article Number';
    }
    return errors;
}
                                                                            
const formWrapped =  reduxForm({
    form: 'newArticle',
    validate: validate
})(NewRecord);

export default connect(null, {newArticle})(formWrapped);