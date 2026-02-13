const axios = require('axios');
const WebSocket = require('ws');

let io;
let cryptoSocket;

const initRealtimeService = (socketIoInstance) => {
    io = socketIoInstance;
    console.log("Realtime Service Initialized");

    startCryptoStream();
    startTickerInterval();
};

const startCryptoStream = () => {
    const assets = 'bitcoin,ethereum,solana,binance-coin,ripple';
    const wsUrl = `wss://ws.coincap.io/prices?assets=${assets}`;

    cryptoSocket = new WebSocket(wsUrl);

    cryptoSocket.on('open', () => {
        console.log('Connected to CoinCap WebSocket');
    });

    cryptoSocket.on('message', (data) => {
        try {
            const prices = JSON.parse(data);
            if (io) {
                io.to('ticker').emit('cryptoUpdate', prices);
            }
        } catch (error) {
            console.error("WS Parse Error", error);
        }
    });

    cryptoSocket.on('close', () => {
        console.log('CoinCap WS Closed, reconnecting in 5s...');
        setTimeout(startCryptoStream, 5000);
    });

    cryptoSocket.on('error', (err) => {
        console.error('CoinCap WS Error:', err.message);
    });
};

const startTickerInterval = () => {
    setInterval(() => {
        if (!io) return;

        const domesticIndices = [
            { name: "NIFTY", value: (22500 + Math.random() * 50 - 25).toFixed(2), change: "+0.5%" },
            { name: "SENSEX", value: (74200 + Math.random() * 100 - 50).toFixed(2), change: "+0.4%" },
            { name: "BANKNIFTY", value: (48000 + Math.random() * 80 - 40).toFixed(2), change: "-0.2%" },
            { name: "INDIA VIX", value: (13.5 + Math.random() * 0.2 - 0.1).toFixed(2), change: "-1.5%" }
        ];

        io.to('ticker').emit('indexUpdate', domesticIndices);
    }, 5000);
};

module.exports = { initRealtimeService };
