import React from 'react';
import './FoodBox.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons'
const FoodBox = (props) => {
    const { name, price, image } = props.eachProduct;
    return (
        <div className="row food-item-row d-flex flex-row pb-2 pt-2" style={{borderBottom: "1px solid #000"}}>
            <div className="col-md-2 item-image">
                <img src={image} className="" alt="" />
            </div>
            <div className="col-md-6 item-body">
                <h6 className="item-name">{name}</h6>
                <p style={{marginBottom: "0px"}}>Ingredients: Bla Bla, Bla, Bla bla </p>
            </div>
            <div className="col-md-2 item-price">
                <h6 className="">{price}৳</h6>
            </div>
            <div className="col-md-2 add-to-cart">
                <button onClick={() => props.clickHandler(props.eachProduct)} className="add-to-cart-btn"><FontAwesomeIcon icon={faPlusSquare} /></button>
            </div>
        </div>
    );
};

export default FoodBox;