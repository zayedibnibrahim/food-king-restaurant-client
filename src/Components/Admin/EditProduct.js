import { faAlignRight, faEdit, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './EditProduct.css'

const EditProduct = () => {

    const [products, setProducts] = useState([])
    useEffect(() => {
        axios.get('https://apple-sundae-00069.herokuapp.com/allproduct')
            .then(res => setProducts(res.data))
    }, [])

    const deleteHandler = (key) => {
        axios.delete(`https://apple-sundae-00069.herokuapp.com/delete/${key}`)
            .then(res => {
                if (res) {
                    alert('Item Deleted Successfully')
                }
            })
    }
    return (
        <div className="container add-product">
            <div className="row">
                <div className="left-side-bar col-md-3">
                    <div className="sidebar-nav">
                        <h3 className="mb-5"><FontAwesomeIcon icon={faAlignRight} /> Manage Product</h3>
                        <Link to="/admin">
                            <h5><FontAwesomeIcon icon={faPlus} /> Add Product</h5>
                        </Link>
                        <br />
                        <Link to="/editProduct">
                            <h5><FontAwesomeIcon icon={faEdit} /> Edit Product</h5>
                        </Link>
                    </div>
                </div>
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
                                            <button onClick={() => deleteHandler(product.key)}><FontAwesomeIcon icon={faTrashAlt} /></button>
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