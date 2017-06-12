/**
 * Created by udeshikaperera on 26/09/2015.
 */
var asoOrsmRoutes = require('express').Router();
var db= require('../mysqlModels/index');
var RSM = db['RSM'],
    ASO = db['ASO'],
    Area = db['Area'];

asoOrsmRoutes.route('/rsms')
  .get(function(req, res){
    RSM.findAll({order:'RegionId asc'}).then(function(rsms,err){
      if(err) res.send(err);
      res.json(rsms);
    });
  }).post(function(req, res){
    var data ={
      id : req.body.id,
      rsmCode : req.body.rsmCode ,
      rsmName : req.body.rsmName,
      mobileNo : req.body.mobileNo,
      RegionId : req.body.RegionId,
      regionName : req.body.regionName,
      email : req.body.email
    };
    if(data.id){
      RSM.update(data, {where:{id: data.id }})
        .then(function(rsm){
          RSM.findOne({where: {
            Id:req.params.rsmId
          }}).then(function(rsm, err) {
            if (err) res.status(404).send({message:"Error occurred while finding the RSM!"});
            res.json(rsm);
          });
        })
        .error(function(error){
          res.send(error);
        })
    }else{
      RSM.create(data).then(function(rsm,err){
        if(err) res.status(404).send({message:"Error occurred while creating the RSM!"});

        res.json(rsm);
      });
    }
  });

//Get a single rsm
asoOrsmRoutes.route('/rsms/:rsmId')
  .get(function(req, res) {
    RSM.findOne({where: {
      Id:req.params.rsmId
    }}).then(function(rsm, err) {
      if (err) res.status(404).send({message:"Error occurred while finding the RSM!"});
      res.json(rsm);
    });
  })
  .delete(function(req,res){
    RSM.destroy({where:{id:req.params.rsmId}}).then(function(row){
      res.json(row);
    });
  });

//Get ASO List
asoOrsmRoutes.route('/asos')
  .get(function(req, res){
    ASO.findAll({order:'RegionId,areaId asc'}).then(function(rsms,err){
      if(err) res.send(err);
      res.json(rsms);
    });
  }).post(function(req, res){
    var data = {
      id: req.body.id,
      asoCode : req.body.asoCode ,
      asoName : req.body.asoName,
      mobileNo : req.body.mobileNo,
      RegionId : req.body.RegionId,
      AreaId : req.body.AreaId,
      email : req.body.email
    };
    if(data.id) {
      ASO.update(data, {where: {id: data.id}})
        .then(function (aso) {
          ASO.findOne({where: {
            Id:req.params.rsmId
          }}).then(function(aso, err) {
            if (err) res.status(404).send({message:"Error occurred while finding the RSM!"});
            res.json(aso);
          });
        })
        .error(function (error) {
          res.send(error);
        });
    }else{
      ASO.create(data).then(function(aso,err){
        if(err) res.status(404).send({message:"Error occurred while creating the ASO!"});
        Area.update({'asoId':aso.id},{where:{id:data.AreaId}})
        res.json(aso);
      });
    }
  });

//Get a single ASO
asoOrsmRoutes.route('/asos/:asoId')
  .get(function(req, res) {
    ASO.findOne({where: {
      Id:req.params.asoId
    }}).then(function(aso, err) {
      if (err) res.status(404).send({message:"Error occurred while finding the ASO!"});
      res.json(aso);
    });
  })
  .delete(function(req,res){
    ASO.destroy({where:{id:req.params.asoId}}).then(function(row){
      res.json(row);
    });
  });

module.exports = asoOrsmRoutes;
//dhanushka
