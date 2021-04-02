import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FoodBox from '../FoodBox/FoodBox';
import './Home.css'

const Home = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        axios.get('http://localhost:42000/allproduct')
        .then(res => setProducts(res.data))
    }, [])
    return (
        <div className="container food-items d-grid">
            {
                products.map(product => <FoodBox eachProduct={product}></FoodBox>)
            }
        </div>
    );
};

export default Home;