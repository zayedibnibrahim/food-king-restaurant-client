import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FoodBox from '../FoodBox/FoodBox';
import './Home.css'

const Home = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        axios.get('https://apple-sundae-00069.herokuapp.com/allproduct')
            .then(res => setProducts(res.data))
    }, [])
    return (
        <div className="container food-items d-grid">
            {
                products.length === 0 && <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden"></span>
                </div>
            }
            {
                products.map(product => <FoodBox eachProduct={product}></FoodBox>)
            }
        </div>
    );
};

export default Home;