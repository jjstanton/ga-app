import React from 'react';
import { AuthUserContext, withAuthorisation } from '../Session'
import PasswordChange from "../PasswordChange/PasswordChange";
import DeleteAccount from "../DeleteAccount/DeleteAccount";
import {Button, Segment} from "semantic-ui-react";

const Account = () => {
    return(
        <AuthUserContext.Consumer>
            {authUser => (
                <div className="ui two column doubling stackable grid container">
                    <div className="column">
                        <h3 className='ui top attached header' >Change your password:</h3>
                        <Segment className="ui attached" >
                            <PasswordChange/>
                        </Segment>
                    </div>
                    <div className="column">
                        <h3 className='ui top attached header' >Delete your account:</h3>
                        <Segment className="ui attached" >
                            <DeleteAccount />
                        </Segment>
                    </div>
                </div>
            )}
        </AuthUserContext.Consumer>
    );
};

const condition = authUser => !!authUser;

export default withAuthorisation(condition)(Account);