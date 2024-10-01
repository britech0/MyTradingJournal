import React, { useState, useEffect } from 'react';
import GraphSection from './GraphSection';
import TradesList from './TradesList';
import axios from 'axios';

const HomePage = () => {
    const [trades, setTrades] = useState([]);

    const fetchTrades = () => {
        axios.get('/api/trades')
            .then(response => {
                setTrades(response.data);
            })
            .catch(error => {
                console.error('Error fetching trades:', error);
            });
    };

    useEffect(() => {
        fetchTrades();
    }, []);

    return (
        <section>
            <div>
                <h1>Trading Journal Dashboard</h1>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ flex: 1, marginRight: '20px' }}>
                        <GraphSection trades={trades} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <TradesList trades={trades} fetchTrades={fetchTrades} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomePage;