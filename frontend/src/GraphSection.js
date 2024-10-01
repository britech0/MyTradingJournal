import React, { useEffect, useState } from 'react';
import {
    LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer
} from 'recharts';
import './App.css';

const GraphSection = ({ trades }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!trades || trades.length === 0) {
            setData([]);
            return;
        }

        
        const sortedTrades = trades.slice().sort((a, b) => new Date(a.exitDate || a.entryDate) - new Date(b.exitDate || b.entryDate));

        let cumulativeProfitLoss = 0;
        const chartData = sortedTrades.map(trade => {
            const date = trade.exitDate || trade.entryDate;
            const profitLoss = (trade.exitPrice - trade.entryPrice) * trade.positionSize;
            cumulativeProfitLoss += profitLoss;
            return {
                date: new Date(date).toLocaleDateString(),
                profitLoss: Number(cumulativeProfitLoss.toFixed(2)),
            };
        });

        setData(chartData);
    }, [trades]);

    return (
        <div className="graph-section">
            <h2>Cumulative Profit/Loss Over Time</h2>
            <ResponsiveContainer width="100%" height={600}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="profitLoss" stroke="#2196F3" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default GraphSection;
