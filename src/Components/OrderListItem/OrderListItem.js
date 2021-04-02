import React from 'react';

const OrderListItem = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4"><h5>Name</h5></div>
                <div className="col-md-4"><h5>1</h5></div>
                <div className="col-md-4"><h5>$344</h5></div>
            </div>
            <div className="row">
                <div className="col-md-4"><h5>Total</h5></div>
                <div className="col-md-4"></div>
                <div className="col-md-4"><h5>$53434</h5></div>
            </div>
        </div>
    );
};

export default OrderListItem;