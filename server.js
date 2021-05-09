
var express = require('express');
var cors = require('cors')
var app = express();
app.use(cors())
var http = require('http').Server(app);
var io = require('socket.io').listen(http);
var bodyParser = require('body-parser');
var port = process.env.PORT || 1337;

// Express Middleware for serving static
// files and parsing the request body
app.use(express.static('public'));
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: true }));
// create application/json parser
app.use(bodyParser.json());

//Controllers
var auctionController = require('./Controller/AuctionController')();
app.use("/api/auctions", auctionController);

var biddingController = require('./Controller/BiddingController')();
app.use("/api/bidding", biddingController);

var settingsController = require('./Controller/SettingsController')();
app.use('/api/settings', settingsController);

app.listen(port, function () {
    var datetime = new Date();
    var message = "Server runnning on Port:- " + port + "Started at :- " + datetime;
    console.log(message);
});


// Socket Connection
// UI Stuff
io.on('connection', function (socket) {
    // Fire 'update_bidding' for updating Biddings in UI
    socket.on('add_bidding', function (data) {
        io.emit('update_bidding', data);
    });

});

