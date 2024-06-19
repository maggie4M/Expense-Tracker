import React from 'react';
import SetLimit from '../components/SetLimit';
import ExpenseChart from '../components/ExpenseChart';

const Stats = () => {
    const [limit, setLimit] = useState(0);
    const [totalSpent, setTotalSpent] = useState(0);
    const [monthlySpending, setMonthlySpending] = useState('');

    const handleSetLimit = (newLimit) => {
        setLimit(newLimit);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const parsedMonthlySpending = parseFloat(monthlySpending);
        if (!isNaN(parsedMonthlySpending) && parsedMonthlySpending >= 0) {
            setTotalSpent(parsedMonthlySpending);
        } else {
            alert("Please enter a valid number for the total spending.");
        }
    };

    return (
        <div className="stats-container">
            <h1>Stats</h1>
            <div className="set-limit-section">
                <SetLimit setLimit={handleSetLimit} />
            </div>
            <div className="monthly-spending-section">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter total spending for the month"
                        value={monthlySpending}
                        onChange={(e) => setMonthlySpending(e.target.value)}
                        required
                    />
                    <button type="submit">Set Monthly Spending</button>
                </form>
            </div>
            <div className="stats-info">
                <h2>Spending Limit: ${limit.toFixed(2)}</h2>
                <h2>Total Spent: ${totalSpent.toFixed(2)}</h2>
                <progress value={totalSpent} max={limit}></progress>
            </div>
            <div className="chart-section">
                <ExpenseChart expenses={[{ category: 'Spent', amount: totalSpent }]} limit={limit} />
            </div>
        </div>
    );
};

export default Stats;
