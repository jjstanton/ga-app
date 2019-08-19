import React from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from "../Firebase";
import * as ROUTES from '../../constants/routes';

const PasswordForgotPage = () => (
    <div>
        <div className="column" style={{padding: '0px 15px'}}>
            <h2 className="ui center aligned icon header" style={{marginTop: '20px'}}>
                <i className="user icon font20" style={{display: 'inline-block'}} />
                <p style={{display: 'inline-block'}}>Password Reset</p>
            </h2>
            <br/>
            <PasswordForgetForm />
            <br/>
            <br/>
        </div>
    </div>
);

const INITIAL_STATE = {
    email: '',
    error: null,
};

class PasswordForgetFormBase extends React.Component{
    constructor(props){
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = (event) => {
        const { email } = this.state;

        this.props.firebase
            .doPasswordReset(email)
            .then(() => {
                this.setState({ ...INITIAL_STATE })
            })
            .catch((error) => {
                this.setState({ error })
            });
        event.preventDefault();
    };

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    };

    render(){
        const { email, error } = this.state;
        const isInvalid = email === '';

        return(
            <form onSubmit={this.onSubmit} className="ui form" autoComplete="new-password">
                <div className="field">
                    <div className="ui left icon input">
                        <i className="envelope icon" />
                        <input name="email" value={this.state.email} onChange={this.onChange} type="text" placeholder="Email Address" />
                    </div>
                </div>
                <button disabled={isInvalid} className="ui large fluid blue google button" type="submit">
                    Reset My Password
                </button>

                { error && <p>{error.message}</p> }
            </form>
        );
    }
}

const PasswordForgetLink = () => (
    <p>
        <Link to={ROUTES.PASSWORD_FORGET}> Forgot Password?</Link>
    </p>
);

export default PasswordForgotPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink }