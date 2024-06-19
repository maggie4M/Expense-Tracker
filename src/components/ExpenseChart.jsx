import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const ExpenseChart = ({ expenses }) => {
    const data = {
        labels: expenses.map(expense => expense.category),
        datasets: [{
            label: 'Expenses',
            data: expenses.map(expense => expense.amount),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
        }],
    };

    return <Bar data={data} />;
};

export default ExpenseChart;
