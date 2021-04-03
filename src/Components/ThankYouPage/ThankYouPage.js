
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';

const ThankYouPage = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    return (
        <div className="container">
            <h2>Order Received</h2>
            <h3 style={{color: 'forestgreen'}}>Thank you, {loggedInUser.name}</h3>
            <Link to="/">Back To Home</Link>

        </div>
    );
};

export default ThankYouPage;