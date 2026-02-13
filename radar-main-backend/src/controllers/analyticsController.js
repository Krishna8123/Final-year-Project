const { fetchStockData } = require('../services/stockService');

const getPreMarketPulse = async (req, res) => {
    try {
        const stocks = await fetchStockData();

        const gapUp = stocks.filter(s => s.change > 2.0).map(s => ({ symbol: s.symbol, change: `+${s.change}%`, price: s.price }));
        const gapDown = stocks.filter(s => s.change < -2.0).map(s => ({ symbol: s.symbol, change: `${s.change}%`, price: s.price }));

        const volumeShockers = stocks.slice(0, 2).map(s => ({
            symbol: s.symbol,
            volume: "15M",
            avgVolume: "10M",
            shock: "1.5x"
        }));

        res.json({
            gapUp,
            gapDown,
            volumeShockers
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

const getSectorHeatmap = async (req, res) => {
    try {
        const heatmapData = [
            {
                name: "Technology",
                children: [
                    { name: "AAPL", size: 2700, change: 1.25 },
                    { name: "MSFT", size: 2300, change: -0.5 },
                    { name: "NVDA", size: 1200, change: 5.4 }
                ]
            },
            {
                name: "Automotive",
                children: [
                    { name: "TSLA", size: 750, change: -3.1 },
                    { name: "F", size: 45, change: 0.2 }
                ]
            },
            {
                name: "Finance",
                children: [
                    { name: "JPM", size: 400, change: 1.1 },
                    { name: "BAC", size: 250, change: 0.8 }
                ]
            }
        ];

        res.json(heatmapData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

module.exports = { getPreMarketPulse, getSectorHeatmap };
