import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { minCarBtnContext } from '../../App';
import { addToDatabaseCart, getDatabaseCart, removeFromDatabaseCart } from '../../utility/databaseManager';
import FoodBox from '../FoodBox/FoodBox';
import './Home.css';
import SidebarCart from './SidebarCart/SidebarCart';

const Home = () => {

    const [takeCategoryId, setTakeCategoryId] = useState('60a59b4c2ab1ca1e007d8dcb')
    const [minCartBtnCount, setMinCartBtnCount] = useContext(minCarBtnContext);
    const [products, setProducts] = useState([])
    const [categoryList, setCategoryList] = useState([])

    //Show data at home
    // useEffect(() => {
    //     axios.get('https://apple-sundae-00069.herokuapp.com/allproduct')
    //         .then(res => setProducts(res.data))
    // }, [])

    //LocalStorage start
    const [cart, setCart] = useState([]);
    setMinCartBtnCount(cart.length)

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        axios.post('https://apple-sundae-00069.herokuapp.com/productsByKeys', productKeys)
            .then(res => {
                if (res.data.length > 0) {
                    const previousCart = productKeys.map(pdKey => {
                        let getProduct = res.data.find(pd => pd._id === pdKey)

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
        const toBeAdded = product._id;
        const sameProduct = cart.find(pd => pd._id === toBeAdded);
        let count = 1;
        // let newCart;

        if (sameProduct) {
            // count = sameProduct.quantity + 1;
            // sameProduct.quantity = count;
            // newCart = [...cart, sameProduct];
            // setCart(newCart);
            setCart(
                cart.map(pd => pd._id === toBeAdded ? { ...sameProduct, quantity: sameProduct.quantity + 1 } : pd)
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
        const sameProduct = cart.find(pd => pd._id === product._id);
        if (sameProduct.quantity === 1) {
            setCart(cart.filter(pd => pd._id !== product._id));
            removeFromDatabaseCart(product._id)
        } else {
            setCart(
                cart.map(pd =>
                    pd._id === product._id ? { ...sameProduct, quantity: sameProduct.quantity - 1 } : pd
                )
            );
            const count = sameProduct.quantity - 1;
            addToDatabaseCart(product._id, count)
        }
    };
    //Load Category
    const loadCategory = async () => {
        await axios.get('https://apple-sundae-00069.herokuapp.com/allCategory')
            .then(res => {
                setCategoryList(res.data)
            })
    }
    useEffect(() => {
        loadCategory()
    }, [])
    //handle category button
    const handleCategoryBtn = (id) => {
        setTakeCategoryId(id)
    }
    //get product by category
    useEffect(() => {
        axios.post('https://apple-sundae-00069.herokuapp.com/productByCategory', {catId : takeCategoryId})
            .then(res => {
                setProducts(res.data)
            })
    }, [takeCategoryId])
    return (
        <div className="container pt-5">
            <div className="row">
                <div className="category col-md-3">
                    <h5 className="text-dark">Category</h5>
                    <div className="category-list d-flex flex-column justify-content-around">
                        {
                            categoryList.map(ctl => <button key={ctl._id} onClick={() => handleCategoryBtn(ctl._id)} className="btn mb-2" style={{ backgroundColor: "#D1D8ED" }}>{ctl.category}</button>)
                        }

                    </div>
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