import React from 'react';
import ExpenseItem from '../components/ExpenseItem';

const Expenses = ({ expenses, deleteExpense }) => {
    return (
        <div>
            <h1>Expenses</h1>
            <ul>
                {expenses.map(expense => (
                    <ExpenseItem key={expense.id} expense={expense} deleteExpense={deleteExpense} />
                ))}
            </ul>
        </div>
    );
};

export default Expenses;
