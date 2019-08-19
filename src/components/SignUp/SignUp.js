import React from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from "../Firebase";
import * as ROUTES from '../../constants/routes';
import history from "../../history";

const SignUpPage = () => {
    return(
        <div className="column" style={{padding: '0px 15px'}}>
            <h2 className="ui center aligned icon header" style={{marginTop: '20px'}}>
                <i className="user icon font20" style={{display: 'inline-block'}} />
                <p  style={{display: 'inline-block'}} >Create a new account</p>
            </h2>
            <br/>
            <SignUpForm />
            <br/>
            <br/>
        </div>
    );
};

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null
};

class SignUpFormBase extends React.Component{
    constructor(props){
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = (event) => {
        const { username, email, passwordOne } = this.state;

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                // Create a user in your Firebase realtime database
                return this.props.firebase.db.collection("users")
                    .add({
                        uid: authUser.user.uid,
                        username: username,
                        email: email,
                    });
            })
            .then( authUser => {
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
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error
        } = this.state;

        const isValid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        return(
            <form onSubmit={(event) => this.onSubmit(event)} className="ui form" autoComplete="new-password">

                <div className="field">
                    <div className="ui left icon input">
                        <i className="user icon" />
                        <input type="text" name="username" placeholder="Username" value={username} onChange={this.onChange} />
                    </div>
                </div>
                <div className="field">
                    <div className="ui left icon input">
                        <i className="envelope icon" />
                        <input type="text" name="email" placeholder="Email Address" value={email} onChange={this.onChange} />
                    </div>
                </div>
                <div className="field">
                    <div className="ui left icon input">
                        <i className="unlock icon" />
                        <input type="password" name="passwordOne" placeholder="Password" value={passwordOne} onChange={this.onChange} />
                    </div>
                </div>
                <div className="field">
                    <div className="ui left icon input">
                        <i className="unlock alternate icon" />
                        <input type="password" name="passwordTwo" placeholder="Confirm Password" value={passwordTwo} onChange={this.onChange} />
                    </div>
                </div>

                <button className="ui large fluid blue google button" type="submit" disabled={isValid} >Sign Up</button>

                {error && <p>{error.message}</p>}

            </form>
        );
    }
}

const SignUpLink = () => {
    return(
        <p>
            Don't have an account yet? <Link to={ROUTES.SIGN_UP} > SignUp</Link>
        </p>
    );
};

const SignUpForm = compose(
    withFirebase,
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink}