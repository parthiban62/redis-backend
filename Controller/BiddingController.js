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

    return router;
};
module.exports = routes;