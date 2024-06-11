// src/components/ExpenseItem.jsx
import React from 'react';

const ExpenseItem = ({ expense, deleteExpense }) => {
    return (
        <li>
            {expense.date} - {expense.category}: ${expense.amount}
            <button onClick={() => deleteExpense(expense.id)}>Delete</button>
        </li>
    );
};

export default ExpenseItem;
