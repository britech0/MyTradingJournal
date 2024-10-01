import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; 
import TradeForm from './TradeForm'; 

const TradesList = ({ trades, fetchTrades }) => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingTrade, setEditingTrade] = useState(null); 
    const [balance, setBalance] = useState(0); 
    const [initialBalanceInput, setInitialBalanceInput] = useState('');
    const [error, setError] = useState(null);

    const handleFormSubmit = async (formData) => {
        console.log('handleFormSubmit called with formData:', formData);
        try {
            if (editingTrade) {
                console.log('Editing trade object:', editingTrade);
                console.log('Updating trade with ID:', editingTrade._id);
                await axios.put(`/api/trades/${editingTrade._id}`, formData);
                console.log('Trade updated successfully');
            } else {
                console.log('Adding new trade');
                await axios.post('/api/trades', formData);
                console.log('Trade added successfully');
            }

            setIsFormVisible(false);  
            setEditingTrade(null);  
            fetchTrades();  
            setError(null);
        } catch (error) {
            console.error('Error submitting trade:', error);
        if (error.response && error.response.data && error.response.data.error) {
            setError(error.response.data.error);
        } else {
            setError('Failed to submit the trade. Please try again.');
        }
    }
};

    const handleAddClick = () => {
        setEditingTrade(null);  
        setIsFormVisible(true);  
    };

    const handleEditClick = (trade) => {
        console.log('Edit clicked for trade:', trade);
        setEditingTrade(trade);  
        setIsFormVisible(true);  
    };

    const handleDeleteClick = async (tradeId) => {
        if (!window.confirm('Are you sure you want to delete?')) return;

        try {
            await axios.delete(`/api/trades/${tradeId}`);
            fetchTrades();  
            setError(null); 
        } catch (error) {
            console.error('Error deleting trade:', error);
            setError('Failed to delete the trade. Please try again.');
        }
    };

    const handleInitialBalanceSubmit = (e) => {
        e.preventDefault();
        const parsedBalance = parseFloat(initialBalanceInput);
        if (!isNaN(parsedBalance)) {
            setBalance(parsedBalance); 
            setError(null);
        } else {
            setError('Please enter a valid number for the initial balance.');
        }
        setInitialBalanceInput(''); 
    };

    
    const totalProfitLoss = trades.reduce((acc, trade) => {
        if (trade.exitDate) { 
            const profitLoss = (trade.exitPrice - trade.entryPrice) * trade.positionSize;
            return acc + profitLoss;
        }
        return acc;
    }, 0);

    return (
        <div className="table-container">
            {error && <div className="error-message">{error}</div>}

            <h1>Balance: ${ (balance + totalProfitLoss).toFixed(2) }</h1>

            <form onFormSubmit={handleInitialBalanceSubmit} className="balance-form">
                <input
                    type="number"
                    step="0.01"
                    value={initialBalanceInput}
                    onChange={(e) => setInitialBalanceInput(e.target.value)}
                    placeholder="Enter initial balance"
                    required
                />
                <button type="submit">Set Balance</button>
            </form>

            <div className="trades-header">
                <h2>Trade History:</h2>
                <button onClick={handleAddClick} className="actions-btn add-btn">Add Trade</button>
            </div>

            {isFormVisible && (
                
                <TradeForm trade={editingTrade} onFormSubmit={handleFormSubmit} />
                
            )}

            <div className="table-bg">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Symbol</th>
                            <th>Trade Type</th>
                            <th>Entry Price</th>
                            <th>Exit Price</th>
                            <th>Profit/Loss</th>
                            <th>Entry Date</th>
                            <th>Exit Date</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trades.length === 0 ? (
                            <tr>
                                <td colSpan="9">No trades available.</td>
                            </tr>
                        ) : (
                            trades.map(trade => (
                                <tr key={trade._id}>
                                    <td>{trade.symbol}</td>
                                    <td>{trade.tradeType}</td>
                                    <td>${Number(trade.entryPrice).toFixed(2)}</td>
                                    <td>${Number(trade.exitPrice).toFixed(2)}</td>
                                    <td
                                        className={
                                            (Number(trade.exitPrice) - Number(trade.entryPrice)) * Number(trade.positionSize) >= 0
                                                ? 'profit'
                                                : 'loss'
                                        }
                                    >
                                        ${((Number(trade.exitPrice) - Number(trade.entryPrice)) * Number(trade.positionSize)).toFixed(2)}
                                    </td>
                                    <td>{new Date(trade.entryDate).toLocaleDateString()}</td>
                                    <td>{trade.exitDate ? new Date(trade.exitDate).toLocaleDateString() : 'Ongoing'}</td>
                                    <td>
                                        <button onClick={() => handleEditClick(trade)} className="actions-btn edit">Edit</button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteClick(trade._id)} className="actions-btn delete">Delete</button>
                                    </td>
                                </tr>
                        ))
                        )}
                    </tbody>
                </table>
            </div>
            </div>
        );

    };

export default TradesList;
