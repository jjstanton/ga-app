import app from "firebase/app";
import "firebase/auth";
import 'firebase/database';
import 'firebase/firestore';

const config = {
    apiKey:"",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
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
