const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    pair_name: { type: String, required: true, unique: true },
    news: { type: Array, required: true }
})

const News = mongoose.model('New', newsSchema)
module.exports = News
