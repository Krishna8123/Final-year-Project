const { fetchStockData } = require('../services/stockService');

const getWatchlistData = async (req, res) => {
    try {
        const stocks = await fetchStockData();


        const technicalWatchlist = stocks.map(stock => {

            const currentPrice = stock.price;
            const vwap = (currentPrice * 0.98).toFixed(2);


            return {
                ...stock,
                technicals: {
                    vwap: vwap,
                    status: currentPrice > vwap ? "Above VWAP" : "Below VWAP",
                    sparkline: [
                        currentPrice - 2, currentPrice - 1, currentPrice - 1.5, currentPrice + 0.5, currentPrice
                    ]
                }
            };
        });

        res.json(technicalWatchlist);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

const getBreakoutAlerts = (req, res) => {
    res.json([
        { symbol: "NVDA", type: "Resistance Breakout", price: 460.18, time: "10:30 AM" },
        { symbol: "AMD", type: "52-Week High", price: 115.20, time: "11:15 AM" }
    ]);
};

const getIndicatorSignals = (req, res) => {
    res.json([
        { symbol: "RSI", value: "Overbought (>70)", stocks: ["TSLA", "META"] },
        { symbol: "MACD", value: "Bullish Crossover", stocks: ["AAPL", "AMZN"] }
    ]);
};

const getQuickOrderData = (req, res) => {
    const { symbol } = req.params;
    res.json({
        symbol: symbol.toUpperCase(),
        bids: [
            { price: 150.00, size: 500 },
            { price: 149.95, size: 300 }
        ],
        asks: [
            { price: 150.05, size: 200 },
            { price: 150.10, size: 600 }
        ]
    });
};

module.exports = { getWatchlistData, getBreakoutAlerts, getIndicatorSignals, getQuickOrderData };
