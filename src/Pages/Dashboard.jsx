import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div>
            <h1>Welcome to the Expense Tracker App</h1>
            <p>This app helps you track your expenses, set spending limits, and visualize your spending habits.</p>
            <p>Features include:</p>
            <ul>
                <li>Adding new expenses</li>
                <li>Setting a spending limit</li>
                <li>Viewing all expenses</li>
                <li>Visualizing expenses with charts</li>
            </ul>
            <p>Click below to explore:</p>
            <nav>
                <Link to="/stats">Stats</Link><br/>
                <Link to="/expenses">Expenses</Link><br/>
                <Link to="/add-expense">Add Expense</Link>
            </nav>
        </div>
    );
};

export default Dashboard;
