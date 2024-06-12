import React from 'react';
import SetLimit from '../components/SetLimit';
import ExpenseChart from '../components/ExpenseChart';

const Dashboard = ({ expenses, limit, total, setSpendingLimit }) => {
    return (
        <div>
            <h1>Dashboard</h1>
            <SetLimit setLimit={setSpendingLimit} />
            <div>
                <h2>Spending Limit: ${limit}</h2>
                <h2>Total Spent: ${total}</h2>
                <progress value={total} max={limit}></progress><var></var>
            </div>
            <ExpenseChart expenses={expenses} />
        </div>
    );
};

export default Dashboard;
