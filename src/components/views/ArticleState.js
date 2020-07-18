import React from 'react';
import { connect } from 'react-redux';
import { fetchArticle, editArticle } from '../../actions';
import { reduxForm, Field } from 'redux-form';
import * as jwt_decode from "jwt-decode";

class ArticleState extends React.Component {
    componentDidMount() {
        //console.log(this.props.article)
        this.props.fetchArticle(this.props.article);
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
        this.props.editArticle(this.props.article._id, formValues, this.props.article.articleId);
        console.log(formValues)
    }


    adminRendering() {
        const token = localStorage.getItem('user');
        const decoded = jwt_decode(token);
        console.log(decoded)
        if (decoded.user_role ===1 ) {
            return <Field name="article_status" component="select" label="Weight">
                <option>---</option>
                <option value="Active">Active</option>
                <option value="Released">Released</option>
                <option value="Blocked">Blocked</option>
                <option value="Expired">Expired</option>
                <option value="Renewed">Renewed</option>
            </Field>

        } else if (decoded.user_role === 2 || decoded.user_role === 3) {
            return <Field name="article_status" component="select" label="Weight">
                <option>---</option>
                <option value="Released">Released</option>
                <option value="Blocked">Blocked</option>
                <option value="Expired">Expired</option>
                <option value="Renewed">Expired</option>
            </Field>

        }
    }
    render() {
        //console.log(this.props)
        if (!this.props.article) {
            return <div>Something went wrong</div>
        }
        return (
            <div className="" style={{ marginTop: "30px", marginBottom: "30px" }}>
                <h5>Update Status of Article Number {this.props.article.articleId}</h5>
                <form className="ui mini form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <div className="four fields">
                        <div className="field">
                            <label>Change State</label>
                            {this.adminRendering()}
                        </div>
                    </div>
                    <div className="field">
                        <button type="submit" className="ui primary button">Update Status</button>
                    </div>
                </form>
            </div>
        );
    }

}
const formWrapped = reduxForm({
    form: 'updateArticleStatus'
})(ArticleState);

//Map data from the store
const mapToSatate = (state, ownPorps) => {
    //console.log(ownPorps.article)
    return { article: state.articles[ownPorps.article] };
}


export default connect(mapToSatate, { fetchArticle, editArticle })(formWrapped);