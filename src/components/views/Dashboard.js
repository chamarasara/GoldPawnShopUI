import React from "react";
import ListRecord from "./ListRecords";
import SearchBar from "./SearchBar";
import { Link } from 'react-router-dom';
import SortByDate from "./SortByDate";
import NewRecord from "./NewRecord";
import SearchResult from "./SearchResult";

const Dashboard = () => {
    return (
        <div className="ui container">
            <h3 className="ui header" style={{ paddingLeft: "0px", paddingRight: "0px" }}>Dashboard</h3>
            <div>
                <NewRecord />
            </div>
            <div></div>
            <div className="row">
                <div className="ui grid">
                    <div className="eight wide column"><SearchBar /></div>
                    <div className="eight wide column"><SortByDate /></div>
                </div>
            </div>
            <div className="row">
                <SearchResult />
            </div>
            <div className="row">
                <div className="ui grid">
                    <div className="six wide column"></div>
                    <div className="four wide column" style={{ marginTop: "30px", marginBottom: "60px"}}>
                        <Link to={"/allarticles"} className="mini ui primary button">View all articles</Link>
                    </div>
                    <div className="six wide column"></div>
                </div>


            </div>
        </div>
    );

}
export default Dashboard;