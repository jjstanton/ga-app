import React from 'react';
import { Router, Route } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session'

import history from '../../history';
import Header from '../Navigation/Header';
import SideMenu from "../Navigation/SideMenu";
import Landing from '../Landing/Landing';
import Dashboard from '../Dashboard/Dashboard';
import Admin from "../Admin/Admin";
import Account from "../Account/Account";

const App = () => {
    return(
        <Router history={history}>

            <Header />
            <SideMenu />

            <Route path={ROUTES.LANDING} exact component={Landing} />
            <Route path={ROUTES.SIGN_UP} exact component={Landing} />
            <Route path={ROUTES.PASSWORD_FORGET} exact component={Landing} />

            <div className="contentArea">
                <Route path={ROUTES.DASHBOARD} exact component={ Dashboard } />
                <Route path={ROUTES.ADMIN} exact component={ Admin } />
                <Route path={ROUTES.ACCOUNT} exact component={ Account } />
            </div>

        </Router>
    );
};

export default withAuthentication(App);