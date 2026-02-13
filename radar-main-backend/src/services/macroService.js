const axios = require('axios');

let macroCache = {
    pulse: null,
    indicators: null,
    lastFetch: 0
};

const CACHE_DURATION = 1000 * 60 * 60;

const getGlobalPulse = async () => {
    const now = Date.now();
    if (macroCache.pulse && (now - macroCache.lastFetch < CACHE_DURATION)) {
        return macroCache.pulse;
    }

    try {
        const pulse = [
            { name: "S&P 500", value: "5,245", change: "+0.8%", trend: "up" },
            { name: "NASDAQ", value: "16,400", change: "+1.2%", trend: "up" },
            { name: "FTSE 100", value: "7,950", change: "+0.1%", trend: "up" },
            { name: "NIKKEI 225", value: "40,100", change: "-0.4%", trend: "down" },
            { name: "GOLD", value: "2,350", change: "+0.5%", trend: "up" },
            { name: "CRUDE OIL", value: "86.50", change: "+1.1%", trend: "up" }
        ];

        macroCache.pulse = pulse;
        return pulse;

    } catch (error) {
        console.error("Global Pulse Fetch Error:", error);
        return [];
    }
};

const getMacroIndicators = async () => {
    const now = Date.now();
    if (macroCache.indicators && (now - macroCache.lastFetch < CACHE_DURATION)) {
        return macroCache.indicators;
    }

    try {
        const wbUrl = 'http://api.worldbank.org/v2/country/US/indicator/NY.GDP.MKTP.KD.ZG?format=json&per_page=1';

        const fredKey = process.env.FRED_API_KEY;
        let interestRate = "5.50%";
        let inflationRate = "3.2%";

        const wbRes = await axios.get(wbUrl);
        let gdpGrowth = "2.5%";
        if (wbRes.data && wbRes.data[1] && wbRes.data[1][0]) {
            gdpGrowth = `${parseFloat(wbRes.data[1][0].value).toFixed(1)}%`;
        }

        if (fredKey) {
            try {
                const fredUrl = `https://api.stlouisfed.org/fred/series/observations?series_id=FEDFUNDS&api_key=${fredKey}&file_type=json&limit=1&sort_order=desc`;
                const fredRes = await axios.get(fredUrl);
                if (fredRes.data.observations && fredRes.data.observations.length > 0) {
                    interestRate = `${parseFloat(fredRes.data.observations[0].value).toFixed(2)}%`;
                }

                const cpiUrl = `https://api.stlouisfed.org/fred/series/observations?series_id=CPIAUCSL&api_key=${fredKey}&file_type=json&limit=1&sort_order=desc`;
                const cpiRes = await axios.get(cpiUrl);
            } catch (e) {
                console.warn("FRED API Error:", e.message);
            }
        }

        const indicators = {
            gdp_growth: gdpGrowth,
            inflation_rate: inflationRate,
            interest_rate: interestRate
        };

        macroCache.indicators = indicators;
        macroCache.lastFetch = Date.now();
        return indicators;

    } catch (error) {
        console.error("Macro API Error:", error);
        return {
            gdp_growth: "2.1% (Est)",
            inflation_rate: "3.4% (Est)",
            interest_rate: "5.33%"
        };
    }
};

module.exports = { getGlobalPulse, getMacroIndicators };
