import React from 'react';
import { withFirebase } from "../Firebase";
import { Dimmer, Header, Loader, Modal } from "semantic-ui-react";

class DeleteAccount extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            usernameForm: '',
            user: {},
            error: null,
            loading: null,
            reAuthUser: null,
            emailReauth: '',
            passwordReauth: '',
            modalOpen: false,
            modalError: null
        };
    };

    componentDidMount() {
        this.setState({ loading: true });

        const userUid = this.props.firebase.auth.currentUser.uid;

        this.props.firebase.db.collection("users").get()
            .then( (usersObj) => {

                usersObj.forEach( user => (
                    user.data().uid === userUid ?

                    this.setState( {
                        user: {
                            uid: user.data().uid,
                            usernameFS: user.data().username,
                            email: user.data().email,
                        }
                    })
                : null
                ));

                this.setState({ loading: false });
            });
    }

    componentDidUpdate() {
        console.log(this.state.modalOpen);
    }

    openModal = () =>{
        this.setState({ modalOpen: true });
    };

    onSubmit = (event) =>{
        const user = this.props.firebase.auth.currentUser;
        user.delete().then(() => {
            alert('GOODBYE!');
            // User deleted.
        }).catch( (error) => {
            this.setState({ error });

             if (error.code === "auth/requires-recent-login"){
                this.setState({ reAuthUser: true });
             } else {
                return null;
             }

        });
        event.preventDefault();
    };

    onChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    onSubmitReauth = (event) =>{
        const { passwordReauth, modalError } = this.state;
        const emailReAuth = this.props.firebase.auth.currentUser.email;
        const credentials = this.props.firebase.doEmailAuthProviderCredentials( emailReAuth, passwordReauth );
        this.props.firebase.doReauthenticateWithCredential(credentials)
        .then(() => {
            this.setState({ modalOpen: false });
            this.setState({ reAuthUser: false });
        }).catch((error) => {
            this.setState( { modalError });
        });

        event.preventDefault();
        event.stopPropagation();
    };

    onChangeReauth = (event) =>{
        this.setState({ [event.target.name]: event.target.value });
    };



    render(){
        const { usernameForm, error, loading, reAuthUser, emailReauth, passwordReauth, modalError, modalOpen } = this.state;
        const { usernameFS } = this.state.user;
        const isInvalid = usernameForm !== usernameFS || usernameForm === '';
        const ReauthisInvalid = emailReauth === '' || passwordReauth === '';

        return(
            <div>

                <Dimmer inverted active={loading}>
                    <Loader inverted content='Loading' />
                </Dimmer>

                <div className="ui info tiny message">
                    <div className="header">
                        To confirm deletion, please type in your username
                    </div>
                </div>

                <form onSubmit={this.onSubmit} className="ui form" autoComplete="new-password">
                    <div className="field">
                        <div className="ui left icon input">
                            <i className="user icon" />
                            <input name="usernameForm" value={this.state.usernameForm} onChange={this.onChange} type="text" placeholder="Username" />
                        </div>
                    </div>
                    {!reAuthUser ?
                        <button type="submit" disabled={isInvalid} className="ui large fluid red google button">
                            Delete Account
                        </button>
                    :
                        <Modal size="tiny" open={modalOpen} trigger={ <button type="button" onClick={this.openModal} className='ui large fluid blue google button'>Reauthenticate Account</button>} centered={false}>
                            <Modal.Header>Reauthenticate Account</Modal.Header>
                            <Modal.Content>
                                <Modal.Description>

                                    <form onSubmit={(event) => this.onSubmitReauth(event)} className="ui form" autoComplete="new-password">
                                        <div className="field">
                                            <div className="ui left icon input">
                                                <i className="envelope icon" />
                                                <input type="text" name="emailReauth" autoComplete="off" placeholder="Email Address" value={emailReauth} onChange={this.onChangeReauth} />
                                            </div>
                                        </div>
                                        <div className="field">
                                            <div className="ui left icon input">
                                                <i className="lock icon" />
                                                <input type="password" name="passwordReauth" autoComplete="off" placeholder="Password" value={passwordReauth} onChange={this.onChangeReauth} />
                                            </div>
                                        </div>
                                        <br/>
                                        <button className="ui large fluid blue google button" type="submit" disabled={ReauthisInvalid} >Reauthenticate</button>
                                        { modalError && <p>{modalError.message}</p>}
                                    </form>

                                </Modal.Description>
                            </Modal.Content>
                        </Modal>
                    }

                    {error && <p>{error.message}</p>}
                </form>

            </div>
        );
    };
}

export default withFirebase(DeleteAccount);