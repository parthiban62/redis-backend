
var express = require('express');
var app = express();
app.use(cors())
var port = process.env.PORT || 1337;

var bodyParser = require('body-parser');
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: true }));
// create application/json parser
app.use(bodyParser.json());

var auctionController = require('./Controller/AuctionController')();
app.use("/api/auctions", auctionController);

var biddingController = require('./Controller/BiddingController')();
app.use("/api/bidding", biddingController);

//var userController = require('./Controller/UserController')();
//app.use('/api/user',userController);

app.listen(port, function () {
    var datetime = new Date();
    var message = "Server runnning on Port:- " + port + "Started at :- " + datetime;
    console.log(message);
});

