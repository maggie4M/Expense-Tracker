// src/components/ExpenseList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseItem from './ExpenseItem';
import AddExpense from './AddExpense';
import SetLimit from './SetLimit';

const ExpenseList = () => {
    const [expenses, setExpenses] = useState([]);
    const [limit, setLimit] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:8000/expenses')
            .then(response => {
                setExpenses(response.data);
                calculateTotal(response.data);
            })
            .catch(error => console.error(error));

        axios.get('http://localhost:8000/limit')
            .then(response => setLimit(response.data.limit))
            .catch(error => console.error(error));
    }, []);

    const calculateTotal = (expenses) => {
        const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
        setTotal(total);
    };

    const addExpense = (expense) => {
        if (total + expense.amount > limit) {
            alert("Expense exceeds the spending limit!");
            return;
        }
        axios.post('http://localhost:8000/expenses', expense)
            .then(response => {
                const newExpenses = [...expenses, response.data];
                setExpenses(newExpenses);
                calculateTotal(newExpenses);
            })
            .catch(error => console.error(error));
    };

    const deleteExpense = (id) => {
        axios.delete(`http://localhost:8000/expenses/${id}`)
            .then(() => {
                const newExpenses = expenses.filter(exp => exp.id !== id);
                setExpenses(newExpenses);
                calculateTotal(newExpenses);
            })
            .catch(error => console.error(error));
    };

    const setSpendingLimit = (newLimit) => {
        axios.post('http://localhost:8000/limit', { limit: newLimit })
            .then(response => setLimit(response.data.limit))
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h1>Expense Tracker</h1>
            <SetLimit setLimit={setSpendingLimit} />
            <div>
                <h2>Spending Limit: ${limit}</h2>
                <h2>Total Spent: ${total}</h2>
                <progress value={total} max={limit}></progress>
            </div>
            <AddExpense addExpense={addExpense} />
            <ul>
                {expenses.map(expense => (
                    <ExpenseItem key={expense.id} expense={expense} deleteExpense={deleteExpense} />
                ))}
            </ul>
        </div>
    );
};

export default ExpenseList;
