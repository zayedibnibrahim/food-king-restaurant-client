import React from 'react';
import Sidebar from './Sidebar/Sidebar';
import './Dashboard.css'
const Dashboard = () => {
    return (
        <div className="container dashboard mt-5">
            <div className="row">
                <Sidebar heightScale={'100vh'}></Sidebar>
                <div className="right-side-bar col-md-9">
                    <h3 className="mb-5">Admin Dashboard</h3>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;