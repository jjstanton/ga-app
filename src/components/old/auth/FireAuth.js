import React from 'react';
import { connect } from 'react-redux';

import { signInGoogle } from "../actions";

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

class FireAuth extends React.Component{

    componentDidMount() {
        const firebaseConfig = {
            apiKey: "AIzaSyCVshTltQqFRxm659zbmh2hGgJB0ZhlNE4",
            authDomain: "ga-app-afa31.firebaseapp.com",
            databaseURL: "https://ga-app-afa31.firebaseio.com",
            projectId: "ga-app-afa31",
            storageBucket: "",
            messagingSenderId: "267911515460",
            appId: "1:267911515460:web:a4bc8ac1fc4fbe94"
        };

        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
    }

    onFBGoogleClick = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
        });
    };

    render() {
        return (
            <button onClick={this.onFBGoogleClick} className='ui large fluid blue google button'>
                <i className='google icon' />
                FireBase Google Login
            </button>
        )
    };
}

const mapStateToProps = (state) =>{
    return{
        GoogledIn: state.AuthGoogle.GoogledIn
    };
};

export default connect (mapStateToProps, { signInGoogle })(FireAuth);
