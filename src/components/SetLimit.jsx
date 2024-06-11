// src/components/SetLimit.jsx
import React, { useState } from 'react';

const SetLimit = ({ setLimit }) => {
    const [limit, setLimitState] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setLimit(parseFloat(limit));
        setLimitState('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="number"
                value={limit}
                onChange={(e) => setLimitState(e.target.value)}
                placeholder="Set Spending Limit"
                required
            />
            <button type="submit">Set Limit</button>
        </form>
    );
};

export default SetLimit;
