const { json } = require('body-parser');
var express = require('express');
var router = express.Router();
var client = require("../connection/connect")();

client.on('connect', () => {
    console.log("connected to redis");
})

var routes = function () {
    
    //GET all auctions - api/auctions
    router.route('/')
        .get(function (req, res) {
            client.hgetall("Auctions",function(err,obj){
                res.status(200).send(obj);
            });            
        });
    
    //GET data of a particular auction - api/auctions/:id
    router.route('/:id')
        .get(function (req, res) {
            client.hmget("Auctions", req.params.id, function(err,obj){
                res.status(200).send(obj);
            });            
        });
    
    //POST create new auction - api/auctions
    router.route('/')
        .post(function (req, res) {
            id = 10000;
            //jsonBody = "{   \"auctionId\" : 10019,   \"auctionItemName\" : \"Porcher Sink - 17.5x 14\",   \"description\" : \"\",   \"lotNo\" : 2,   \"quantity\" : 1,   \"buyersPremium\" : 15,   \"itemUnit\" : 1,   \"minBidAmount\" : 50.00,   \"bidIncrement\" : 10.00,   \"startDateTime\" : \"05-05-2021 00:00:00\",   \"endDateTime\" : \"10-05-2021 11:59:59\",   \"category\" : \"May 2021\",   \"images\" : [\"https://image/test1.jpg\",\"https://image/test.jpg\",\"https://image/test3.jpg\"] }";
            jsonBody = req.body.auctionId;
            client.hmset("Auctions", id, jsonBody, function(err,obj){
                res.status(200).send(obj);
                });        
            
        });


    router.route('/:id')
        .put(function (req, res) {
            
                            res.status(200).send("put");
                        
        });        

    return router;
};
module.exports = routes;