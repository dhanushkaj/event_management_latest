/**
 * Created by udeshikaperera on 12/10/2015.
 */
module.exports = function(sequelize, DataTypes) {
  var InfluencerType = sequelize.define("InfluencerType", {
    influencerCode: DataTypes.STRING,
    influencerName: DataTypes.STRING
  });
  InfluencerType.sync({force: true}).then(function () {
    // Table created
    return InfluencerType.bulkCreate([
      {
        influencerCode: 'mason',
        influencerName:'Mason'
      },
      {
        influencerCode: 'engineer',
        influencerName:'Engineer'
      },
      {
        influencerCode: 'dealer',
        influencerName:'Dealer'
      },
      {
          influencerCode: 'to',
          influencerName:'Techinical Officers'
        }
    ]);
  });
  return InfluencerType
};
