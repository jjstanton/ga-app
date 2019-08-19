import app from "firebase/app";
import "firebase/auth";
import 'firebase/database';
import 'firebase/firestore';

const config = {
    apiKey:"",
    authDomain: "ga-app-afa31.firebaseapp.com",
    databaseURL: "https://ga-app-afa31.firebaseio.com",
    projectId: "ga-app-afa31",
    storageBucket: "",
    messagingSenderId: "267911515460",
    appId: "1:267911515460:web:a4bc8ac1fc4fbe94"
};

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.firestore();

        this.emailAuthProvider = app.auth.EmailAuthProvider;
    }

    // *** Auth API ***

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () =>
        this.auth.signOut();

    doPasswordReset = (email) =>
        this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = (password) =>
        this.auth.currentUser.updatePassword(password);

    doEmailAuthProviderCredentials = (email, password) =>
        this.emailAuthProvider.credential(email, password);

    doReauthenticateWithCredential = (credential) =>
        this.auth.currentUser.reauthenticateWithCredential(credential);


    // *** User API ***

    // user = uid => this.db.ref(`users/${uid}`);
    //
    // users = () => this.db.ref('users');

}






export default Firebase;
