import React, { useContext } from 'react';
import './Header.css'
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png'
import { userContext } from '../../App';
const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const logoutHandler = () => {
        setLoggedInUser({});
    }
    return (
        <div className="container pt-3 pb-5">
            <div className="row">
                <div className="logo-container col-md-6 d-flex justify-content-start">
                    <img src={logo} alt="site logo" />
                </div>
                <div className="nav-menu col-md-6 d-flex justify-content-end">
                    <Link to='/'>Home</Link>
                    <Link to='/orders'>Orders</Link>
                    <Link to='/admin'>Admin</Link>
                    {
                        loggedInUser.email ? <div><img src={loggedInUser.photo} alt=""/> <span onClick={logoutHandler} className="logout-btn">| Logout</span></div> : <Link to='/login'>
                            <button>Log In</button>
                        </Link>
                    }

                </div>
            </div>
        </div>
    );
};

export default Header;