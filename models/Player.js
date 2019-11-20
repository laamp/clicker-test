const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        min: 0,
        default: 0
    },
    businesses: [{
        type: Number,
        min: 0,
        default: 0
    }],
    managers: [{
        type: Boolean,
        default: false
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Player = mongoose.model('players', PlayerSchema);