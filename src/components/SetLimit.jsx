import React, { useState } from 'react';

const SetLimit = ({ setLimit }) => {
    const [limit, setLimitValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const parsedLimit = parseFloat(limit);
        if (!isNaN(parsedLimit) && parsedLimit >= 0) {
            setLimit(parsedLimit);
            setLimitValue('');
        } else {
            alert("Please enter a valid number for the limit.");
        }
    };

    return (
        <div className="login-box">
            <form onSubmit={handleSubmit}> 
                <div className="user-box">
                    <input
                        type="text"
                        placeholder="Enter your spending limit"
                        value={limit}
                        onChange={(e) => setLimitValue(e.target.value)}
                        required
                    />
                </div>
                <center>
                    <button type="submit">Set Limit</button>
                </center>
            </form>
        </div>
    );
};

export default SetLimit;
