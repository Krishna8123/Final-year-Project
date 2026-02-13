const Notification = require('../models/Notification');

const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .limit(50);
        res.json(notifications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

const markRead = async (req, res) => {
    try {
        await Notification.updateMany(
            { user: req.user.id, read: false },
            { $set: { read: true } }
        );
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

const createNotification = async (userId, type, title, message, metadata = {}) => {
    try {
        await Notification.create({
            user: userId,
            type,
            title,
            message,
            metadata
        });
    } catch (error) {
        console.error("Failed to create notification:", error);
    }
};

module.exports = { getNotifications, markRead, createNotification };
