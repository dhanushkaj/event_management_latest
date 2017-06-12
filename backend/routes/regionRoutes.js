/**
 * Created by udeshikaperera on 16/07/2015.
 */
var regionRoutes = require('express').Router();
var Region= require('../models/Region');


regionRoutes.route('/')
    .get(function(req,res){
        Region.find(function(err, events) {
            if (err)
                res.send(err);
            res.json(events);
        })
    }
);

module.exports = regionRoutes;