/**
 * Created by udeshikaperera on 25/10/2015.
 */
module.exports = function(sequelize, DataTypes) {
  var InfluencerMoreInfo = sequelize.define("InfluencerMoreInfo", {
    giftDate: DataTypes.DATE,
    giftGivenDate: DataTypes.DATE,
    birthdayCardSent: {type:DataTypes.BOOLEAN ,defaultValue: false},
    cardSentYear : DataTypes.INTEGER,
    giftGiven : DataTypes.STRING,
    collectedCoupons : DataTypes.INTEGER,
    giftCategory : DataTypes.STRING,
    inEvent : {type:DataTypes.BOOLEAN ,defaultValue: false},
    eventDate: DataTypes.DATE,
    badCutPieces : DataTypes.STRING,
    attendance : DataTypes.STRING,
    updateProfile : DataTypes.STRING,
    sugession :  DataTypes.STRING,
    presentRcBook  :  DataTypes.STRING,
    updateMiniMasonMeet : DataTypes.STRING,
    marketInOpportunity : DataTypes.STRING,
    loyalty : DataTypes.STRING,
    enteredDate : DataTypes.DATE,
    total : DataTypes.FLOAT,
    location: DataTypes.STRING,
    noOfEventParticipated : DataTypes.INTEGER,
    costPerContact : DataTypes.FLOAT,
    giftCost : DataTypes.FLOAT
      
  });
  return InfluencerMoreInfo;
};
