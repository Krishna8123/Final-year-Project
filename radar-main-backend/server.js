const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');
const connectDB = require('./src/config/db');
require('dotenv').config();

connectDB();

const { getMarketData } = require('./src/controllers/marketController');
const { getHistory } = require('./src/controllers/historyController');
const { registerUser, loginUser, getUserProfile, updateMode } = require('./src/controllers/userController');
const { getWatchlist, addToWatchlist, removeFromWatchlist } = require('./src/controllers/watchlistController');
const { getOrderBook } = require('./src/controllers/depthController');
const { getStatus } = require('./src/controllers/statusController');
const { getMarketNews } = require('./src/controllers/newsController');
const { getPortfolio, executeTrade } = require('./src/controllers/portfolioController');
const { getNotifications, markRead } = require('./src/controllers/notificationController');
const { getMarketIndices, getLatency } = require('./src/controllers/tickerController');
const { getPreMarketPulse, getSectorHeatmap } = require('./src/controllers/analyticsController');
const { getWatchlistData, getBreakoutAlerts, getIndicatorSignals, getQuickOrderData } = require('./src/controllers/technicalController');
const { getDashboardData } = require('./src/controllers/fnoController');
const { getValuationThermometer, getInvestmentIdeas, getPeerComparison, getMarketMoodIndex } = require('./src/controllers/fundamentalController');
const { getCorporateActions } = require('./src/controllers/calendarController');
const { getEarningsSummary } = require('./src/controllers/earningsController');
const { authMiddleware } = require('./src/middleware/authMiddleware');
const { initRealtimeService } = require('./src/services/realtimeService');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    socket.join('ticker');
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

initRealtimeService(io);

app.get('/', (req, res) => {
    res.send('Radar Backend is Online');
});


app.post('/api/auth/register', registerUser);
app.post('/api/auth/login', loginUser);
const { googleAuth } = require('./src/controllers/userController');
app.post('/api/auth/google', googleAuth);


app.get('/api/user/profile', authMiddleware, getUserProfile);
app.patch('/api/user/mode', authMiddleware, updateMode);


app.get('/api/market', getMarketData);
app.get('/api/history', getHistory);
app.get('/api/depth', getOrderBook);
app.get('/api/status', getStatus);
app.get('/api/news', getMarketNews);

app.get('/api/notifications', authMiddleware, getNotifications);
app.post('/api/notifications/read', authMiddleware, markRead);

app.get('/api/ticker/indices', getMarketIndices);
app.get('/api/ticker/latency', getLatency);

app.get('/api/analytics/pulse', authMiddleware, getPreMarketPulse);
app.get('/api/analytics/heatmap', authMiddleware, getSectorHeatmap);
app.get('/api/technical/watchlist', authMiddleware, getWatchlistData);
app.get('/api/technical/alerts', authMiddleware, getBreakoutAlerts);
app.get('/api/technical/signals', authMiddleware, getIndicatorSignals);
app.get('/api/technical/depth/:symbol', authMiddleware, getQuickOrderData);

app.get('/api/fno/dashboard', authMiddleware, getDashboardData);

app.get('/api/fundamental/valuation', authMiddleware, getValuationThermometer);
app.get('/api/fundamental/ideas', authMiddleware, getInvestmentIdeas);
app.get('/api/fundamental/peers/:symbol', authMiddleware, getPeerComparison);
app.get('/api/fundamental/mood', authMiddleware, getMarketMoodIndex);
app.get('/api/calendar/actions', authMiddleware, getCorporateActions);
app.get('/api/earnings/summary', authMiddleware, getEarningsSummary);


app.get('/api/watchlist', authMiddleware, getWatchlist);
app.post('/api/watchlist', authMiddleware, addToWatchlist);
app.delete('/api/watchlist/:symbol', authMiddleware, removeFromWatchlist);


app.get('/api/portfolio', authMiddleware, getPortfolio);
app.post('/api/portfolio/trade', authMiddleware, executeTrade);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});