import React from 'react';
import { AuthUserContext, withAuthorisation } from '../Session/index'
import { withFirebase } from "../Firebase";
import { Segment, Loader, Dimmer } from 'semantic-ui-react';

class Admin extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            loading: false,
            users: [],
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        this.props.firebase.db.collection("users").get()
        .then( (usersObj) => {
            usersObj.forEach( user => (
                this.setState( {
                    users: [
                        ...this.state.users, {
                        uid: user.data().uid,
                        username: user.data().username,
                        email: user.data().email,
                    }]
                })
            ));
            this.setState({
                loading: false,
            });
        });
    }

    render(){
        const { users, loading } = this.state;
        return (
            <AuthUserContext.Consumer>
                {authUser => (
                    <React.Fragment>
                        <h3 className='ui top attached header'>Admin</h3>
                        <Segment className="ui attached">
                            <Dimmer inverted active={loading}>
                                <Loader inverted content='Loading' />
                            </Dimmer>
                            { loading && <div>Loading...</div> }
                            <UserList users={users} />
                        </Segment>
                    </React.Fragment>
                )}
            </AuthUserContext.Consumer>
        );
    }
}

const UserList = ({ users }) => (
    <div className="ui divided link items">
        {users.map(user => (
            <div className="item" key={user.uid}>
                <div className="content">
                    <div className="header">{user.username}</div>
                    <div className="description">
                        <p>UID: {user.uid}</p>
                        <p>Email: {user.email}</p>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

const condition = authUser => !!authUser;

export default withAuthorisation(condition)(withFirebase(Admin));