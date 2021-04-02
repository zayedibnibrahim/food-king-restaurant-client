import { Link } from 'react-router-dom';
import './Admin.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faPlus, faAlignRight } from '@fortawesome/free-solid-svg-icons'
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useState } from 'react';
const Admin = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        const toBeAddedProductData = {
            name: data.name,
            price: data.price,
            weight: data.weight,
            image: imageUrl
        }
        axios.post('http://localhost:42000/addproductdb', toBeAddedProductData)
        .then(result => {
            if(result){
                
                alert('Product Added Successfully.')
            }
        })
    };

    //image handler
    
    const uploadImageHandler = e => {
        console.log(e.target.files[0])
        const imageData = new FormData();
        imageData.set('key', '41e7c876286549d302ce964e69418b3a');
        imageData.append('image', e.target.files[0]);
        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(result => {
                setImageUrl(result.data.data.display_url)
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
                    <h3 className="mb-5"> Add Product</h3>
                    <div className="product-form">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row">
                                <div className="col-md-6">
                                    <input type="text" {...register("name", { required: true })} placeholder="Product Name" />
                                    {errors.exampleRequired && <span>This field is required</span>}
                                </div>
                                <div className="col-md-6">
                                    <input type="number" {...register("weight", { required: true })} placeholder="Weight" />
                                    {errors.exampleRequired && <span>This field is required</span>}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <input type="number" {...register("price", { required: true })} placeholder="Price" />
                                    {errors.exampleRequired && <span>This field is required</span>}
                                </div>
                                <div className="col-md-6">
                                    <input type="file" {...register("image", { required: true })} onChange={uploadImageHandler} />
                                    {errors.exampleRequired && <span>This field is required</span>}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">

                                </div>
                                <div className="col-md-6">
                                    <input type="submit" value="Submit" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;