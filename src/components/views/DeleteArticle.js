import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Modal from '../Modal';
import history from '../../history';
import { fetchArticle, deleteArticle } from '../../actions';

class DeleteArticle extends React.Component{
    componentDidMount(){
        console.log(this.props)
        this.props.fetchArticle(this.props.match.params.id);
    }
    renderActions(){
        const {id} = this.props.match.params;
        return(
            <React.Fragment>
                <button onClick={() => this.props.deleteArticle(id)} className="ui red button">Delete</button>
                <Link to={`/singlearticle/${this.props.match.params.id}`} className="ui cancel button">Cancel</Link>
            </React.Fragment>
        );
    }

    renderContent(){
        if (!this.props.article) {
            return 'Are you sure about deleting this Article? '
        }
        return `Are you sure about deleting Article Number: ${this.props.article.articleId}`
    }
    render(){
        return (
            <Modal header="Delete Article " content={this.renderContent()} actions={this.renderActions()} onDismiss={() => history.push(`/singlearticle/${this.props.match.params.id}`)} />
        );
    }  
}

//Map data from the store
const mapToSatate = (state, ownPorps) => {
    //console.log(ownPorps.match.params.id)
    return { article: state.articles[ownPorps.match.params.id] };
}
export default connect(mapToSatate, { fetchArticle, deleteArticle })(DeleteArticle);