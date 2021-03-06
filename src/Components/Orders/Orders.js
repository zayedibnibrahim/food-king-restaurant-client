import React, { useEffect, useState } from 'react';
import { getDatabaseCart } from '../../utility/databaseManager';
import './Orders.css'
import { useHistory } from 'react-router';
import axios from 'axios';
const Orders = () => {

    //Handle Proceed
    const history = useHistory()
    const handleProceed = () => {
        history.push('/shipment')
    }
    const [orders, setOrder] = useState([]);

    //Total Count
    let total = 0;
    for (let i = 0; i < orders.length; i++) {
        const fProduct = orders[i];

        total = total + fProduct.price * fProduct.quantity || 1;
    }
    
    //from local storage
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        axios.post('http://localhost:4200/product/idbundle', productKeys)
            .then(result => {
                if (result.data.res.length > 0) {
                    const previousCart = productKeys.map(pdKey => {
                        let getProduct = result.data.res.find(pd => pd._id === pdKey)

                        getProduct.quantity = savedCart[pdKey];
                        return getProduct;
                    })
                    setOrder(previousCart)
                    
                }
            })

    }, [])

    //from local storage
    return (
        <div className="container">
            <h2>Checkout</h2>
            <div className="container orders">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.length === 0 && <div>
                                <span><p><b>Cart is empty</b></p></span>
                            </div>
                        }
                        {
                            orders.map(order => <tr key={order._id}>
                                <td>{order.name}</td>
                                <td>{order.quantity}</td>
                                <td>{Math.round(order.price * order.quantity).toFixed(2)}???</td>
                            </tr>)
                        }
                    </tbody>
                    <tfoot>
                        <tr style={{ borderTop: '2px solid #000' }}>
                            <th>Total Price :</th>
                            <td></td>

                            <th>
                                {total}???
                            </th>
                        </tr>
                    </tfoot>
                </table>
            </div>
            {
                orders.length > 0  && <div>
                <button onClick={handleProceed} className="btn btn-primary float-end">Proceed Checkout</button>
            </div>
            }
            
        </div>
    );
};

export default Orders;