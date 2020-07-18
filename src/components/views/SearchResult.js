import React from 'react';
import { connect } from 'react-redux';
import { fetchArticles } from '../../actions';
import { Link } from "react-router-dom";

class SearchResults extends React.Component {
    componentDidMount() {
        this.props.fetchArticles();
    }
    renderList() {
        // const token = localStorage.getItem('user');
        // const decoded = jwt_decode(token)
        //console.log(decoded);

        return this.props.articles.map(articles => {
            if (articles.color === 1) {
                if (articles.article_status === "Active" || articles.article_status === "Released") {
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

                } else if (articles.article_status === "Blocked") {
                    return (
                        <tr key={articles._id} style={{ fontSize: "12px", backgroundColor: "#ff5252", color: "#000" }}>
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
                }
                else if (articles.article_status === "Expired") {
                    return (
                        <tr key={articles._id} style={{ fontSize: "12px", backgroundColor: "#fff59d", color: "#000" }}>
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
                }

            } else if (articles.color === 2) {
                if (articles.article_status === "Active" || articles.article_status === "Released") {
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

                } else if (articles.article_status === "Blocked") {
                    return (
                        <tr key={articles._id} style={{ fontSize: "12px", backgroundColor: "#ffcdd2", color: "#000" }}>
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
                }
                else if (articles.article_status === "Expired") {
                    return (
                        <tr key={articles._id} style={{ fontSize: "12px", backgroundColor: "#fff59d", color: "#000" }}>
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
                }
            } else if (articles.color === 3) {
                if (articles.article_status === "Active" || articles.article_status === "Released") {
                    return (
                        <tr key={articles._id}>
                            <td className="collapsing" style={{ fontSize: "12px", backgroundColor: "#2196f3", color: "#fff" }}>
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
                } else if (articles.article_status === "Blocked") {
                    return (
                        <tr key={articles._id} style={{ fontSize: "12px", backgroundColor: "#ffcdd2", color: "#000" }}>
                            <td className="collapsing" style={{ fontSize: "12px", backgroundColor: "#2196f3", color: "#fff" }}>
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
            else if (articles.article_status === "Expired") {
                return (
                    <tr key={articles._id} style={{ fontSize: "12px", backgroundColor: "#fff59d", color: "#000" }}>
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
            }
        });
    }
    render() {
        //console.log(this.props.articles)
        if (this.props.articles.length <= 1) {
            return (
                <div className="ui grid">
                    <div className="six wide column"></div>
                    <div className="four wide column">
                        <h4>No results found!</h4>
                    </div>
                    <div className="six wide column"></div>
                </div>
            );
        }else{
            return (
                <div className="">
                    <div className="row">
                        <h4>Search Result</h4>
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
        }
    };
};

const mapToSatate = (state) => {
    //console.log(Object.values(state.searchArticles))
    const articles = Object.values(state.searchArticles)
    articles.reverse()
    return {
        articles: Object.values(state.searchArticles)
    };
}

export default connect(mapToSatate, {fetchArticles})(SearchResults);