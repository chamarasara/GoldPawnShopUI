import React from 'react';
import { connect } from 'react-redux';
import { fetchArticle, editArticle } from '../../actions';
import { reduxForm, Field } from 'redux-form';
import * as jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
class EditArticle extends React.Component {
    componentDidMount() {
        //console.log(this.props.match.params.id)
        this.props.fetchArticle(this.props.match.params.id);
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
        this.props.editArticle(this.props.match.params.id, formValues, this.props.article.articleId);
        //console.log(this.props.match.params.id)
    }
    adminRendering() {
        const token = sessionStorage.getItem('user');
        const decoded = jwt_decode(token);
        //console.log(decoded)
        if (decoded.user_role === 1) {
            return <div className="ui container" style={{ marginTop: "30px", marginBottom: "30px" }}>
                <h3>Edit Article Number {this.props.article.articleId}</h3>
                <form className="ui mini form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <div className="fields">
                        <div className="eight wide field">
                            <Field name="first_name" component={this.renderInput} label="First Name" placeholder={this.props.article.first_name} type="text" />
                        </div>
                        <div className="eight wide field">
                            <Field name="last_name" component={this.renderInput} label="Last Name" placeholder={this.props.article.last_name} type="text" />
                        </div>
                    </div>
                    <div className="sixteen wide field">
                        <Field name="address" component={this.renderInput} label="Address" placeholder={this.props.article.address} type="text" />
                    </div>
                    <div className="four fields">
                        <div className="field">
                            <Field name="id_number" component={this.renderInput} label="ID Number" placeholder={this.props.article.id_number} type="number" />
                        </div>
                        <div className="field">
                            <Field name="phone_number" component={this.renderInput} label="Phone Number" placeholder={this.props.article.phone_number} type="number" />
                        </div>
                        <div className="field">
                            <Field name="amount" component={this.renderInput} label="Amount Pawned" placeholder={this.props.article.amount} type="number" />
                        </div>
                        <div className="field">
                            <Field name="amount" component={this.renderInput} label="Additional Amount Pawned" placeholder={this.props.article.additional_amount} type="number" />
                        </div>
                        <div className="field">
                            <Field name="released_amount" component={this.renderInput} label="Total Amount Paid" placeholder={this.props.article.released_amount} type="number" />
                        </div>
                        <div className="field">
                            <Field name="interest_paid" component={this.renderInput} label="Interest Paid" placeholder={this.props.article.interest_paid} type="number" />
                        </div>                                                                   
                    </div>
                    
                    <div className="four fields">
                        <div className="field">
                            <Field name="weight" component={this.renderInput} label="Weight" placeholder={this.props.article.weight} type="number" />
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
                        
                        
                        <div className="field">
                            <label>Duration</label>
                            <Field name="duration" component="select" label="Weight">
                                <option />
                                <option value="1">One Year</option>
                                <option value="3">Three Months</option>
                            </Field>
                        </div>
                        <div className="field">
                            <Field name="released_final_date" component={this.renderInput} label="Final Date" placeholder={this.props.article.released_final_date} type="date" />
                        </div>
                        <div className="field">
                            <Field name="released_date" component={this.renderInput} label="Released Date" placeholder={this.props.article.released_date} type="date" />
                        </div>
                        
                    </div>
                    <div className="field">
                        <Field name="addtional_details" component={this.renderInput} placeholder={this.props.article.addtional_details} label="Additional Details" type="text" />
                    </div>
                    <div className="field">
                        <Field name="speacial_circumstances" component={this.renderInput} placeholder={this.props.article.speacial_circumstances} label="Special Circumstance" type="text" />
                    </div>
                    <div className="field">
                        <button type="submit" className="ui primary button">Update Record</button>
                    </div>
                </form>
            </div>
        } else if (decoded.user_role === 2) {
            return <div className="ui container" style={{ marginTop: "30px", marginBottom: "30px" }}>
                <h3>Edit Article Number {this.props.article.articleId}</h3>
                <form className="ui mini form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <div className="fields">
                        <div className="eight wide disabled field">
                            <Field name="first_name" component={this.renderInput} label="First Name" placeholder={this.props.article.first_name} type="text" />
                        </div>
                        <div className="eight wide disabled  field">
                            <Field name="last_name" component={this.renderInput} label="Last Name" placeholder={this.props.article.last_name} type="text" />
                        </div>
                    </div>
                    <div className="sixteen wide disabled  field">
                        <Field name="address" component={this.renderInput} label="Address" placeholder={this.props.article.address} type="text" />
                    </div>
                    <div className="four fields">
                        <div className="disabled field">
                            <Field name="id_number" component={this.renderInput} label="ID Number" placeholder={this.props.article.id_number} type="number" />
                        </div>
                        <div className=" field">
                            <Field name="phone_number" component={this.renderInput} label="Phone Number" placeholder={this.props.article.phone_number} type="number" />
                        </div>
                        <div className="disabled field">
                            <Field name="amount" component={this.renderInput} label="Amount" placeholder={this.props.article.amount} type="number" />
                        </div>
                        <div className="disabled field">
                            <Field name="weight" component={this.renderInput} label="Weight" placeholder={this.props.article.weight} type="number" />
                        </div>
                        <div className="disabled field">
                            <Field name="interest_paid" component={this.renderInput} label="Interest Paid" placeholder={this.props.article.interest_paid} type="number" />
                        </div>
                        <div className="disabled field">
                            <Field name="released_date" component={this.renderInput} label="Released Date" placeholder={this.props.article.released_date} type="date" />
                        </div>
                        <div className="disabled field">
                            <Field name="released_amount" component={this.renderInput} label="Released Amount" placeholder={this.props.article.released_amount} type="number" />
                        </div>
                        <div className="disabled field">
                            <label>Duration</label>
                            <Field name="duration" component="select" label="Weight">
                                <option />
                                <option value="1">One Year</option>
                                <option value="3">Three Months</option>
                            </Field>
                        </div>
                    </div>
                    <div className="disabled field">
                        <Field name="addtional_details" component={this.renderInput} placeholder={this.props.article.addtional_details} label="Additional Details" type="text" />
                    </div>
                    <div className="field">
                        <Field name="speacial_circumstances" component={this.renderInput} placeholder={this.props.article.speacial_circumstances} label="Special Circumstance" type="text" />
                    </div>
                    <div className="field">
                        <button type="submit" className="ui primary button">Update Record</button>
                    </div>
                </form>
            </div>
        } else if (decoded.user_role === 3) {
            return <div className="ui container" style={{ marginTop: "30px", marginBottom: "30px" }}>
                <h3>Edit Article Number {this.props.article.articleId}</h3>
                <form className="ui mini form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <div className="fields">
                        <div className="eight wide disabled field">
                            <Field name="first_name" component={this.renderInput} label="First Name" placeholder={this.props.article.first_name} type="text" />
                        </div>
                        <div className="eight wide disabled  field">
                            <Field name="last_name" component={this.renderInput} label="Last Name" placeholder={this.props.article.last_name} type="text" />
                        </div>
                    </div>
                    <div className="sixteen wide disabled  field">
                        <Field name="address" component={this.renderInput} label="Address" placeholder={this.props.article.address} type="text" />
                    </div>
                    <div className="four fields">
                        <div className="disabled field">
                            <Field name="id_number" component={this.renderInput} label="ID Number" placeholder={this.props.article.id_number} type="number" />
                        </div>
                        <div className=" field">
                            <Field name="phone_number" component={this.renderInput} label="Phone Number" placeholder={this.props.article.phone_number} type="number" />
                        </div>
                        <div className="disabled field">
                            <Field name="amount" component={this.renderInput} label="Amount" placeholder={this.props.article.amount} type="number" />
                        </div>
                        <div className="disabled field">
                            <Field name="weight" component={this.renderInput} label="Weight" placeholder={this.props.article.weight} type="number" />
                        </div>
                        <div className="disabled field">
                            <Field name="interest_paid" component={this.renderInput} label="Interest Paid" placeholder={this.props.article.interest_paid} type="number" />
                        </div>
                        <div className="disabled field">
                            <Field name="released_date" component={this.renderInput} label="Released Date" placeholder={this.props.article.released_date} type="date" />
                        </div>
                        <div className="disabled field">
                            <Field name="released_amount" component={this.renderInput} label="Released Amount" placeholder={this.props.article.released_amount} type="number" />
                        </div>
                        <div className="disabled field">
                            <label>Duration</label>
                            <Field name="duration" component="select" label="Weight">
                                <option />
                                <option value="1">One Year</option>
                                <option value="3">Three Months</option>
                            </Field>
                        </div>
                    </div>
                    <div className="disabled field">
                        <Field name="addtional_details" component={this.renderInput} placeholder={this.props.article.addtional_details} label="Additional Details" type="text" />
                    </div>
                    <div className="disabled field">
                        <Field name="speacial_circumstances" component={this.renderInput} placeholder={this.props.article.speacial_circumstances} label="Special Circumstance" type="text" />
                    </div>
                    <div className="field">
                        <button type="submit" className="ui primary button">Update Record</button>
                    </div>
                </form>
            </div>
        }
    }
    render() {
        //console.log(this.props)
        if (!this.props.article) {
            return <div>Loading...</div>
        }
        return (
            <div>{this.adminRendering()}</div>
        );
    }

}
const formWrapped = reduxForm({
    form: 'editArticle'
})(EditArticle);

//Map data from the store
const mapToSatate = (state, ownPorps) => {
    //console.log(state)
    return { article: state.articles[ownPorps.match.params.id] };
}

export default connect(mapToSatate, { fetchArticle, editArticle })(formWrapped);