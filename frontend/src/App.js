import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage'; 
import TradesList from './TradesList'; 
import TradeForm from './TradeForm';  

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/trades" element={<TradesList />} />
        <Route path="/trades/add" element={<TradeForm />} />
        <Route path="/trades/edit/:id" element={<TradeForm />} />
      </Routes>
    </Router>
  );
}

export default App;
