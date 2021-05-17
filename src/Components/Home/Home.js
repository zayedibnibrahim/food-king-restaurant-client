import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { minCarBtnContext } from '../../App';
import { addToDatabaseCart, getDatabaseCart, removeFromDatabaseCart } from '../../utility/databaseManager';
import FoodBox from '../FoodBox/FoodBox';
import './Home.css';
import SidebarCart from './SidebarCart/SidebarCart';

const Home = () => {
    const [minCartBtnCount, setMinCartBtnCount] = useContext(minCarBtnContext);

    //Show data at home
    const [products, setProducts] = useState([])
    useEffect(() => {
        axios.get('https://apple-sundae-00069.herokuapp.com/allproduct')
            .then(res => setProducts(res.data))
    }, [])

    //LocalStorage start

    const [cart, setCart] = useState([]);
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
    //Handle Order
    const history = useHistory()
    const handleOrder = () => {
        history.push('/orders')
    }
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
                <div className="category col-md-3">
                    <h5 className="text-dark">Category</h5>
                </div>
                <div className="col-md-6 food-items d-flex flex-column rounded">
                    {
                        products.length === 0 && <div className="spinner-border text-warning" role="status">
                            <span className="visually-hidden"></span>
                        </div>
                    }
                    {
                        products.map(
                            product => <FoodBox
                                key={product._id}
                                eachProduct={product}
                                clickHandler={onAdd} />
                        )
                    }
                </div>
                <div className='col-md-3' style={{ borderLeft: "1px solid #CECECE" }}>
                    <SidebarCart
                        cart={cart}
                        total={total}
                        onRemove={onRemove}
                        onAdd={onAdd}
                        handleOrder={handleOrder} />
                </div>
            </div>
        </div>
    );
};

export default Home;