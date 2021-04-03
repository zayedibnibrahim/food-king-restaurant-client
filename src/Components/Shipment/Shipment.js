import axios from 'axios';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { userContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utility/databaseManager';
import './Shipment.css'
const Shipment = () => {
    //Context API
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const history = useHistory();
    const onSubmit = data => {

        const savedCart = getDatabaseCart();
        const orderDetails = { ...loggedInUser, products: savedCart, Shipment: data }

        axios.post('https://apple-sundae-00069.herokuapp.com/addOrders', orderDetails)
            .then(data => {
                if (data) {
                    processOrder();
                    history.push('/thankyoupage')
                }
            })
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 m-auto">
                    <h3>Personal Details</h3>
                    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>

                        <input className="form-control mb-4" defaultValue={loggedInUser.name} {...register("name", { required: true })} placeholder="Your Name" />
                        {errors.name && <span className="error">This field is required</span>}

                        <input className="form-control mb-4" defaultValue={loggedInUser.email} {...register("email", { required: true })} placeholder="Your Email" />
                        {errors.email && <span className="error">This field is required</span>}

                        <input className="form-control mb-4" {...register("address", { required: true })} placeholder="Your Address" />
                        {errors.address && <span className="error">This field is required</span>}

                        <input className="form-control mb-4" {...register("phone", { required: true })} placeholder="Phone" />
                        {errors.phone && <span className="error">This field is required</span>}

                        <input type="submit" className="btn btn-primary"/>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Shipment;