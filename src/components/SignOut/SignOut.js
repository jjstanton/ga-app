import React from 'react';

import { Link } from 'react-router-dom';

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

class SignOutButton extends React.Component{
    onSignOut = () => {
        this.props.firebase.doSignOut();
    };

    render(){
        return(
            <Link to={ROUTES.LANDING} className="item bold" onClick={this.onSignOut} >
                <i className="sign-out icon" />
                Sign Out
            </Link>
        );
    }
}

export default withFirebase(SignOutButton);
