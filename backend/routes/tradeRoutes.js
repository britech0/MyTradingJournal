const express = require('express');
const router = express.Router();

const {
    getTradeSummary,
    createTrade,
    getTrades,
    getTradeById,
    updateTrade,
    deleteTrade,
} = require('../controllers/tradeController');


router.post('/', createTrade);

router.get('/summary', getTradeSummary);

router.get('/', getTrades);

router.get('/:id', getTradeById);

router.put('/:id', updateTrade);

router.delete('/:id', deleteTrade);

module.exports = router;
