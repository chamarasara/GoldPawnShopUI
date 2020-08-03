import React from 'react';
import { connect } from 'react-redux';
import { fetchArticles, fetchArticle } from '../../actions'
import { Link } from "react-router-dom";
import * as jwt_decode from "jwt-decode";

class RelatedArticle extends React.Component {
    componentDidMount() {
        console.log(this.props)
        this.props.fetchArticles();
        //this.props.fetchArticle(this.props.id_number);
    }
    
    renderList() {
        // const token = localStorage.getItem('user');
        // const decoded = jwt_decode(token)        
        return this.props.articles.map(articles => {
            if (articles.id_number === this.props.userId && articles.articleId  !== this.props.articleId) {
                if (articles.color == 1) {
                    return (
                        <tr key={articles._id}>
                            <td className="collapsing" style={{ fontSize: "12px", backgroundColor: "#f44336", color: "#fff" }}>
                                {articles.articleId}
                            </td>
                            <td className="collapsing" style={{ fontSize: "12px" }}>{articles.date}</td>
                            <td className="collapsing" style={{ fontSize: "12px" }}>{articles.first_name + " " + articles.last_name}</td>
                            <td className="collapsing" style={{ fontSize: "12px" }}>{articles.address}</td>
                            <td className="collapsing" style={{ fontSize: "12px" }}>{articles.id_number}</td>
                            <td className="collapsing" style={{ fontSize: "12px" }}>{articles.phone_number}</td>
                            <td className="collapsing" style={{ fontSize: "12px" }}>{articles.amount}</td>
                            <td className="collapsing" style={{ fontSize: "12px" }}>{articles.weight}</td>
                            <td className="collapsing" style={{ fontSize: "12px" }}>{articles.addtional_details}</td>
                            <td className="collapsing" style={{ fontSize: "12px" }}>{articles.interest_paid}</td>
                            <td className="collapsing" style={{ fontSize: "12px" }}>{articles.speacial_circumstances}</td>
                            <td className="collapsing" style={{ fontSize: "12px" }}>{articles.released_date}</td>
                            <td className="collapsing" style={{ fontSize: "12px" }}>{articles.released_amount}</td>
                            <td className="collapsing" style={{ fontSize: "12px" }}>{articles.released_final_date}</td>
                            <td className="collapsing" style={{ fontSize: "12px" }}>
                                <Link to={`/singlearticle/${articles._id}`} className="mini ui primary button">View</Link>
                            </td>
                        </tr>
                    );
                } else if (articles.color == 2) {
                    return (
                        <tr key={articles._id}>
                            <td className="collapsing" style={{ fontSize: "12px", backgroundColor: "#000", color: "#fff" }}>
                                {articles.articleId}
                            </td>
                            <td className="collapsing" style={{ fontSize: "12px" }}>{articles.date}</td>
                            <td className="collapsing" style={{ fontSize: "12px" }}>{articles.first_name + " " + articles.last_name}</td>
                            <td className="collapsing" style={{ fontSize: "12px" }}>{articles.address}</td>
                            <td className="collapsing" style={{ fontSize: "12px" }}>{articles.id_number}</td>
                            <td className="collapsing" style={{ fontSize: "12px" }}>{articles.phone_number}</td>
                            <td className="collapsing" style={{ fontSize: "12px" }}>{articles.amount}</td>
                            <td className="collapsing" style={{ fontSize: "12px" }}>{articles.weight}</td>
                            <td className="collapsing" style={{ fontSize: "12px" }}>{articles.addtional_details}</td>
                            <td className="collapsing" style={{ fontSize: "12px" }}>{articles.interest_paid}</td>
                            <td className="collapsing" style={{ fontSize: "12px" }}>{articles.speacial_circumstances}</td>
                            <td className="collapsing" style={{ fontSize: "12px" }}>{articles.released_date}</td>
                            <td className="collapsing" style={{ fontSize: "12px" }}>{articles.released_amount}</td>
                            <td className="collapsing" style={{ fontSize: "12px" }}>{articles.released_final_date}</td>
                            <td className="collapsing" style={{ fontSize: "12px" }}>
                                <Link to={`/singlearticle/${articles._id}`} className="mini ui primary button">View</Link>
                            </td>
                        </tr>
                    );
                } else if (articles.color == 3) {
                    return (
                        <tr key={articles._id}>
                            <td className="collapsing" style={{ fontSize: "12px", backgroundColor: "#42a5f5", color: "#fff" }}>
                                {articles.articleId}
                            </td>
                            <td className="collapsing" style={{ fontSize: "12px" }}>{articles.date}</td>
                            <td className="collapsing" style={{ fontSize: "12px" }}>{articles.first_name + " " + articles.last_name}</td>
                            <td className="collapsing" style={{ fontSize: "12px" }}>{articles.address}</td>
                            <td className="collapsing" style={{ fontSize: "12px" }}>{articles.id_number}</td>
                            <td className="collapsing" style={{ fontSize: "12px" }}>{articles.phone_number}</td>
                            <td className="collapsing" style={{ fontSize: "12px" }}>{articles.amount}</td>
                            <td className="collapsing" style={{ fontSize: "12px" }}>{articles.weight}</td>
                            <td className="collapsing" style={{ fontSize: "12px" }}>{articles.addtional_details}</td>
                            <td className="collapsing" style={{ fontSize: "12px" }}>{articles.interest_paid}</td>
                            <td className="collapsing" style={{ fontSize: "12px" }}>{articles.speacial_circumstances}</td>
                            <td className="collapsing" style={{ fontSize: "12px" }}>{articles.released_date}</td>
                            <td className="collapsing" style={{ fontSize: "12px" }}>{articles.released_amount}</td>
                            <td className="collapsing" style={{ fontSize: "12px" }}>{articles.released_final_date}</td>
                            <td className="collapsing" style={{ fontSize: "12px" }}>
                                <Link to={`/singlearticle/${articles._id}`} className="mini ui primary button">View</Link>
                            </td>
                        </tr>
                    );
                }

            }
        });
    }
    render() {
        //console.log(this.props.articles);
        return (
            <div className="">
                <div className="row" style={{ marginTop:"30px" }}>
                    <h4>Other Articles for ID Number {this.props.userId}</h4>
                    <div className="sixteen wide column"></div>
                    <table className="ui unstackable small fixed  table">
                        <thead>
                            <tr>
                                <th style={{ fontSize: "12px" }}>Article No</th>
                                <th style={{ fontSize: "12px" }}>Date</th>
                                <th style={{ fontSize: "12px" }}>Full Name</th>
                                <th style={{ fontSize: "12px" }}>Address</th>
                                <th style={{ fontSize: "12px" }}>ID No</th>
                                <th style={{ fontSize: "12px" }}>Phone</th>
                                <th style={{ fontSize: "12px" }}>Amount</th>
                                <th style={{ fontSize: "12px" }}>Weight</th>
                                <th style={{ fontSize: "12px" }}>Details</th>
                                <th style={{ fontSize: "12px" }}>Interest Paid</th>
                                <th style={{ fontSize: "12px" }}>Special Circumstances</th>
                                <th style={{ fontSize: "12px" }}>Released Date</th>
                                <th style={{ fontSize: "12px" }}>Released Amount</th>
                                <th style={{ fontSize: "12px" }}>Released Final Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderList()}
                        </tbody>
                    </table>

                </div>
            </div>
        );
    };
};
//Map data from the store
const mapToSatate = (state, ownPorps) => {
    console.log(Object.values(state.articles))
    return {
        articles: Object.values(state.articles)
    };
}

export default connect(mapToSatate, { fetchArticles, fetchArticle })(RelatedArticle);