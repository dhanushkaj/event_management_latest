/**
 * Created by udeshikaperera on 18/09/2015.
 */
module.exports = function(sequelize, DataTypes) {
    var Influencer = sequelize.define("Influencer", {
      influencerCode: DataTypes.STRING,
      influncerName: DataTypes.STRING,
      subCategory : DataTypes.STRING,
      address: DataTypes.STRING,
      landNo: DataTypes.STRING,
      mobileNo: DataTypes.STRING,
      nic: {type:DataTypes.STRING,unique:true},
      dateOfBirth: DataTypes.DATE,
      asoId: DataTypes.INTEGER,
      regionId: DataTypes.INTEGER,
      locationId: DataTypes.INTEGER,
      areaId: DataTypes.INTEGER,
      birthdayCardSent: DataTypes.BOOLEAN,
      designation:DataTypes.STRING,
      language: DataTypes.STRING,
      mobileNo1: DataTypes.STRING,
      mobileNo2: DataTypes.STRING,
      subCategory : DataTypes.STRING,
      noOfMasons : DataTypes.INTEGER,
      experience : DataTypes.STRING,
      eduQuli: DataTypes.STRING,
      houseBuilding: DataTypes.STRING,
      tileAndPlastering: DataTypes.STRING,
      makeWall: DataTypes.STRING,
      concrete: DataTypes.STRING,
      other: DataTypes.STRING,
      otherMembership: DataTypes.STRING,
      otherWorkshop: DataTypes.STRING,
      recomendedBy: DataTypes.STRING,
      active : DataTypes.STRING,
      photoPath : DataTypes.STRING,
      contactedStatus : DataTypes.STRING,
      influencerStatus: DataTypes.STRING,
      mobilerName : DataTypes.STRING,
      siteVisitedDate : DataTypes.DATE,
      organization: DataTypes.STRING,
      gender: DataTypes.STRING,
      email: DataTypes.STRING,
      referenceNumber: DataTypes.STRING,
      masonMeetType : DataTypes.STRING,
      description:DataTypes.STRING,
      siteWillVisitDates : DataTypes.STRING,
      siteVisitedDates : DataTypes.STRING
      }, {
        classMethods: {
            associate: function(models) {
                Influencer.hasMany(models.InfluencerMoreInfo)
            }
        }
    });
    return Influencer;
};
