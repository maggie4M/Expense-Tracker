import React, { useState } from 'react';

const SetLimit = ({ setLimit }) => {
    const [limit, setLimitValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setLimit(parseFloat(limit));
        setLimitValue('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="number" placeholder="Set Limit" value={limit} onChange={(e) => setLimitValue(e.target.value)} required />
            <button type="submit">Set Limit</button>
        </form>
    );
};

export default SetLimit;
