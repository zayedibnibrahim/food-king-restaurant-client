import React from 'react';
import './FoodBox.css'
const FoodBox = (props) => {
    const { name, price, image } = props.eachProduct;
    return (
        <div className="card">
            <img src={image} className="card-img-top" alt="" />
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
            </div>
            <div className="card-footer">
                <div className="price d-flex justify-content-between align-items-center">
                    <h5>${price}</h5>
                    <button onClick={() => props.clickHandler(props.eachProduct)} className="buy-now-btn">Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default FoodBox;