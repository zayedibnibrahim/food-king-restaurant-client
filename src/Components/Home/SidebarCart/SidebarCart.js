import React from 'react';

const SidebarCart = ({cart, total, onAdd, onRemove, handleOrder}) => {
    return (
        <div>
            {
                cart.length === 0 && <p>Cart is empty</p>
            }
            {
                cart.map((pd, index) =>
                    <div key={index + 1} className="rounded mb-1 cart-items">
                        <div>
                            <p><b>{index + 1}. {pd.name}</b></p>
                        </div>
                        <div className="d-flex p-1 rounded align-items-center" style={{ backgroundColor: "#D1D8ED" }}>
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
            {
                cart.length > 0 && <div>
                    <button onClick={handleOrder} className="btn btn-primary float-end">Order Now</button>
                </div>
            }
        </div>
    );
};

export default SidebarCart;