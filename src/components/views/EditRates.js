import React from 'react';
import { connect } from 'react-redux';
import { fetchRates, editRates } from '../../actions/';
import { reduxForm, Field } from 'redux-form';


class EditRates extends React.Component {
    componentDidMount() {
        this.props.fetchRates(this.props.match.params.id);
        console.log(this.props)
    }
    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="Header">{error}</div>
                </div>
            );
        }
    }
    renderInput = ({ input, label, placeholder, type, meta, step, defaultValue }) => {
        console.log(this.props)
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} placeholder={placeholder} step={step} value={defaultValue} type={type} autoComplete="off" />
            </div>
        );
    }
    onSubmit = (formValues) => {
        console.log(formValues)
        this.props.editRates(this.props.match.params.id, formValues);
    }
    render() {
        if (!this.props.interest) {
            return <div>Loading Interest... </div>
        }
        return (
            <div className="ui center aligned container">
                <h3>Edit Interest and Amount</h3>
                <form className="ui mini form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <div className="fields">
                        <div className="eight wide field">
                            <div className="content">
                                <h5>{this.props.interest.min_amount}-{this.props.interest.mid_amount}</h5>
                            </div>                           
                        </div>
                        <div className="eight wide field  ">
                            <Field name="oneDay_onetoten" component={this.renderInput} placeholder={this.props.interest.oneDay_onetoten} label="Day" type="number" step="0.01" />
                           
                        </div>
                        <div className="eight wide field">
                            <Field name="oneWeek_onetoten" component={this.renderInput} placeholder={this.props.interest.oneWeek_onetoten} label="Week " step="0.1" type="number" step="0.01"/>
                        </div>
                        <div className="eight wide field">
                            <Field name="oneMonth_onetoten" component={this.renderInput} placeholder={this.props.interest.oneMonth_onetoten} label="Month " step="0.1" type="number" step="0.01"/>
                        </div>
                    </div>
                    <div className="fields">
                        <div className="eight wide field">
                            <h5>{this.props.interest.mid_amount}-{this.props.interest.max_amount}</h5>
                        </div>
                        <div className="eight wide field">
                            <Field name="oneDay_tentosixtyfive" component={this.renderInput} placeholder={this.props.interest.oneDay_tentosixtyfive} label="Day" step="0.1" type="number" step="0.01"/>
                        </div>
                        <div className="eight wide field">
                            <Field name="oneWeek_tentosixtyfive" component={this.renderInput} placeholder={this.props.interest.oneWeek_tentosixtyfive} label="Week" step="0.1" type="number" step="0.01"/>
                        </div>
                        <div className="eight wide field">
                            <Field name="oneMonth_tentosixtyfive" component={this.renderInput} placeholder={this.props.interest.oneMonth_tentosixtyfive} label="Month" step="0.1" type="number" step="0.01"/>
                        </div>
                    </div>
                    <div className="fields">
                        <div className="eight wide field">
                            <h5>Above {this.props.interest.max_amount}</h5>
                        </div>
                        <div className="eight wide field">
                            <Field name="oneDay_abovesixtyfive" component={this.renderInput} placeholder={this.props.interest.oneDay_abovesixtyfive} label="Day" step="0.1" type="number" step="0.01"/>
                        </div>
                        <div className="eight wide field">
                            <Field name="oneWeek_abovesixtyfive" component={this.renderInput} placeholder={this.props.interest.oneWeek_abovesixtyfive} label="Week " step="0.1" type="number" step="0.01"/>
                        </div>
                        <div className="eight wide field">
                            <Field name="oneMonth_abovesixtyfive" component={this.renderInput} placeholder={this.props.interest.oneMonth_abovesixtyfive} label="Month " step="0.1" type="number" step="0.01"/>
                        </div>
                    </div>   
                    <div className="fields">
                        <div className="eight wide field">
                            <h5>Amounts</h5>
                        </div>
                        <div className="eight wide field">
                            <Field name="min_amount" component={this.renderInput} placeholder={this.props.interest.min_amount} label="Min Amount" step="0.1" type="number" step="0.01" />
                        </div>
                        <div className="eight wide field">
                            <Field name="mid_amount" component={this.renderInput} placeholder={this.props.interest.mid_amount} label="Mid Amount " step="0.1" type="number" step="0.01"/>
                        </div>
                        <div className="eight wide field">
                            <Field name="max_amount" component={this.renderInput} placeholder={this.props.interest.max_amount} label="Max Amount " step="0.1" type="number" step="0.01"/>
                        </div>
                    </div>  
                    <div className="fields">
                        <div className="five wide field">
                            
                        </div>
                        <div className="five wide field">
                            <button type="submit" className="ui primary button">Update Details</button>
                        </div>
                        <div className="five wide field">                            
                        </div>
                    </div>                
                </form>
            </div>
        );
    }
}

const formWrapped = reduxForm({
    form: 'editRates'
})(EditRates);

const mapToSatate = (state, ownPorps) => {
    //console.log(ownPorps.match.params.id)
    return { interest: state.interest[ownPorps.match.params.id] };
}
export default connect(mapToSatate, { fetchRates, editRates })(formWrapped);
