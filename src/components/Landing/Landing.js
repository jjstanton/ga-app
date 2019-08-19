import React from 'react';
import {Link, Route} from "react-router-dom";
import { Button } from "semantic-ui-react";
import * as ROUTES from "../../constants/routes";
import Login from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import {AuthUserContext} from "../Session";
import PasswordForgotPage from "../PasswordForget/PasswordForget";

class Landing extends React.Component{
    state = { loginLink: 'login' };

    historyTest = () => {
        console.log(this.props.history);
    };

    onLoginLink = (e, { name } ) => {
        this.setState({ loginLink: name });
    };

    render(){
        const { loginLink } = this.state;

        return(
            <AuthUserContext.Consumer>
                {(authUser) =>
                    !authUser ?
                        <div className="ui segment raised loginpanel"
                             style={{top: '120px', width: '650px', margin: 'auto', padding: '0px'}}>
                            <Button.Group attached='top'>
                                <Button as={Link} to={ROUTES.LANDING} className="ui button" name='login' active={loginLink === 'login'} onClick={this.onLoginLink}>Login</Button>
                                <Button as={Link} to={ROUTES.SIGN_UP} className="ui button" name='signup' active={loginLink === 'signup'} onClick={this.onLoginLink}>Sign Up</Button>
                                <Button as={Link} to={ROUTES.PASSWORD_FORGET} className="ui button" name='password' active={loginLink === 'password'} onClick={this.onLoginLink}>Reset</Button>
                            </Button.Group>
                            <div className="ui attached segment">
                                <Route path={ROUTES.LANDING} exact component={Login}/>
                                <Route path={ROUTES.SIGN_UP} exact component={SignUp}/>
                                <Route path={ROUTES.PASSWORD_FORGET} exact component={PasswordForgotPage}/>
                            </div>
                        </div>
                        : null
                }
            </AuthUserContext.Consumer>
        );
    };
}

export default Landing;