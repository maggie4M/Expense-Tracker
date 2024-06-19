import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Expenses from './Pages/Expenses';
import AddExpensePage from './Pages/AddExpensePage';
import Stats from './Pages/Stats';
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
            <nav className="navbar">
                <Link to="/" className="nav-link">Dashboard</Link>
                <Link to="/stats" className="nav-link">Stats</Link>
                <Link to="/expenses" className="nav-link">Expenses</Link>
                <Link to="/add-expense" className="nav-link">Add Expense</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/stats" element={<Stats
                />} />
                <Route path="/expenses" element={<Expenses
                    expenses={expenses}
                    deleteExpense={deleteExpense}
                />} />
                <Route path="/add-expense" element={<AddExpensePage
                    addExpense={addExpense}
                    expenses={expenses}
                />} />
            </Routes>
        </Router>
    );
};

export default App;
