// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var clientMongo = require('mongodb').MongoClient;
const kafka = require('kafka-node');
//let date = require('date-and-time');

const path = require('path');
const geocoder = require('geocoder');

var server = require('http').Server(app);
const io = require('socket.io')(server);

var request = require('request');

var rtbtc = 0.0;
var urlMongo = "mongodb://localhost:27017/";
var tweetPing = [];
var importance = [];
var importanceData = [];

var config = require('./config'); // get our config file

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist')));

var Tweet = require('./node-app/models/tweet');

mongoose.connect(config.database);
var port = process.env.PORT || 8085; // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

router.get('/', function(req, res) {
    res.json({ success: true, message: 'hooray! welcome to our api!' });
});

// on routes that end in /tweets
// ----------------------------------------------------
router.route('/tweets')
    // get all the tweets
    .get(function(req, res) {
        Tweet.find(function(err, tweets) {
            if (err)
                res.send(err);
            res.json(tweets);
        });
    })
    .post(function(req, res) {
        var tweet = new Tweet();
        tweet.userName = req.body.userName;
        tweet.text = req.body.text;
        tweet.date = req.body.date;
        tweet.geolocalisation = req.body.geolocalisation;

        tweet.save(function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ success: true, message: 'Tweet created !' });
        });
    });

// chart
// ----------------------------------------------------
router.route('/charts/:name/:delay')
    .get(function(req, res) {
        //  sentiment analysis
        if (req.params.name === 'sentiment') {
            if (req.params.delay === 'day') {
                res.json({
                    xAxis: ['1H', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', '11H', '12H', '13H', '14H', '15H',
                        '16H', '17H', '18H', '19H', '20H', '21H', '22H', '23H', '24H'
                    ],
                    pos: [52.6, 54, 51, 56, 65, 54, 50, 53, 49, 48, 58, 55, 56, 59, 60, 54, 54, 58, 62, 61, 59, 55, 57, 56],
                    neg: [47.4, 46, 49, 44, 35, 46, 50, 47, 51, 52, 42, 45, 44, 41, 40, 46, 44, 42, 38, 39, 41, 45, 43, 44]
                });
            } else if (req.params.delay === 'week') {
                res.json({
                    xAxis: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                    pos: [58, 55, 56, 59, 60, 54, 54],
                    neg: [42, 45, 44, 41, 40, 46, 46]
                });

            } else if (req.params.delay === 'month') {
                res.json({
                    xAxis: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15',
                        '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'
                    ],
                    pos: [60, 54, 54, 58, 62, 61, 59, 55, 57, 56, 52.6, 54, 51, 56, 54, 50, 53, 49, 48, 58, 55, 56, 59, 58, 55, 56, 59, 60, 54, 54],
                    neg: [40, 46, 44, 42, 38, 39, 41, 45, 43, 44, 47.4, 46, 49, 44, 46, 50, 47, 51, 52, 42, 45, 44, 41, 42, 45, 44, 41, 40, 46, 46]
                });
            }
        } else if (req.params.name === 'bitcoin') {
            if (req.params.delay === 'day') {
                res.json({
                    xAxis: ['1H', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', '11H', '12H', '13H', '14H', '15H',
                        '16H', '17H', '18H', '19H', '20H', '21H', '22H', '23H', '24H'
                    ],
                    values: [
                        8003.68, 8065.87, 8105.73, 8089.86, 8083.57, 8105.12, 8123.68,8116.95,8082.27,8125.66,8113.91,8119.19,8333.56,8339.72,8347.17,
                        8336.63,8278.86,8277.76,8289.90,8321.98,8305.01,8289.76,8303.89,8345.51,8355.92
                    ]
                });
            } else if (req.params.delay === 'week') {
                res.json({
                    xAxis: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                    values: [7065.80,6765.07,6848.28,6925.34,7891.92,7912.84,8066.29]
                });

            } else if (req.params.delay === 'month') {
                res.json({
                    xAxis: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15',
                        '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'
                    ],
                    values: [
                        8196.02,8594.19,8915.9,8895.4,8712.89,
                        8918.74,8535.89,8449.83,8138.34,7790.16,
                        7937.2,7086.49,6844.32,6926.02,6816.74,
                        7049.79,7417.89,6789.3,6774.75,6620.41,
                        6896.28,7022.71,6773.94,6830.9,6939.55,
                        7916.37,7889.23,8003.68,8357.04,8104.82

                    ]
                });
            }
        }
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be  prefixed with /api
app.use('/api', router);

// on routes that end in /rtbtc
// ----------------------------------------------------
router.route('/rtbtc')
    // get the tweet with that id
    .get(function(req, res) {
        res.json({ value: rtbtc });
    });

// on routes that end in /rttweet
// ----------------------------------------------------
router.route('/rttweet')
    // get the tweet with that id
    .get(function(req, res) {
        res.json(tweetPing);
    });


// on routes that end in /importance
// ----------------------------------------------------
router.route('/importance')
    .get(function(req, res) {
        res.json(importance);
    });

// on routes that end in /sentiment-chart-data
// ----------------------------------------------------
router.route('/sentiment-chart-data')
    .get(function(req, res) {
        res.json([1, 2, 3, 4, 5, 4, 3, 2, 1]);
    });


// on routes that end in //currencies/:currency/:value
// ----------------------------------------------------
router.route('/currencies/:currency/:value')
    .get(function(req, res) {
        var currency = req.params.currency;
        var value = req.params.value;
        request('https://api.coindesk.com/v1/bpi/currentprice/' + currency + '.json', function(error, response, body) {
            var result = JSON.parse(body);
            if (currency === 'MAD')
                res.json({ value: result.bpi.MAD.rate_float * value });
            else if (currency === 'USD')
                res.json({ value: result.bpi.USD.rate_float });
            else if (currency === 'AUD')
                res.json({ value: result.bpi.AUD.rate_float });
            else if (currency === 'GBP')
                res.json({ value: result.bpi.GBP.rate_float });
            else if (currency === 'CNY')
                res.json({ value: result.bpi.CNY.rate_float });
            else if (currency === 'EUR')
                res.json({ value: result.bpi.EUR.rate_float });
            else if (currency === 'INR')
                res.json({ value: result.bpi.INR.rate_float });
            else if (currency === 'JPY')
                res.json({ value: result.bpi.JPY.rate_float });
            else if (currency === 'RUB')
                res.json({ value: result.bpi.RUB.rate_float });
            else res.json({ value: 0.0 })
        });
    });

//	Redirect everything to angular App
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// ============================================================================
//  Kafka Consumer rtbtc

const Consumer = kafka.Consumer;
const btcClient = new kafka.Client();
const tweetClient = new kafka.Client();
const btcConsumer = new Consumer(
    btcClient, [
        { topic: 'rtbtc', partition: 0 }
    ], {
        autoCommit: false
    }
);
const tweetConsumer = new Consumer(
    tweetClient, [
        { topic: 'tweet-streaming', partition: 0 }
    ], {
        autoCommit: false
    }
);

//  TWEET CONSUMER
tweetConsumer.on('message', function(tweet) {

    var obj = JSON.parse(tweet.value);

    tweetGeoLat = obj.geolocalisation.lat;
    tweetGeoLng = obj.geolocalisation.lng;

    tweetPing.push(tweetGeoLat);
    tweetPing.push(tweetGeoLng);

    //console.log("=== NEW TWEET FROM  ===> " + tweetGeoLabel + " ( lat: " + tweetGeoLat + " , lng: " + tweetGeoLng + " ) ");
});

//  BITCOIN REAL TIME CONSUMER
btcConsumer.on('message', function(btc) {

    var obj2 = JSON.parse(btc.value);

    io.sockets.emit('rtbtc', { msg: obj2.value });
    rtbtc = obj2.value;

    //console.log("=== BITCOIN NEW VALUE ===> " + obj2.value + " USD");
});

setInterval(function() {
    tweetPing = new Array();
    //console.log("=== CLEAR TWEET PING TEMP ARRAY ===");
}, 2000);

// MONGO DB IMPORTANCE EACH 1M
// =============================================================================

function impoUpdate() {
    clientMongo.connect(urlMongo, function(err, db) {
        if (err) throw err;
        var dbo = db.db("flousseeker");
        dbo.collection("Importances").find({}).toArray(function(err, result) {
            if (err) throw err;

            importance = [];

            let now = new Date();
            importance.push("webGL-data");

            result.forEach(function(impo) {
                importanceData.push(impo.geolocalisation.lat);
                importanceData.push(impo.geolocalisation.lng);
                importanceData.push(impo.prc*20);
            });

            importance.push(importanceData);

            db.close();

            //console.log("=== TWEET IMPORTANCE UPDATED ===");
        });
    });
}

impoUpdate();

setInterval(function() {
    impoUpdate();
}, 60000);

// START THE SERVER
// =============================================================================
server.listen(port);
console.log('Magic happens on port ' + port);