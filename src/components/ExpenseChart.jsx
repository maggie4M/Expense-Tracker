// src/components/ExpenseChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ExpenseChart = ({ expenses }) => {
    const categories = [...new Set(expenses.map(expense => expense.category))];
    const data = {
        labels: categories,
        datasets: [{
            label: 'Expenses',
            data: categories.map(category => {
                return expenses.filter(expense => expense.category === category)
                    .reduce((acc, expense) => acc + expense.amount, 0);
            }),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    return (
        <div>
            <h2>Expense Chart</h2>
            <Bar data={data} />
        </div>
    );
};

export default ExpenseChart;
