import React, { useContext } from 'react';
import './Login.css'
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from './firebase-config'
import glBtn from '../../images/google-btn.png'
import { useHistory, useLocation } from 'react-router';
import { userContext } from '../../App';
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const googleLoginHandler = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then(result => {
                const { email, photoURL } = result.user;
                const loggedInUserData = {
                    isSignedIn: true,
                    photo: photoURL,
                    email: email
                }
                setLoggedInUser(loggedInUserData)
                history.replace(from)
            }).catch(error => {
                console.log(error)
            });
    }
    return (
        <div className="container">
            <div className="d-flex flex-column social-login-btn">
                <button className="social-btn" onClick={googleLoginHandler}><img src={glBtn} alt="" /> Continue with Google</button>
            </div>
        </div>
    );
};

export default Login;