/**
 * Created by udeshikaperera on 27/09/2015.
 */
module.exports = function(sequelize, DataTypes) {
  var Location = sequelize.define("Location", {
      id:{type: DataTypes.INTEGER(11), primaryKey: true, autoIncrement: true},
      locationCode : DataTypes.STRING,
      locationName : DataTypes.STRING
    }
    //,
    //{
    //  classMethods:{
    //    associate:function(models){
    //      Location.hasOne(models.Area);
    //    }
    //  }
    //}
  );
  return Location;
};
