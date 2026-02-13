const axios = require('axios');

const fetchMarketNews = async (category = 'general') => {
    try {
        if (process.env.NEWS_API_KEY) {
            const url = 'https://newsapi.org/v2/top-headlines';
            const params = {
                category: 'business',
                language: 'en',
                country: 'us',
                apiKey: process.env.NEWS_API_KEY,
                pageSize: 6
            };
            const response = await axios.get(url, { params });
            return response.data.articles.map(article => ({
                id: article.url,
                source: article.source.name,
                title: article.title,
                time: new Date(article.publishedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                url: article.url,
                sentiment: "Neutral"
            }));
        }

        if (process.env.GNEWS_API_KEY) {
            const url = 'https://gnews.io/api/v4/top-headlines';
            const params = {
                category: 'business',
                lang: 'en',
                country: 'us',
                apikey: process.env.GNEWS_API_KEY,
                max: 6
            };
            const response = await axios.get(url, { params });
            return response.data.articles.map(article => ({
                id: article.url,
                source: article.source.name,
                title: article.title,
                time: new Date(article.publishedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                url: article.url,
                sentiment: "Neutral"
            }));
        }

        return [
            {
                id: 1,
                source: "Reuters",
                title: "Global markets rally as inflation shows signs of cooling",
                time: "2h ago",
                sentiment: "Bullish",
                url: "#"
            },
            {
                id: 2,
                source: "Bloomberg",
                title: "Tech stocks face pressure ahead of earnings season",
                time: "4h ago",
                sentiment: "Bearish",
                url: "#"
            },
            {
                id: 3,
                source: "CNBC",
                title: "Fed signals potential rate cuts later this year",
                time: "5h ago",
                sentiment: "Bullish",
                url: "#"
            }
        ];

    } catch (error) {
        console.error("News API Error:", error.message);
        return [];
    }
};

module.exports = { fetchMarketNews };
