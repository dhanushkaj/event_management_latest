/**
 * Created by udeshikaperera on 26/09/2015.
 */
var locationsRoutes = require('express').Router();
var db= require('../mysqlModels/index');
var Region = db['Region'];
var Area = db['Area'];
var Location = db['Location'];

locationsRoutes.route('/regions/')
  .get(function(req, res){
    Region.findAll().then(function(regions,err){
      if(err) res.send(err);
      res.json(regions);
    });
  }).post(function(req, res){
    var data = {
      id:req.body.id,
      regionCode : req.body.regionCode ,
      regionName : req.body.regionName
    };
    if(data.id){
      Region.update(data, {where: {id: data.id}})
        .then(function (region) {
          Region.findOne({where: {
            Id:data.id
          }}).then(function(region, err) {
            if (err) res.status(404).send({message:"Error occurred while finding the Region!"});
            res.json(region);
          });
          //res.json(region)
        })
        .error(function (error) {
          res.send(error);
        });
    }else{
      Region.create(data).then(function(region,err){
        if(err) res.status(404).send({message:"Error occurred while saving the Region!"});
        res.json(region);
      });
    }
  });

//Get a single Region
locationsRoutes.route('/regions/:regionId')
  .get(function(req, res) {
    Region.findOne({where: {
      Id:req.params.regionId
    }}).then(function(region, err) {
      if (err) res.status(404).send({message:"Error occurred while finding the Region!"});
      res.json(region);
    });
  })
  .delete(function(req,res){
    Region.destroy({where:{id:req.params.regionId}}).then(function(row){
      res.json(row);
    });
  });

//Get Area List
locationsRoutes.route('/areas/')
  .get(function(req, res){
    Area.findAll({ order: 'RegionId,areaName asc'}).then(function(areas,err){
      if(err) res.send(err);
      res.json(areas);
    });
  }).post(function(req, res){
    var data = {
      id:req.body.id,
      areaCode : req.body.areaCode,
      areaName : req.body.areaName,
      RegionId : req.body.RegionId
    };
    if(data.id){
      Area.update(data, {where: {id: data.id}})
        .then(function (area) {
          Area.findOne({where: {
            Id:data.id
          }}).then(function(area, err) {
            if (err) res.status(404).send({message:"Error occurred while finding the Region!"});
            res.json(area);
          });
        })
        .error(function (error) {
          res.send(error);
        });
    }else{
      Area.create(data).then(function(region,err){
        if(err) res.status(404).send({message:"Error occurred while saving the Area!"});
        res.json(region);
      });
    }
  });

//Get a single Area
locationsRoutes.route('/areas/:areaId')
  .get(function(req, res) {
    Area.findOne({where: {
      Id:req.params.areaId
    }}).then(function(area, err) {
      if (err) res.status(404).send({message:"Error occurred while finding the Area!"});
      res.json(area);
    });
  })
  .delete(function(req,res){
    Area.destroy({where:{id:req.params.areaId}}).then(function(row){
      res.json(row);
    });
  });

//Get a single Area
locationsRoutes.route('/areas/byRegion/:regionId')
  .get(function(req, res) {
    Area.findAll({where: {
      RegionId:req.params.regionId
    }}).then(function(area, err) {
      if (err) res.status(404).send({message:"Error occurred while finding the Area!"});
      res.json(area);
    });
  });


//Get a single Area
locationsRoutes.route('/areas/locations/')
  .post(function(req, res){
    var data = {
      id:req.body.id,
      locationCode : req.body.locationCode ,
      locationName : req.body.locationName,
      AreaId : req.body.areaId
    };
    if(data.id){
      Location.update(data, {where: {id: data.id}})
        .then(function (location) {
          res.send(location)
        })
        .error(function (error) {
          res.send(error);
        });
    }else{
      Location.create(data).then(function(location,err){
        if(err) res.status(404).send({message:"Error occurred while saving the Location!"});
        res.json(location);
      });
    }
  });

locationsRoutes.route('/areas/locations/byArea/')
  .get(function(req, res){
    Location.findAll().then(function(locations, err) {
      if (err) res.status(404).send({message:"Error occurred while finding the Locations!"});
      res.json(locations);
    });
  });

//Get a Locations single Area
locationsRoutes.route('/areas/locations/byArea/:areaId')
  .get(function(req, res){
    Location.findAll({where: {
      AreaId:req.params.areaId
    }}).then(function(locations, err) {
      if (err) res.status(404).send({message:"Error occurred while finding the Locations!"});
      res.json(locations);
    });
  });

//Area by ASO
locationsRoutes.route('/areas/byASO/:asoId')
  .get(function(req,res){
    Area.findOne({where: {
      asoId:req.params.asoId
    }}).then(function(area, err) {
      if (err) res.status(404).send({message:"Error occurred while finding the Area!"});
        res.json(area);
    });
  });

locationsRoutes.route('/areas/locations/:locationId')
.get(function(req, res){
  Location.findAll({where: {
    id:req.params.locationId
  }}).then(function(location, err) {
    if (err) res.status(404).send({message:"Error occurred while finding the Location!"});
    res.json(location);
  });
}).delete(function(req,res){
	Location.destroy({where:{id:req.params.locationId}}).then(function(row){
        res.json(row);
      });
    });


module.exports = locationsRoutes;


