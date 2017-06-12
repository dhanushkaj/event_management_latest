/**
 * Created by udeshikaperera on 26/09/2015.
 */
module.exports = function(sequelize, DataTypes) {
  var Region = sequelize.define("Region", {
    id:{type: DataTypes.INTEGER(11), primaryKey: true, autoIncrement: true},
    regionCode : DataTypes.STRING,
    regionName : DataTypes.STRING
  },
    {
      classMethods:{
        associate:function(models){
          Region.hasOne(models.RSM);
          Region.hasMany(models.Area);
      }
    }
    }
  );
  return Region;
};
