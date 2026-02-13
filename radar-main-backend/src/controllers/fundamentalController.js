const { fetchStockData } = require('../services/stockService');
const { getFilingsForSymbol } = require('../services/secService');

const getValuationThermometer = async (req, res) => {
    try {
        const stocks = await fetchStockData();
        const data = stocks.map(s => ({
            symbol: s.symbol,
            currentPE: s.details.pe_ratio,
            historicalPE: (s.details.pe_ratio * (0.9 + Math.random() * 0.2)).toFixed(2),
            status: s.details.pe_ratio > 30 ? "Overvalued" : "Undervalued"
        }));
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

const getInvestmentIdeas = async (req, res) => {
    try {
        const stocks = await fetchStockData();
        res.json({
            stockOfTheWeek: stocks[0],
            topDividends: stocks.filter(s => parseFloat(s.details.dividend_yield) > 0.5),
            undervaluedGems: stocks.filter(s => s.details.pe_ratio < 20)
        });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

const getPeerComparison = (req, res) => {
    const { symbol } = req.params;
    res.json({
        symbol: symbol.toUpperCase(),
        peers: [
            { symbol: "MSFT", pe: 35.2, roe: "40%", margin: "35%" },
            { symbol: "GOOGL", pe: 28.5, roe: "30%", margin: "25%" },
            { symbol: "AAPL", pe: 28.5, roe: "145%", margin: "25%" }
        ]
    });
};

const getMarketMoodIndex = (req, res) => {
    res.json({
        value: 75,
        status: "Greed",
        previousClose: 72,
        oneWeekAgo: 65
    });
};

module.exports = { getValuationThermometer, getInvestmentIdeas, getPeerComparison, getMarketMoodIndex };
