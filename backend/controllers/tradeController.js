const Trade = require('../models/Trade');

//create a new trade entry
const createTrade = async (req, res) => {
    try {
        const trade = new Trade(req.body);
        await trade.save();
        res.status(201).json(trade);
    }

    catch (error) {
        res.status(400).json({ error: 'Failure to create new trade entry.' });
    }
};


// Retrieve all trades
const getTrades = async (req, res) => {
    try {
        const trades = await Trade.find({});
        res.status(200).json(trades);
    }   catch (error) {
        res.status(500).json({ error: 'Failed to retrieve your trades.'});
    }
};

//Retrieve trade by id
const getTradeById = async (req, res) => {
    console.log("Fetching trade with ID:", req.params.id);
    try {
        const trade = await Trade.findById(req.params.id);
        if (!trade) {
            return res.status(404).json( {error: 'Trade not found' });
        }
        res.status(200).json(trade);
    }   catch (error) {
        res.status(500).json({ error: 'Failed to retrieve trade'});
    }
};

//Get the trade summary
const getTradeSummary = async (req, res) => {
    try {
        const trades = await Trade.find(); 
        const formattedTrades = trades.map(trade => ({
            date: trade.entryDate,  
            profitLoss: (trade.exitPrice - trade.entryPrice) * trade.positionSize
        }));

        res.status(200).json(formattedTrades);
    } catch (error) {
        console.error("Error fetching trades:", error);
        res.status(500).json({ error: 'Failed to retrieve trades.' });
    }
};

//update a trade
const updateTrade = async (req, res) => {
    try {
        const trade = await Trade.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!trade) {
            return res.status(404).json({ error: 'Trade not found' });
        }
        res.status(200).json(trade);
    } catch (error) {
        console.error('Error updating trade:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: 'Failed to update trade entry.' });
    }
};

//Delete a trade
const deleteTrade = async (req, res) => {
    try {
        const trade = await Trade.findByIdAndDelete(req.params.id);
        if (!trade) {
            return res.status(404).json({ error: 'Trade not found' });
        }
        res.status(200).json({ message: 'Trade deleted successfully'});
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete trade'});
    }
};

//profitloss calculation

const calculateProfitLoss = (buyPrice, sellPrice, quantity) => {
    return (sellPrice - buyPrice) * quantity;
};

//total balance calculation

const calculateTotalPNL = () => {
    
}

module.exports = {
    getTradeSummary,
    createTrade,
    getTrades,
    getTradeById,
    updateTrade,
    deleteTrade,
    calculateProfitLoss,
};