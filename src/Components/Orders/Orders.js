import React, { useEffect, useState } from 'react';
import { getDatabaseCart } from '../../utility/databaseManager';
import './Orders.css'
import { useHistory } from 'react-router';
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
                const cartProducts = productKeys.map(key => {
                    const product = data.find(pd => pd.key === key);
                    product.quantity = savedCart[key];
                    return product;
                });
                setOrder(cartProducts);
            })
    }, [])
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
                            orders.map(order => <tr key={order.key}>
                                <td>{order.name}</td>
                                <td>{order.quantity}</td>
                                <td>{Math.round(order.price * order.quantity).toFixed(2)}৳</td>
                            </tr>)
                        }
                    </tbody>
                    <tfoot>
                        <tr style={{borderTop : '2px solid #000'}}>
                            <th>Total Price :</th>
                            <td></td>

                            <th>
                                {total}৳
                            </th>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div>
                <button onClick={handleProceed} className="btn btn-primary float-end">Proceed Checkout</button>
            </div>
        </div>
    );
};

export default Orders;