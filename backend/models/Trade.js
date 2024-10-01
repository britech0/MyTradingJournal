const mongoose = require('mongoose');


const tradeSchema = new mongoose.Schema({

    symbol: { type: String, required: true },
    entryPrice: { type: Number, required: true },
    exitPrice: { type: Number, required: true },
    positionSize: { type: Number, required: true},
    tradeType: { type: String, required: true },
    entryDate: { type: Date, required: true },
    exitDate: { type: Date, required: true },
    notes: { type: String },

});

const Trade = mongoose.model('Trade', tradeSchema);


module.exports = Trade;