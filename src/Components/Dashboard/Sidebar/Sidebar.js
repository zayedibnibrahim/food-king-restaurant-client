import React from 'react';
import { faAlignRight, faEdit, faPlus, faChartBar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import './Sidebar.css'
const Sidebar = ({heightScale}) => {
    return (
        <div className="left-side-bar col-md-3" style={{height: heightScale}}>
            <div className="sidebar-nav">
                <h3 className="mb-5"><FontAwesomeIcon icon={faAlignRight} /> Manage Product</h3>
                <Link to="/dashboard">
                    <h5><FontAwesomeIcon icon={faChartBar} /> Dashboard</h5>
                </Link>
                <br/>
                <Link to="/addProduct">
                    <h5><FontAwesomeIcon icon={faPlus} /> Add Product</h5>
                </Link>
                <br />
                <Link to="/editProduct">
                    <h5><FontAwesomeIcon icon={faEdit} /> Edit Product</h5>
                </Link>
                <br />
                <Link to="/addCategory">
                    <h5><FontAwesomeIcon icon={faEdit} /> Add Category</h5>
                </Link>
                <br />
                <Link to="/addAddons">
                    <h5><FontAwesomeIcon icon={faEdit} /> Add Addons</h5>
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;