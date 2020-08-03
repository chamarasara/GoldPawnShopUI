import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Modal from '../Modal';
import history from '../../history';
import { fetchArticle } from '../../actions';

class RenewArticleModal extends React.Component {
    componentDidMount() {
        //console.log(this.props.match.params.id)
        this.props.fetchArticle(this.props.match.params.id);
    }
    renderActions() {
        const { id } = this.props.match.params;
        return (
            <React.Fragment>
                <Link to={`/renewbypaying/${this.props.match.params.id}`} className="ui primary button">Yes</Link>
                <Link to={`/singlearticle/${this.props.match.params.id}`} className="ui cancel button">No</Link>
            </React.Fragment>
        );
    }

    renderContent() {
        if (!this.props.article) {
            return 'Are you sure about Renew this Article? '
        }
        return `Are you sure about Renew this Article: ${this.props.article.articleId} ?` 
    }
    render() {
        return (
            <Modal header="Renew Article " content={this.renderContent()} actions={this.renderActions()} onDismiss={() => history.push(`/singlearticle/${this.props.match.params.id}`)} />
        );
    }
}

//Map data from the store
const mapToSatate = (state, ownPorps) => {
    console.log(state, ownPorps.match.params.id)
    return { article: state.articles[ownPorps.match.params.id] };
}
export default connect(mapToSatate, { fetchArticle })(RenewArticleModal);