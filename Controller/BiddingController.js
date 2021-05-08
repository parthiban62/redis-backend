const { json } = require('body-parser');
var express = require('express');
var router = express.Router();
var client = require("../connection/connect")();

client.on('connect', () => {
    console.log("connected to redis");
})

var routes = function () {
    
    //GET all biddings - api/auctions
    router.route('/')
        .get(function (req, res) {
            try{
                client.lrange("Biddings",0,-1,function(err,biddings){ 
                    if(biddings){
                        return res.status(200).send({
                            error:false,
                            message : "Biddings data fetched",
                            data : biddings
                        })
                    }
                    else{
                        return res.status(500).send({
                            error:true,
                            message:"Unable to fetch data"
                        })
                    }
                })
            }
            catch(error){
                return res.status(500).send({
                    error:true,
                    message:"Unable to fetch data"
                })
            }                    
        });

        router.route('/')
        .post(function (req, res) {
            try{
                var auctionData = "";
                var auctionId = "";
                var jsonBody = req.body;
                var currentBid = jsonBody.bidAmount;
                jsonBody.bidTime = Date.now();
                console.log(Date.now());
                client.lpush("Biddings",JSON.stringify(jsonBody),function(err,biddings){ 
                    if(biddings){
                        client.hmget("Auctions", jsonBody.auctionId, function(err,auctions){ 
                            if(auctions){
                                auctionData = JSON.parse(auctions);
                                //auctionData = JSON.parse(jsonBody);
                                //console.log(auctionData.auctionId);
                                //console.log(jsonBody);
                                
                                auctionData.currentBidAmount = currentBid;
                                //console.log(auctionData.currentBidAmount);
                                auctionId = auctionData.auctionId;
                                //console.log(auctionData);
                                                               
                            }
                            client.hmset("Auctions", auctionId, JSON.stringify(auctionData), function(err,result){
                            })
                            return res.status(200).send({
                                error:false,
                                message : "Biddings data fetched",
                                data : biddings
                            })
                        })
                    }
                    else{
                        return res.status(500).send({
                            error:true,
                            message:"Unable to fetch data"
                        })
                    }
                })
            }
            catch(error){
                return res.status(500).send({
                    error:true,
                    message:"Unable to fetch data"
                })
            }                    
        });

    return router;
};
module.exports = routes;