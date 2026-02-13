const getCorporateActions = (req, res) => {
    res.json([
        { date: "2024-05-15", symbol: "AAPL", action: "Dividend", details: "$0.25/share" },
        { date: "2024-05-20", symbol: "NVDA", action: "Earnings", details: "Q1 2024" },
        { date: "2024-06-01", symbol: "TSLA", action: "AGM", details: "Annual General Meeting" }
    ]);
};

module.exports = { getCorporateActions };
