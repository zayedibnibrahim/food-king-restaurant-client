import React from 'react';
import './FoodBox.css'
const FoodBox = (props) => {
    const { name, price, image } = props.eachProduct;
    return (
        <div className="card">
            <img src={image} className="card-img-top" alt="" />
            <div className="card-body" style={{backgroundColor: "#30336b"}}>
                <h6 className="card-title text-white">{name}</h6>
            </div>
            <div className="card-footer" style={{backgroundColor: "#30336b"}}>
                <div className="price d-flex justify-content-between align-items-center">
                    <h6 className="text-white">{price}৳</h6>
                    <button onClick={() => props.clickHandler(props.eachProduct)} className="buy-now-btn text-white">Add to cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodBox;