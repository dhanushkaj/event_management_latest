/**
 * Created by udeshikaperera on 16/07/2015.
 */
var districtLocationRoutes = require('express').Router();
var DistrictLocation= require('../models/DistrictLocation');


districtLocationRoutes.route('/districtLocations')
    .get(function(req,res){
    	DistrictLocation.find(function(err, districtLocation) {
            if (err)
                res.send(err);
            res.json(districtLocation);
        })
    }
);
 

districtLocationRoutes.route('/districtLocations/:locationId')
.get(function(req, res) {
	DistrictLocation.findById(req.params.locationId, function(err, districtLocation) {
        if (err)
            res.send(err);
        res.json(districtLocation);
    });
}).put(function(req, res) {
	DistrictLocation.findById(req.params.locationId, function(err, districtLocation) {
        if (err)
            res.send(err);
        districtLocation.asocode=req.body.asocode;
        districtLocation.region=req.body.region;
        districtLocation.location=req.body.location;
         
        districtLocation.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Location is updated!' });
        });
    });
}).post(function(req, res){
	
   var newLocation = new DistrictLocation(req.body);
 
   DistrictLocation.find({location:newLocation.location,region:newLocation.region,asocode:newLocation.asocode}, function(err, districtLocation) {
        if (err)
        res.send(err);
 
        if(districtLocation.length){
        	res.send({message: "Location is already exists"});
        }else{
        	 
        	newLocation.save(function(err){
	            if(err){
	                res.send(err);
	            }else{
	                res.send({message: "Location Added Successfully"});
	            }
	        });
       }
        
    });

}).delete(function(req, res) {
	DistrictLocation.remove({
        _id: req.params.locationId
    }, function (err, bear) {
        if (err)
            res.send(err);

        res.json({message: 'Successfully deleted'});
    });
});


module.exports = districtLocationRoutes;