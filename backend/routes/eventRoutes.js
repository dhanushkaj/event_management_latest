/**
 * Created by udeshikaperera on 05/07/2015.
 */
var eventRoutes = require('express').Router();
var db= require('../mysqlModels/index');
var Event = db['Event'];
var EventType = db['EventType'];
var MemberEvent = db['MemberEvent'];

eventRoutes.route('/types/byInfulencer/:infuencerType')
  .get(function(req, res){
    EventType.findAll({where: {
      eventType:req.params.infuencerType
    }}).then(function(eventTypes, err) {
      if (err) res.status(404).send({message:"Error occurred while finding the Locations!"});
      res.json(eventTypes);
    });
  });
//Event Types route
eventRoutes.route('/types')
    .get(function(req, res){
        EventType.findAll().then(function(eventTypes, err) {
          if (err) res.status(404).send({message:"Error occurred while finding the Locations!"});
          res.json(eventTypes);
        });
    });

//Get Events for the ASO
eventRoutes.route('/byASO/:asoId')
  .get(function(req, res){
    Event.findAll({where: {
      asoId:req.params.asoId
    }}).then(function(event, err) {
      if (err) res.status(404).send({message:"Error occurred while finding the Event!"});
      res.json(event);
    });
  });



//Get All events
eventRoutes.route('/')
         .post(function(req, res){
        	 console.log(req.body.n1 + ' ===================> ');
 		     var eventDate = new Date(req.body.start);
             eventDate.setMinutes(eventDate.getMinutes() +330);

		    var data = {
		     id:req.body.id,
		     title : req.body.title,
	         code : req.body.code,
	         planed : req.body.planed,
	         location : req.body.location,
	         region : req.body.region,
	         areaId : req.body.areaId,
	         asoId : req.body.asoId,
	         asoCode : req.body.asoCode,
	         locBasedOwner : req.body.locBasedOwner,
	         budget : req.body.budget,
	         description : req.body.description,
	         influencerCode : req.body.influencerCode,
	         start : eventDate,
	         owner : req.body.owner,
	         n1:req.body.n1,
	         fh1:req.body.fh1,
	         h1:req.body.h1,
	         g1:req.body.g1,
	         vg1:req.body.vg1,
	         total1:req.body.total1,
	         comments1:req.body.comments1,
	         n2:req.body.n2,
	         fh2:req.body.fh2,
	         h2:req.body.h2,
	         g2:req.body.g2,
	         vg2:req.body.vg2,
	         total2:req.body.total2,
	         comments2:req.body.comments2,
	         n3:req.body.n3,
	         fh3:req.body.fh3,
	         h3:req.body.h3,
	         g3:req.body.g3,
	         vg3:req.body.vg3,
	         total3:req.body.total3,
	         comments3:req.body.comments3,
	         n4:req.body.n4,
	         fh4:req.body.fh4,
	         h4:req.body.h4,
	         g4:req.body.g4,
	         vg4:req.body.vg4,
	         total4:req.body.total4,
	         comments4:req.body.comments4,
	         n5:req.body.n5,
	         fh5:req.body.fh5,
	         h5:req.body.h5,
	         g5:req.body.g5,
	         vg5:req.body.vg5,
	         total5:req.body.total5,
	         comments5:req.body.comments5,
	         n6:req.body.n6,
	         fh6:req.body.fh6,
	         h6:req.body.h6,
	         g6:req.body.g6,
	         vg6:req.body.vg6,
	         total6:req.body.total6,
	         comments6:req.body.comments6,
	         noOfAnswered:req.body.noOfAnswered

		    };
		    if(data.id){
		      Event.update(data, {where: {id: data.id}})
		        .then(function (region) {
		        	Event.findOne({where: {
		            Id:data.id
		          }}).then(function(event, err) {
		            if (err) res.status(404).send({message:"Error occurred while finding the Event!"});
		            res.json(event);
		          });
		          //res.json(region)
		        })
		        .error(function (error) {
		          res.send(error);
		        });
		    }else{
		    	Event.create(data).then(function(region,err){
		        if(err) res.status(404).send({message:"Error occurred while saving the Event!"});
		        res.json(region);
		      });
		    }
       }).get(function(req, res){
            Event.findAll().then(function(events,err){
              if(err) res.send(err);
              res.json(events);
            });
        });

//Get a single event
eventRoutes.route('/:eventId')
        .get(function(req, res) {
            Event.findOne({where: {
              id:req.params.eventId
            }}).then(function(event, err) {
              if (err) res.status(404).send({message:"Error occurred while finding the Event!"});
              res.json(event);
            });
        })
        .put(function(req, res) {
            var eventDate = new Date(req.body.start);
            eventDate.setMinutes(eventDate.getMinutes() +330);

            Event.findById(req.params.eventId, function(err, event) {
                if (err)
                res.send(err);
                event.owner=req.body.owner;
                event.location=req.body.location;
                event.code=req.body.code;
                event.start=eventDate;
                event.description=req.body.description;
                event.name=req.body.name;
                event.title = req.body.title;
                event.influencerCode=req.body.influencerCode;
                event.budget=req.body.budget;
                event.location=req.body.location;

                event.save(function(err) {
                    if (err)
                        res.send(err);

                    res.json({ message: 'Event updated!' });
                });
            });
        })
        .delete(function(req,res){
        	Event.destroy({where:{id:req.params.eventId}}).then(function(row){

        		MemberEvent.destroy({where:{eventId:req.params.eventId}}).then(function(row){
        	 		      res.json(row);
        		});

		    });
		 });


module.exports = eventRoutes;
