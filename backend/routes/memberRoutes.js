/**
 * Created by udeshikaperera on 16/07/2015.
 */
var memberRoutes = require('express').Router();

var fs = require('fs');
var formidable = require('formidable');
//New
var db= require('../mysqlModels/index');
var InfluencerType = db['InfluencerType'],
    Influencer = db['Influencer'],
    MemberEvent = db['MemberEvent'],
    InfluencerMoreInfo = db['InfluencerMoreInfo'],
    moment = require('moment');

//New Routes

memberRoutes.route('/influencer/types')
  .get(function(req, res) {
    InfluencerType.findAll().then(function(rsms,err){
      if(err) res.send(err);
      res.json(rsms);
    });
  });

memberRoutes.route('/influencer')
  .get(function(req, res) {
    Influencer.findAll().then(function(memebers,err){
      if(err) res.send(err);
      res.json(memebers);
    });
  })
  .post(function(req, res){
    var data = req.body;
    var currentDateNMonth = moment(new Date()).format("YYYY-MM-DD")
	if(data.createdAt=='0000-00-00 00:00:00'){
		data.createdAt=currentDateNMonth;
	}

	if(data.siteVisitedDate=='0000-00-00 00:00:00'){
		data.siteVisitedDate=currentDateNMonth;
	}

	if(data.updatedAt=='0000-00-00 00:00:00'){
		data.updatedAt=currentDateNMonth;
	}
	
	if(data.dateOfBirth=='0000-00-00 00:00:00'){
		data.dateOfBirth=currentDateNMonth;
	}
	
    if(data.id) {
      Influencer.update(data, {where: {id: data.id}})
        .then(function (influencer) {
          Influencer.findOne({where: {
            Id:data.influencerId
          }}).then(function(err, infulencer) {
            if(data.moreInfo){
              data.moreInfo.InfluencerId = data.id;
              InfluencerMoreInfo.create(data.moreInfo).then(function(moreInfo,error){
                if(error)res.status(404).send({message:"Error occurred while saving the Influencer!"});
                //infulencer.moreInfo = moreInfo;
              })
            }
            if (err) res.status(404).send({message:"Error occurred while finding the Influencer!"});
            res.json(infulencer);
          });
        })
        .error(function (error) {
          res.send(error);
        });
    }else{
    	
      Influencer.create(data).then(function(influencer,err){
        if(err) res.status(404).send({message:"Error occurred while creating the Influencer!"});
        if(data.moreInfo){
          data.moreInfo.InfluencerId = data.id;
          InfluencerMoreInfo.create(data.moreInfo).then(function(moreInfo,error){
            if(error)res.status(404).send({message:"Error occurred while saving the Influencer!"});
            //infulencer.moreInfo = moreInfo;
          })
        }
        res.json(influencer);
      });
    }
  });

memberRoutes.route('/influencer/:influencerId')
  .get(function(req, res) {
    Influencer.findOne({where: {
      Id:req.params.influencerId
    }}).then(function(influencer, err) {
      if (err) res.status(404).send({message:"Error occurred while finding the RSM!"});
      res.json(influencer);
    });
  }).delete(function(req,res){
	  Influencer.destroy({where:{id:req.params.influencerId}}).then(function(row){
	 	  InfluencerMoreInfo.destroy({where:{influencerId:req.params.influencerId}}).then(function(row){
			  res.json(row);
		  });
 	    });
	 });

memberRoutes.route('/influencer/moreInfo/:influencerId')
  .get(function(req, res) {
    InfluencerMoreInfo.findAll({where:{
      InfluencerId : req.params.influencerId
    }}).then(function(moreInfoList,err){
      if(err) res.send(err);
      res.json(moreInfoList);
    });
  });

memberRoutes.route('/influencer/moreInfo/remove/:moreInfoId').delete(function(req,res){
    	  InfluencerMoreInfo.destroy({where:{id:req.params.moreInfoId}}).then(function(row){
			  res.json(row);
		  });
});


memberRoutes.route('/influencer/moreInfoObj/:moreInfoId')
.get(function(req, res) {
  InfluencerMoreInfo.findOne({where:{
       Id : req.params.moreInfoId
  }}).then(function(moreInfo,err){
    if(err) res.send(err);
    res.json(moreInfo);
  });
});


memberRoutes.route('/getAsoRegLocMembers').post(function(req, res) {

	  var asoId = req.body.asoId ;
	  var eventType = req.body.eventType;

	    Influencer.findAll({where: {
	    	     asoId:asoId,
	    	     masonMeetType:eventType
	      }}).then(function(influencer, err) {
	        if (err) res.status(404).send({message:"Error occurred while finding the RSM!"});
	        res.json(influencer);
	   });
});


memberRoutes.route('/getMebersForEvents/:eventId').get(function(req, res) {

	MemberEvent.findAll({where: {
		eventId:req.params.eventId
      }}).then(function(influencer, err) {
        if (err) res.status(404).send({message:"Error occurred while finding the RSM!"});
        res.json(influencer);
   });
});

memberRoutes.route('/addMasonToEvent').post(function(req, res) {

	 var data = req.body;

	 if(data.id) {
	 	 if(data.memberIds!=null && data.memberIds.length>=1){
			 MemberEvent.update(data, {where: {id: data.id}})
		     .then(function (influencer) {
		        MemberEvent.findOne({where: {
		           eventId:data.eventId
		       }}).then(function(err, events) {
		         if (err) res.status(404).send({message:"Error occurred while updating the members to event!"});
		         res.json(events);
		       });
		     })
		     .error(function (error) {
		       res.send(error);
		     });
		 }else{
	 		  MemberEvent.destroy({where:{id:data.id}}).then(function(err,row){
	 			 if (err) res.status(404).send({message:"Error deleting  members from event!"})
			      res.json(row);
			   }) .error(function (error) {
			       res.send(error);
			     });
 		 }

	 }else{
		 MemberEvent.create(data).then(function(influencer,err){
	     if(err) res.status(404).send({message:"Error occurred while creating the member event!"});
	     res.json(influencer);
	   });
	 }
 });


memberRoutes.route('/images')
.post(function(req, res) {
 	var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var file = files.file;
        var tempPath = file.path;
        var username = fields.fileName;
        var targetPath = './public/images/masons/'+file.name;
        fs.rename(tempPath, targetPath, function(err) {
            if (err) {
            	console.log(err);
                return res.status(400).send('Image is not saved:');
            }
            return res.json(targetPath);
        });


    });
});

memberRoutes.route('/birthDays').get(function(req, res){

	 var currentDateNMonth = moment(new Date()).format("YYYY-MM-DD");

     var endofMonth = moment(new Date()).endOf('month').format("YYYY-MM-DD");
     var startOfMonth = moment(new Date()).startOf('month').format("YYYY-MM-DD");
     var next25DdayOftheMonth = moment(moment().startOf('day')).add(20, 'days')

     var currentDate = moment(new Date()).format("DD");
     var next25Date =20;
     var startOfNextMonth = moment(new Date()).add(1,'month').startOf('month').format("YYYY-MM-DD");
     var endofNextMonth = moment(startOfNextMonth).endOf('month').format("YYYY-MM-DD");

      if(currentDate <= next25Date){
	     Influencer.findAll(
         {
           where: ["DATE_FORMAT('"+ startOfMonth + "','%m-%d')<=DATE_FORMAT(dateOfBirth,'%m-%d') and   DATE_FORMAT(dateOfBirth,'%m-%d') <= DATE_FORMAT('"+ endofMonth + "','%m-%d')"],
           attributes: ['id', 'influncerName', 'dateOfBirth', 'influencerCode'],
           raw: true
         }
       ).then(function(influencer, err) {
         if (err) res.status(404).send({message:"Error occurred while finding the birthdays!"});
         var influencerBDayList = [];
         for(var i=0;i < influencer.length;i++){
           var tempInfluencer = influencer[i];
           var dateNumber = moment(tempInfluencer.dateOfBirth);
           var bDayAsNumber = dateNumber.format('M') + dateNumber.format('DD');
           tempInfluencer['bDayAsNumber'] = bDayAsNumber;
           influencerBDayList.push(tempInfluencer)
         }
         res.json(influencerBDayList);
       });
     }else if(next25Date < currentDate){

    	 Influencer.findAll({where: [
		                           	 "(DATE_FORMAT('"+ currentDate + "','%m-%d')<=DATE_FORMAT(dateOfBirth,'%m-%d') and   DATE_FORMAT(dateOfBirth,'%m-%d') <= DATE_FORMAT('"+ endofMonth + "','%m-%d'))" +
		                           	 		"OR (DATE_FORMAT('"+ startOfNextMonth + "','%m-%d')<=DATE_FORMAT(dateOfBirth,'%m-%d') and   DATE_FORMAT(dateOfBirth,'%m-%d') <= DATE_FORMAT('"+ endofNextMonth + "','%m-%d'))"
		                              ]}).then(function(influencer, err) {
		                               if (err) res.status(404).send({message:"Error occurred while finding the birthdays!"});
		                               res.json(influencer);
		                            });
     }

});

memberRoutes.route('/birthDaysForSelctedMonth').post(function(req, res){

	  var data = req.body;
	  var birthdate=data.birthday;

	  var endofMonth = moment(birthdate).endOf('month').format("YYYY-MM-DD");
	  var startOfMonth = moment(birthdate).startOf('month').format("YYYY-MM-DD");

	  Influencer.findAll({where: [
		                           	 "DATE_FORMAT('"+ startOfMonth + "','%m-%d')<=DATE_FORMAT(dateOfBirth,'%m-%d') and   DATE_FORMAT(dateOfBirth,'%m-%d') <= DATE_FORMAT('"+ endofMonth + "','%m-%d')"
		                              ]}).then(function(influencer, err) {
		                               if (err) res.status(404).send({message:"Error occurred while finding the birthdays!"});
		                               res.json(influencer);
		                            });


});

memberRoutes.route('/getMembers').post(function(req, res) {

	  var influencerCat = req.body.influencerCat ;
	 // var locId = req.body.locId;

	    Influencer.findAll({where: {
	    	influencerCode:influencerCat
	      }}).then(function(influencer, err) {
	        if (err) res.status(404).send({message:"Error occurred while finding the influencerCat!"});
	        res.json(influencer);
	   });
});

memberRoutes.route('/getMembersASO').post(function(req, res) {

  var asoId = req.body.asoId ;
  // var locId = req.body.locId;

  Influencer.findAll({where: {
    asoId:asoId
  }}).then(function(influencer, err) {
    if (err) res.status(404).send({message:"Error occurred while finding the influencerCat!"});
    res.json(influencer);
  });
});



memberRoutes.route('/findMembersByNic').post(function(req, res) {

	  var nic = req.body.nic ;
  	  Influencer.find({where: {
	    nic:nic
	  }}).then(function(influencer, err) {
	    if (err) res.status(404).send({message:"Error occurred while finding the influencer!"});
 	         if(influencer && influencer.id!=null && influencer!=undefined){
	        	 res.send({message: nic + " is already exists"});
	         }
 	  });
});

 

module.exports = memberRoutes;
