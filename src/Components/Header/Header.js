import React, { useContext, useState } from 'react';
import './Header.css'
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png'
import { minCarBtnContext, minCartContext, userContext } from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const Header = () => {
    //context API
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const [openMinCart, setOpenMinCart] = useContext(minCartContext);
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
        <div className="container pt-3 pb-5">
            <div className="row header-bar">
                <div className="logo-container col-md-6 d-flex justify-content-start">
                    <img src={logo} alt="site logo" />
                </div>
                <div className="nav-menu col-md-6 d-flex justify-content-end">
                    <Link to='/'>Home</Link>
                    <Link to='/orders'>Orders</Link>
                    <Link to='/admin'>Admin</Link>
                    {
                        loggedInUser.email ? <div><img src={loggedInUser.photo} alt="" /> <span onClick={logoutHandler} className="logout-btn">| Logout</span></div> : <Link to='/login'>
                            <button className="login-btn">Log In</button>
                        </Link>
                    }
                    <div className="mini-cart">
                        <button className="btn" onClick={() => { setOpenMinCart(!openMinCart) }}>
                            <FontAwesomeIcon icon={faCoffee} /> View Cart : {minCartBtnCount}
                        </button>
                    </div>
                </div>
            </div>

            {/* <div className="floating-cart" style={{ display: `${showMinCart ? 'block' : 'none'}` }}>

            </div> */}
        </div>
    );
};

export default Header;