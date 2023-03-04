
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

})

const User = mongoose.model('User', userSchema)

const tradeAndWatchlistSchema = new mongoose.Schema({
    openTrades: { type: Array },
    watchList: { type: Array },
    user: { type: mongoose.Schema.Types.ObjectId, ref: User },
})
const tradeAndWatchlist = mongoose.model('trades_and_watchlist', tradeAndWatchlistSchema)

const userModel = { User, tradeAndWatchlist }

module.exports = userModel