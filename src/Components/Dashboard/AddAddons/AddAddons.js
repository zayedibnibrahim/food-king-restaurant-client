import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { useForm } from "react-hook-form";
import axios from 'axios';
const AddAddons = () => {
    const [addonList, setAddonList] = useState([])
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const onSubmit = data => {
        axios.post('http://localhost:4200/addon', data)
            .then(result => {
                if (result.data.res) {
                    reset()
                    loadAddon()
                }
            })
    };

    //Load Addons
    const loadAddon = () => {
        axios.get('http://localhost:4200/addon')
            .then(result => {
                setAddonList(result.data.res)
            })
    }
    useEffect(() => {
        loadAddon()
    }, [])
    return (
        <div className="container edit-product mt-5">
            <div className="row">
                <Sidebar heightScale={'auto'}></Sidebar>
                <div className="right-side-bar col-md-9">
                    <h3 className="mb-5"> Add Addons</h3>
                    <div className="product-form">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input className="form-control" {...register("addon", { required: true })} placeholder="Addons name" />
                            {errors.addon && <span>This field is required</span>}
                            <input type="submit" />
                        </form>
                    </div>
                    <div className="row">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">No:</th>
                                    <th scope="col">Addons Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    addonList.map((addon, index) => <tr key={addon._id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{addon.addon}</td>
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

export default AddAddons;