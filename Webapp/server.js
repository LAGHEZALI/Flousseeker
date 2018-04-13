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

// on routes that end in /tweets/old/:days
// ----------------------------------------------------
router.route('/tweets/old/:days')
    // get the
    .get(function(req, res) {
        var temp = 86400;
        var currentDate = new Date();
        var currentTime = Date.now();
        console.log("Days : " + req.params.days + "\n Current date : " + currentTime);
        Tweet.find({ Date: { $gt: currentDate - req.params.days * temp } }, function(err, tweets) {
            if (err)
                res.send(err);
            res.json(tweets);
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
                    pos: [12, 54, 24, 73, 65, 82, 26, 36, 92, 85, 81, 60, 98, 8, 21, 8, 45, 90, 84, 12, 54, 32, 90, 74],
                    neg: [87, 51, 9, 83, 33, 59, 69, 75, 98, 59, 7, 52, 29, 79, 78, 16, 56, 56, 92, 70, 14, 26, 35, 79]
                });
            } else if (req.params.delay === 'week') {
                res.json({
                    xAxis: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                    pos: [36, 92, 85, 81, 60, 12, 54],
                    neg: [33, 59, 69, 75, 7, 29, 14]
                });

            } else if (req.params.delay === 'month') {
                res.json({
                    xAxis: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15',
                        '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'
                    ],
                    pos: [12, 54, 24, 73, 65, 82, 26, 36, 92, 85, 81, 60, 98, 8, 21, 8, 45, 90, 84, 12, 54, 32, 90, 74, 12, 54, 24, 73, 65, 82],
                    neg: [87, 51, 9, 83, 33, 59, 69, 75, 98, 59, 7, 52, 29, 79, 78, 16, 56, 56, 92, 70, 14, 26, 35, 79, 59, 7, 52, 79, 78, 16]
                });
            }
        } else if (req.params.name === 'bitcoin') {
            if (req.params.delay === 'day') {
                res.json({
                    xAxis: ['1H', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', '11H', '12H', '13H', '14H', '15H',
                        '16H', '17H', '18H', '19H', '20H', '21H', '22H', '23H', '24H'
                    ],
                    values: [
                        8703.12, 9884.11, 8978.22, 7898.15, 8127.54, 9888.12, 7895.54, 8451.12, 9322.13, 7848.65, 7879.65, 8987.50,
                        8795.45, 9993.16, 8997.45, 7895.67, 7659.56, 8545.45, 8135.45, 9876.75, 8498.34, 9853.14, 7851.64, 7865.45
                    ]
                });
            } else if (req.params.delay === 'week') {
                res.json({
                    xAxis: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                    values: [9888.12, 7895.54, 8451.12, 9322.22, 7848.65, 7879.65, 8987.50]
                });

            } else if (req.params.delay === 'month') {
                res.json({
                    xAxis: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15',
                        '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'
                    ],
                    values: [
                        9993.16, 8997.45, 7895.67, 7659.56, 8545.45,
                        8978.22, 7898.15, 8127.54, 9888.12, 7895.54,
                        9888.12, 7895.54, 8451.12, 9322.13, 7848.65,
                        8498.34, 9853.14, 7851.64, 7865.45, 8984.45,
                        8795.45, 9993.16, 8997.45, 7895.67, 7659.56,
                        7659.56, 8545.45, 8135.45, 9876.75, 8498.34
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
        res.json({ value: 8932.60 });
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

var tweetUsert;
var tweetText;
var tweetTime;
var tweetGeo;

//  TWEET CONSUMER
tweetConsumer.on('message', function(tweet) {

    var obj = JSON.parse(tweet.value);


    //tweetUsert    = obj.username;
    //tweetText     = obj.text;
    //tweetDate     = tweetArray[2];
    tweetGeoLabel = obj.geolocalisation.label;
    tweetGeoLat = obj.geolocalisation.lat;
    tweetGeoLng = obj.geolocalisation.lng;

    tweetPing.push(tweetGeoLat);
    tweetPing.push(tweetGeoLng);

    console.log("=== NEW TWEET FROM  ===> " + tweetGeoLabel + " ( lat: " + tweetGeoLat + " , lng: " + tweetGeoLng + " ) ");
});



//  BITCOIN REAL TIME CONSUMER
btcConsumer.on('message', function(message) {
    console.log("=== BITCOIN NEW VALUE ===> " + message.value.value + " USD");
    io.sockets.emit('rtbtc', { msg: message.value.value });
    rtbtc = message.value.value;
});

setInterval(function() {
    tweetPing = new Array();
    //console.log("=== CLEAR TWEET PING TEMP ARRAY ===");
}, 2000);

// MONGO DB IMPORTANCE EACH 1M
// =============================================================================


setInterval(function() {
    clientMongo.connect(urlMongo, function(err, db) {
        if (err) throw err;
        var dbo = db.db("flousseeker");
        dbo.collection("importances").find({}).toArray(function(err, result) {
            if (err) throw err;

            importance = [];

            let now = new Date();
            importance.push("webGL-data");

            result.forEach(function(impo) {
                importanceData.push(impo.geolocalisation.lat);
                importanceData.push(impo.geolocalisation.lng);
                importanceData.push(impo.prc * 30);
            });

            importance.push(importanceData);

            db.close();

            console.log("=== TWEET IMPORTANCE UPDATED ===");
        });
    });
}, 60000);

// START THE SERVER
// =============================================================================
server.listen(port);
console.log('Magic happens on port ' + port);