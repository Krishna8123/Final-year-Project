const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['SYSTEM', 'PRICE_ALERT', 'ORDER', 'NEWS'],
        default: 'SYSTEM'
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        default: false
    },
    metadata: {
        type: Map,
        of: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Notification', NotificationSchema);
