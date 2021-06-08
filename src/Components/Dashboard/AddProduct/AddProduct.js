import './AddProduct.css'
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Select from 'react-select';

const AddProduct = () => {
    const [selectedAddon, setSelectedAddon] = useState([])
    const [categoryList, setCategoryList] = useState([])
    const [addonList, setAddonList] = useState([])
    const [imageUrl, setImageUrl] = useState(null);
    const [previewImg, setPreviewImg] = useState(null)
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    
    const arrayValue = []
    arrayValue.push(selectedAddon.map(addon => '' + addon.value))
    
    const onSubmit = async data => {

        // const toBeAddedProductData = {
        //     name: data.name,
        //     price: data.price,
        //     weight: data.weight,
        //     image: imageUrl,
        //     categoryId: data.category
        // }
        // axios.post('http://localhost:4200/product', toBeAddedProductData)
        //     .then(result => {
        //         if (result.data.res) {
        //             alert('Product Added Successfully.')
        //             setImageUrl(null)
        //             reset()
        //         }
        //     })

        const toBeAddedProductData = await new FormData()
        toBeAddedProductData.append('name', data.name)
        toBeAddedProductData.append('price', data.price)
        toBeAddedProductData.append('weight', data.weight)
        toBeAddedProductData.append('categoryId', data.category)
        toBeAddedProductData.append('addons', arrayValue)
        toBeAddedProductData.append('image', imageUrl)

        // axios.post('https://httpbin.org/anything', toBeAddedProductData)
        // .then(res => console.log(res))
        try {
            const result = await axios.post('http://localhost:4200/product', toBeAddedProductData)
            const resultOfData = await result.statusText
            if (result.statusText === "OK") {
                alert('Product Added Successfully.')
                reset()
                setPreviewImg(null)
            }
        } catch (error) {
            console.log(error)
        }
    };

    //image handler

    const uploadImageHandler = async e => {
        // const imageData = new FormData();
        // imageData.set('key', '41e7c876286549d302ce964e69418b3a');
        // imageData.append('image', e.target.files[0]);
        // // axios.post('https://httpbin.org/anything', imageData).then(res=> console.log(res))
        // axios.post('https://api.imgbb.com/1/upload', imageData)
        //     .then(result => {
        //         setImageUrl(result.data.data.display_url)
        //     })

        await setImageUrl(e.target.files[0])
        await previewImage(e.target.files[0])
    }

    //Preview Image
    const previewImage = (img) => {
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onloadend = () => {
            setPreviewImg(reader.result);
        };
    }
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

    const cakeAddon = []
    addonList.map(adn => cakeAddon.push({value: adn._id, label: adn.addon}))
    
    return (
        <div className="container add-product mt-5">
            <div className="row">
                <Sidebar heightScale={'100vh'}></Sidebar>
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
                                {/* <div className="col-md-6">
                                    <input className="form-control" type="file" {...register("image", { required: true })} onChange={uploadImageHandler} />
                                    {errors.image && <span>This field is required</span>}
                                </div> */}
                                <div className="col-md-6">
                                    <input className="form-control" type="file" name="image" onChange={uploadImageHandler} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <select className="form-control" {...register("category", { required: true })}>
                                        <option>Select a category</option>
                                        {
                                            categoryList.map((ctl, index) => <option key={index + 1} value={ctl._id}>{ctl.category}</option>)
                                        }
                                    </select>
                                    {errors.category && <span>Select a category</span>}
                                </div>
                                <div className="col-md-6">
                                    <Select
                                   options={cakeAddon}
                                   isMulti
                                   isSearchable
                                   onChange={setSelectedAddon}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6"></div>
                                <div className="col-md-6">
                                    <input type="submit" value="Submit" />
                                </div>

                            </div>
                        </form>
                    </div>
                    <div>
                        {
                            previewImg && <img src={previewImg} className="w-25 img-fluid" alt="" />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;