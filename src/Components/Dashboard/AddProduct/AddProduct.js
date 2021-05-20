import './AddProduct.css'
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';

const AddProduct = () => {
    const [categoryList, setCategoryList] = useState([])
    const [imageUrl, setImageUrl] = useState(null);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const onSubmit = data => {
        const toBeAddedProductData = {
            name: data.name,
            price: data.price,
            weight: data.weight,
            image: imageUrl,
            categoryId: data.category
        }
        axios.post('https://apple-sundae-00069.herokuapp.com/addproductdb', toBeAddedProductData)
            .then(result => {
                if (result.data) {
                    alert('Product Added Successfully.')
                    reset()
                }
            })
    };

    //image handler

    const uploadImageHandler = e => {
        const imageData = new FormData();
        imageData.set('key', '41e7c876286549d302ce964e69418b3a');
        imageData.append('image', e.target.files[0]);
        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(result => {
                setImageUrl(result.data.data.display_url)
            })
    }
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
    return (
        <div className="container add-product mt-5">
            <div className="row">
                <Sidebar></Sidebar>
                <div className="right-side-bar col-md-9">
                    <h3 className="mb-5"> Add Product</h3>
                    <div className="product-form">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row">
                                <div className="col-md-6">
                                    <input className="form-control" type="text" {...register("name", { required: true })} placeholder="Product Name" />
                                    {errors.name && <span>This field is required</span>}
                                </div>
                                <div className="col-md-6">
                                    <input className="form-control" type="number" {...register("weight", { required: true })} placeholder="Weight(gm)" />
                                    {errors.weight && <span>This field is required</span>}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <input className="form-control" type="number" {...register("price", { required: true })} placeholder="Price(৳)" />
                                    {errors.price && <span>This field is required</span>}
                                </div>
                                <div className="col-md-6">
                                    <input className="form-control" type="file" {...register("image", { required: true })} onChange={uploadImageHandler} />
                                    {errors.image && <span>This field is required</span>}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <select {...register("category", { required: true })}>
                                        {
                                            categoryList.map(ctl => <option value={ctl._id}>{ctl.category}</option>)
                                        }
                                    </select>
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

export default AddProduct;