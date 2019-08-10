import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { ReactCSSTransitionGroup } from 'react-addons-css-transition-group'
import { signIn, signOut } from "../actions";
import { connect } from 'react-redux';

import history from '../history';
import Header from './Header';
import Login from  './Login';
import Dashboard from './Dashboard';
import Rules from "./Rules";
import PrivateRoute from "./PrivateRoute";
import SideMenu from "./SideMenu";

class App extends React.Component{

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '770927704354-q801bh4srcbahe6kelu9ras38m4jnvd2.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange( this.auth.isSignedIn.get() );
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = (isSignedIn) => {
        if ( isSignedIn ) {
            const UserDetails = {
                userId: this.auth.currentUser.get().getId(),
                userName: this.auth.currentUser.get().getBasicProfile().getName(),
                userEmail: this.auth.currentUser.get().getBasicProfile().getEmail(),
                userImage: this.auth.currentUser.get().getBasicProfile().getImageUrl()
            };
            // Saves state to REDUX
            this.props.signIn(
                UserDetails.userId,
                UserDetails.userName,
                UserDetails.userEmail,
                UserDetails.userImage
            );
        } else {
            // Removes state from REDUX
            this.props.signOut();
            console.log('Working!!');
        }
    };

    onSignInClick = () => {
        // Signs user into GOOGLE
        this.auth.signIn({prompt: 'consent'});
    };

    onSignOutClick = () => {
        // Signs user out of GOOGLE
        this.auth.signOut();
    };

    render(){
        return(
            <div className="pusher">
                <ReactCSSTransitionGroup
                    transitionAppear={true}
                    transitionAppearTimeout={600}
                    transitionEnterTimeout={600}
                    transitionLeaveTimeout={200}
                    transitionName='FadeIn'
                >
                <Router history={history}>

                    <Header onSignOutClick={this.onSignOutClick} />

                    <PrivateRoute component={SideMenu} authed={ this.props.isSignedIn } />

                    <Route path="/" exact render={ () => ( !this.props.isSignedIn ? <Login signInEvent={this.onSignInClick} /> : <Redirect to="/dashboard"/> )} />

                    <div className="contentArea">
                        <Switch>
                            <PrivateRoute path="/dashboard" exact component={ Dashboard } authed={ this.props.isSignedIn } />
                            <PrivateRoute path="/rules" exact component={ Rules } authed={ this.props.isSignedIn } />
                        </Switch>
                    </div>

                </Router>
                </ReactCSSTransitionGroup>
            </div>

        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return{
        isSignedIn: state.auth.isSignedIn,
        UserId: state.auth.userId
    }
};

export default connect( mapStateToProps, { signIn, signOut } )( App );