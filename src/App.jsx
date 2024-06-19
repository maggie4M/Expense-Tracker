import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import AddExpensePage from './pages/AddExpensePage';
import Stats from './pages/Stats';
import './App.css';

const App = () => {
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
        <Router>
            <nav>
                <Link to="/">Dashboard</Link>
                <Link to="/stats">Stats</Link>
                <Link to="/expenses">Expenses</Link>
                <Link to="/add-expense">Add Expense</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/stats" element={<Stats
                    expenses={expenses}
                    limit={limit}
                    total={total}
                    setSpendingLimit={setSpendingLimit}
                />} />
                <Route path="/expenses" element={<Expenses
                    expenses={expenses}
                    deleteExpense={deleteExpense}
                />} />
                <Route path="/add-expense" element={<AddExpensePage
                    addExpense={addExpense}
                />} />
            </Routes>
        </Router>
    );
};

export default App;
