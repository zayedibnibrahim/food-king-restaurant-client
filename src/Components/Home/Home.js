import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { minCartContext, minCarBtnContext } from '../../App';
import { addToDatabaseCart, getDatabaseCart, removeFromDatabaseCart } from '../../utility/databaseManager';
import FoodBox from '../FoodBox/FoodBox';
import './Home.css';

const Home = () => {

    const [openMinCart, setOpenMinCart] = useContext(minCartContext);
    const [minCartBtnCount, setMinCartBtnCount] = useContext(minCarBtnContext);

    //Show data at home
    const [products, setProducts] = useState([])
    useEffect(() => {
        axios.get('https://apple-sundae-00069.herokuapp.com/allproduct')
            .then(res => setProducts(res.data))
    }, [])


    //LocalStorage start

    const [cart, setCart] = useState([]);
    console.log(cart)
    setMinCartBtnCount(cart.length)
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        fetch('https://apple-sundae-00069.herokuapp.com/productsByKeys', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productKeys)
        })
            .then(res => res.json())
            .then(data => {
                if (data.length > 0) {
                    const previousCart = productKeys.map(pdKey => {
                        let getProduct = data.find(pd => pd.key === pdKey)

                        getProduct.quantity = savedCart[pdKey];
                        return getProduct;
                    })
                    setCart(previousCart)
                    setMinCartBtnCount(previousCart.length)
                }
            })

    }, [])

    //LocalStorage End

    //Total Count
    let total = 0;
    if (cart.length > 0) {
        for (let i = 0; i < cart.length; i++) {
            const fProduct = cart[i];

            total = total + fProduct.price * fProduct.quantity || 1;
        }
    }


    //Add To Cart
    const onAdd = (product) => {
        const toBeAdded = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAdded);
        let count = 1;
        // let newCart;

        if (sameProduct) {
            // count = sameProduct.quantity + 1;
            // sameProduct.quantity = count;
            // newCart = [...cart, sameProduct];
            // setCart(newCart);
            setCart(
                cart.map(pd => pd.key === toBeAdded ? { ...sameProduct, quantity: sameProduct.quantity + 1 } : pd)
            )
            count = sameProduct.quantity + 1;
            addToDatabaseCart(toBeAdded, count)
        }
        else {
            // product.quantity = 1;
            // newCart = [...cart, product];
            // setCart(newCart);
            setCart(
                [...cart, { ...product, quantity: 1 }]
            )
            addToDatabaseCart(toBeAdded, count);
        }
    }
    //Remove FroM Cart
    const onRemove = (product) => {
        const sameProduct = cart.find(pd => pd.key === product.key);
        if (sameProduct.quantity === 1) {
            setCart(cart.filter(pd => pd.key !== product.key));
            removeFromDatabaseCart(product.key)
        } else {
            setCart(
                cart.map(pd =>
                    pd.key === product.key ? { ...sameProduct, quantity: sameProduct.quantity - 1 } : pd
                )
            );
            const count = sameProduct.quantity - 1;
            addToDatabaseCart(product.key, count)
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className={`${openMinCart ? 'col-md-9' : 'col-md-12'} food-items d-grid rounded`}>
                    {
                        products.length === 0 && <div className="spinner-border text-warning" role="status">
                            <span className="visually-hidden"></span>
                        </div>
                    }
                    {
                        products.map(product => <FoodBox key={product._id} eachProduct={product} clickHandler={onAdd}></FoodBox>)
                    }
                </div>
                <div className={`${openMinCart ? 'col-md-3' : 'd-none'}`} style={{ borderLeft: "1px solid #CECECE" }}>
                    {
                        cart.length === 0 && <p>Cart is empty</p>
                    }
                    {
                        cart.map((pd, index) =>
                            <div key={index + 1} className="rounded mb-1 cart-items">
                                <div>
                                    <p><b>{index + 1}. {pd.name}</b></p>
                                </div>
                                <div className="d-flex p-1 rounded align-items-center" style={{backgroundColor: "#c7ecee"}}>
                                    <button onClick={() => onRemove(pd)} className="btn btn-danger onRemove">-</button>
                                    <span>{pd.quantity} X {pd.price}</span>
                                    <button onClick={() => onAdd(pd)} className="btn btn-primary onAdd">+</button>
                                    <span> = {Math.round(pd.price * pd.quantity).toFixed(2)}৳</span>
                                </div>
                            </div>)
                    }
                    <div className="d-flex justify-content-between">
                        <div>
                            <p><b>Total: </b></p>
                        </div>
                        <div>
                            <p><b>{total.toFixed(2)}৳</b></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;