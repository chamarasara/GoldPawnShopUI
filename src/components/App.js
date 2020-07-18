import React from 'react';
import { Route, Router } from 'react-router-dom';
import Header from './views/Header';
import NewRecord from './views/NewRecord'
import Dashboard from './views/Dashboard';
import Reports from './views/Reports';
import Profile from './views/Profile';
import UserList from './views/UserList';
import EditProfile from './views/EditProfile';
import SingleArticle from './views/SingleArticle';
import EditArticle from './views/EditArticle';
import DeleteArticle from './views/DeleteArticle';
import DeleteUser from './views/DeleteUser'
import Signin from './views/Signin';
import Settings from './views/Settings';
import { PrivateRoute } from '../PrivateRoute';
import history from "../history";
import RenewArticle from './views/RenewArticle';
import EditRates from './views/EditRates';
import ListRecords from './views/ListRecords';
import ActivityLog from './views/ActivityLog';
import PrintReports from'./views/PrintReports';

class App extends React.Component{

    render (){
    return(
        <div className="ui" style={{ paddingLeft: "0px", paddingRight: "0px"}}>                
                <Router history={history}>
                    <div>
                    <Route path="/login"  component={Signin} />  
                    <Header className="ui secondary pointing menu" />
                    <PrivateRoute path="/" exact component={Dashboard}/>
                    <PrivateRoute path="/newrecord" component={NewRecord} />
                    <PrivateRoute path="/reports" component={Reports}/>
                    <PrivateRoute path="/myprofile" component={Profile} />
                    <PrivateRoute path="/userlist" component={UserList} />
                    <PrivateRoute path="/editprofile" component={EditProfile} />
                    <PrivateRoute path="/singlearticle/:id" component={SingleArticle} />      
                    <PrivateRoute path="/editarticle/:id" component={EditArticle} />  
                    <PrivateRoute path="/deletearticle/:id" component={DeleteArticle} /> 
                    <PrivateRoute path="/userprofile/:id" component={Profile} /> 
                    <PrivateRoute path="/useredit/:id" component={EditProfile} /> 
                    <PrivateRoute path="/userdelete/:id" component={DeleteUser} />
                    <PrivateRoute path="/renewarticle/:id" component={RenewArticle} />
                    <PrivateRoute path="/settings" component={Settings} />
                    <PrivateRoute path="/allarticles" component={ListRecords} />
                    <PrivateRoute path="/rates/:id" component={EditRates} />
                    <PrivateRoute path="/activitylog" component={ActivityLog} />
                    <PrivateRoute path="/print" component={PrintReports} />
                    </div>
                </Router> 
            </div>
    );
}
}

export default App;
