import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { useForm } from "react-hook-form";
import axios from 'axios';
const AddCategory = () => {
    const [categoryList, setCategoryList] = useState([])
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const onSubmit = data => {
        axios.post('http://localhost:4200/category', data)
            .then(result => {
                if (result.data.res) {
                    reset()
                    loadCategory()
                }
            })
    };

    //Load Category
    const loadCategory = () => {
        axios.get('http://localhost:4200/category')
            .then(result => {
                setCategoryList(result.data.res)
            })
    }
    useEffect(() => {
        loadCategory()
    }, [])
    return (
        <div className="container edit-product mt-5">
            <div className="row">
                <Sidebar></Sidebar>

                <div className="right-side-bar col-md-9">
                    <h3 className="mb-5"> Add Category</h3>
                    <div className="product-form">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input className="form-control" {...register("category", { required: true })} placeholder="Category name" />
                            {errors.category && <span>This field is required</span>}
                            <input type="submit" />
                        </form>
                    </div>
                    <div className="row">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">No:</th>
                                    <th scope="col">Category Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    categoryList.map((ct, index) => <tr key={ct._id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{ct.category}</td>
                                    </tr>
                                    )
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCategory;