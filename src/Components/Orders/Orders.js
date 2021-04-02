import React from 'react';
import OrderListItem from '../OrderListItem/OrderListItem';

const Orders = () => {
    return (
        <div className="container">
            <h2>Checkout</h2>
            <div className=" container orders">
                <div className="row">
                    <div className="col-md-4"><h5>Name</h5></div>
                    <div className="col-md-4"><h5>Quantity</h5></div>
                    <div className="col-md-4"><h5>Price</h5></div>
                </div>
                <div className="row">
                    <OrderListItem></OrderListItem>
                </div>
            </div>
        </div>
    );
};

export default Orders;