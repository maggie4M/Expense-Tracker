import React, { useState } from 'react';
import AddExpense from './AddExpense';

const ExpenseTracker = () => {
    const [expenses, setExpenses] = useState([]);

    const addExpense = (expense) => {
        setExpenses([...expenses, expense]);
    };

    return (
        <div>
            <h1>Expense Tracker</h1>
            <AddExpense addExpense={addExpense} />
            {expenses.length > 0 && (
                <div className="expenses-table">
                    <h2>Expenses</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Amount</th>
                                <th>Category</th>
                                <th>Date</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.map((expense, index) => (
                                <tr key={index}>
                                    <td>${expense.amount.toFixed(2)}</td>
                                    <td>{expense.category}</td>
                                    <td>{expense.date}</td>
                                    <td>{expense.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ExpenseTracker;
