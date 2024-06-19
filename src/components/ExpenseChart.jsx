import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const ExpenseChart = ({ expenses, limit }) => {
    // Determine if spending exceeds the limit
    const exceededLimit = expenses.length > 0 && expenses[0].amount > limit;

    const data = {
        labels: ['Monthly Spending'],
        datasets: [{
            label: 'Total Spent',
            data: expenses.map(expense => expense.amount),
            backgroundColor: exceededLimit ? 'rgba(255, 99, 132, 0.6)' : 'rgba(75, 192, 192, 0.6)',
        }],
    };

    return <Bar data={data} />;
};

export default ExpenseChart;