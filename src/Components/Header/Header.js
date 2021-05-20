import React, { useContext, useState } from 'react';
import './Header.css'
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png'
import { minCarBtnContext, userContext } from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const Header = () => {
    //context API
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const [minCartBtnCount, setMinCartBtnCount] = useContext(minCarBtnContext);

    // Log Out
    const logoutHandler = () => {
        firebase.auth().signOut()
            .then(() => {
                setLoggedInUser({});
            }).catch((error) => {
                console.log(error)
            });
    }

    return (
        <div className="container">
            <div className="row header-bar pt-3">
                <div className="logo-container col-md-3 d-flex justify-content-start">
                    <img src={logo} alt="site logo" />
                </div>
                <div className="nav-menu col-md-9 d-flex justify-content-end">
                    <Link to='/'>Home</Link>
                    <Link to='/orders'>Orders</Link>
                    <Link to='/dashboard'>Dashboard</Link>
                    {
                        loggedInUser.email ? <div><img src={loggedInUser.photo} alt="" /> <span onClick={logoutHandler} className="logout-btn">| Logout</span></div> : <Link to='/login'>
                            <button className="login-btn">Log In</button>
                        </Link>
                    }
                    <div className="mini-cart">
                        <button className="btn">
                            <FontAwesomeIcon icon={faCoffee} /> View Cart : {minCartBtnCount}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;