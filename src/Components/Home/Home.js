import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { addToDatabaseCart, getDatabaseCart } from '../../utility/databaseManager';
import FoodBox from '../FoodBox/FoodBox';
import './Home.css'

const Home = () => {
    //Show data at home
    const [products, setProducts] = useState([])
    useEffect(() => {
        axios.get('https://apple-sundae-00069.herokuapp.com/allproduct')
            .then(res => setProducts(res.data))
    }, [])

    //Cart start

    const [cart, setCart] = useState([]);

    const incomingItem = async () => {

        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        await fetch('https://apple-sundae-00069.herokuapp.com/productsByKeys', {
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
                }
            })
    }

    useEffect(() => {

        incomingItem();

    }, [])

    //Cart End

    //Buy Now
    const productClickHandler = (product) => {
        const toBeAdded = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAdded);
        let count = 1;
        let newCart;
        const savedCart = getDatabaseCart();

        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAdded);
            newCart = [...others, sameProduct];

        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);

    }
    return (
        <div className="container food-items d-grid">
            {
                products.length === 0 && <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden"></span>
                </div>
            }
            {
                products.map(product => <FoodBox key={product._id} eachProduct={product} clickHandler={productClickHandler}></FoodBox>)
            }
        </div>
    );
};

export default Home;