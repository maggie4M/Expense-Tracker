import React from 'react';
import SetLimit from '../components/SetLimit';
import ExpenseChart from '../components/ExpenseChart';

const Stats = ({ expenses, limit, total, setSpendingLimit }) => {
    return (
        <div>
            <h1>Stats</h1>
            <SetLimit setLimit={setSpendingLimit} />
            <div>
                <h2>Spending Limit: ${limit}</h2>
                <h2>Total Spent: ${total}</h2>
                <progress value={total} max={limit}></progress>
            </div>
            <ExpenseChart expenses={expenses} />
        </div>
    );
};

export default Stats;
