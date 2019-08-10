import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component{
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '770927704354-q801bh4srcbahe6kelu9ras38m4jnvd2.apps.googleusercontent.com',
                scope: 'profile'
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
                userImage: this.auth.currentUser.get().getBasicProfile().getImageUrl()
            };

            this.props.signIn(
                UserDetails.userId,
                UserDetails.userName,
                UserDetails.userImage
            );
        } else {
            this.props.signOut();
        }
    };

    onSignInClick = () => {
        this.auth.signIn({prompt: 'consent'});
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if( this.props.isSignedIn === null ){
            return (
                <button className='ui blue google button'>
                    <i className='google icon' />
                    Loading...
                </button>
            );
        } else if (this.props.isSignedIn){
            return (
                <div onClick={this.onSignOutClick} className='item'>
                    Sign Out
                </div>
            );
        } else {
            return (
                <button onClick={this.onSignInClick} className='ui blue google button'>
                    <i className='google icon' />
                    Sign In
                </button>
            );
        }
    }


    render(){
        return(
            <React.Fragment>
                { this.renderAuthButton() }
            </React.Fragment>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn,
        UserId: state.auth.userId,
        UserImage: state.auth.userImage
    }
};

export default connect (mapStateToProps, { signIn, signOut }) ( GoogleAuth );