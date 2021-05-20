import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './EditProduct.css'

const EditProduct = () => {

    const [products, setProducts] = useState([])

    const loadAddedProduct = async () => {
        await axios.get('https://apple-sundae-00069.herokuapp.com/allproduct')
            .then(res => setProducts(res.data))
    }
    useEffect(() => {
        loadAddedProduct();
    }, [])

    const deleteHandler = (id) => {
        axios.delete(`https://apple-sundae-00069.herokuapp.com/delete/${id}`)
            .then(res => {
                if (res.data) {
                    alert('Item Deleted Successfully')
                    loadAddedProduct()
                }
            })
    }
    return (
        <div className="container edit-product mt-5">
            <div className="row">
                <Sidebar></Sidebar>
                <div className="right-side-bar col-md-9">
                    <h3 className="mb-5"> Edit Products</h3>
                    <div className="product-list">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Weight</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products.length === 0 && <div className="spinner-border text-warning" role="status">
                                        <span className="visually-hidden"></span>
                                    </div>
                                }
                                {
                                    products.map(product => <tr key={product._id}>
                                        <td>{product.name}</td>
                                        <td>{product.weight}gm</td>
                                        <td>{product.price}৳</td>
                                        <td>
                                            <button><FontAwesomeIcon icon={faEdit} /></button>
                                            <button onClick={() => deleteHandler(product._id)}><FontAwesomeIcon icon={faTrashAlt} /></button>
                                        </td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;