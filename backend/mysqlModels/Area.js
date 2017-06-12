/**
 * Created by udeshikaperera on 27/09/2015.
 */
module.exports = function(sequelize, DataTypes) {
  var Area = sequelize.define("Area", {
      id:{type: DataTypes.INTEGER(11), primaryKey: true, autoIncrement: true},
      areaCode : DataTypes.STRING,
      areaName : DataTypes.STRING,
      asoId : DataTypes.INTEGER
    }
    ,
    {
      classMethods:{
        associate:function(models){
          Area.hasMany(models.Location);
          Area.hasOne(models.ASO)
        }
      }
    }
  );
  return Area;
};
