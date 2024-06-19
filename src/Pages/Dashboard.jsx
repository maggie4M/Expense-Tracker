import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="dashboard-container" >
            <div className="content">
            <div class="card2">
        <div class="card-content"> <h1>Welcome to the Expense Tracker App</h1>
        <p class="card-title">
         </p><p class="card-para">This app helps you track your expenses, set spending limits, and visualize your spending habits.</p>
         </div>
        </div>
        </div>
            <p>Click below to explore:</p>
            <div className="nav-links">
            <div className="cards">
                <div className="card red">
                    <Link to="/stats">
                        <p className="tip">Visualizing expenses with charts & Setting a spending limit</p>
                        <p className="second-text">Stats</p>
                    </Link>
                </div>
                <div className="card blue">
                    <Link to="/expenses">
                        <p className="tip">Viewing all expenses</p>
                        <p className="second-text">Expenses</p>
                    </Link>
                </div>
                <div className="card green">
                    <Link to="/add-expense">
                        <p className="tip">Adding new expenses</p>
                        <p className="second-text">Add Expense</p>
                    </Link>
                    </div>
                </div>
             </div>    
        </div>
    );
};

export default Dashboard;
