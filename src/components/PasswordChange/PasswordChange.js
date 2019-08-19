import React from 'react';

import { withFirebase } from "../Firebase";

const INTIAL_STATE = {
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class PasswordChangeForm extends React.Component{
    constructor(props){
        super(props);
      this.state = { ...INTIAL_STATE };
    };
    onSubmit = (event) => {
        const { passwordOne } = this.state;

        this.props.firebase
            .doPasswordUpdate(passwordOne)
            .then(() => {
                this.setState({ ...INTIAL_STATE })
            })
            .catch((error) => {
                this.setState({ error })
            });
        event.preventDefault();
    };

    onChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        const { passwordOne, passwordTwo, error } = this.state;
        const isInvalid = passwordOne !== passwordTwo || passwordOne === '';

        return(
            <form onSubmit={this.onSubmit} className="ui form" autoComplete="new-password">
                <div className="field">
                    <div className="ui left icon input">
                        <i className="lock icon" />
                        <input name="passwordOne" value={this.state.passwordOne} onChange={this.onChange} type="password" placeholder="New Password" />
                    </div>
                </div>
                <div className="field">
                    <div className="ui left icon input">
                        <i className="lock icon" />
                        <input name="passwordTwo" value={this.state.passwordTwo} onChange={this.onChange} type="password" placeholder="New Password" />
                    </div>
                </div>
                <button type="submit" disabled={isInvalid} className="ui large fluid blue google button">
                    Change Password
                </button>

                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

export default withFirebase(PasswordChangeForm);