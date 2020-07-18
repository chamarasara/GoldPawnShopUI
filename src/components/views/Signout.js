import React from "react";
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signOutAction } from '../../actions'

class Signout extends React.Component {
    submit = (values) => {
        this.props.signInAction(values, this.props.history);
    }
    
    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="ui container" style={{ marginTop: "30px", marginBottom: "30px" }}>
                <div>
                    <button type="button" onClick={this.submit} className="ui primary button">Sign In</button>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, { signOutAction })(Signout);