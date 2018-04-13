// app/models/tweet.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var tweetSchema = new Schema({
    userName: String,
    text: String,
    date: Number,
    geolocalisation: String
});

module.exports = mongoose.model('Tweet', tweetSchema);
