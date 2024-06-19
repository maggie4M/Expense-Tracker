import React from 'react';
import AddExpense from '../components/AddExpense';

const AddExpensePage = ({ addExpense }) => {
    return (
        <div>
            <h1>Add Expense</h1>
            <AddExpense addExpense={addExpense} />
        </div>
    );
};

export default AddExpensePage;
