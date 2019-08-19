import React from 'react';
import { compose } from 'recompose';
import { withFirebase } from "../Firebase";
import { SignUpLink} from "../SignUp/SignUp";
import { PasswordForgetLink } from "../PasswordForget/PasswordForget";
import * as ROUTES from '../../constants/routes';
import history from "../../history";

const SignInPage = () => (
    <div className="column" style={{padding: '0px 15px'}}>
        <br/>
        <div className="content aligned center" style={{textAlign: 'center'}}>
            <h3 className="ui teal image header">
                GA App
            </h3>
        </div>
        <br/>
        <br/>
        <SignInForm />
        <br/>
        <br/>
        <div className="content aligned center" style={{textAlign: 'center', marginBottom: '15px'}}>
            <SignUpLink />
            <PasswordForgetLink />
        </div>
    </div>
);

const INITIAL_STATE = {
    email: '',
    password: '',
    error: '',
};

class SignInFormBase extends React.Component{
    constructor(props){
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = (event) => {
        const { email, password } = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                history.push(ROUTES.DASHBOARD);
            })
            .catch( error => {
                this.setState({ error });
            });
        event.preventDefault();
    };

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render(){
        const { email, password, error } = this.state;
        const isInvalid = password === '' || email === '';

        return(
            <form onSubmit={(event) => this.onSubmit(event)} className="ui form" autoComplete="new-password">
                <div className="field">
                    <div className="ui left icon input">
                        <i className="envelope icon" />
                        <input type="text" name="email" placeholder="Email Address" value={email} onChange={this.onChange} />
                    </div>
                </div>
                <div className="field">
                    <div className="ui left icon input">
                        <i className="lock icon" />
                        <input type="password" name="password" placeholder="Password" value={password} onChange={this.onChange} />
                    </div>
                </div>
                <br/>
                <button className="ui large fluid blue google button" type="submit" disabled={isInvalid} >Sign In</button>
                {error && <p>{error.message}</p>}
            </form>
        );
    };
}

const SignInForm = compose(
    withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm };
