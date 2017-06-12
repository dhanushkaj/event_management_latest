/**
 * Created by udeshikaperera on 27/09/2015.
 */
module.exports = function(sequelize, DataTypes) {
  var ASO = sequelize.define("ASO", {
      id:{type: DataTypes.INTEGER(11), primaryKey: true, autoIncrement: true},
      asoCode : DataTypes.STRING,
      asoName : DataTypes.STRING,
      mobileNo : DataTypes.STRING
    },
    {
      classMethods: {
        associate: function(models) {
          ASO.belongsTo(models.Region);
          ASO.belongsTo(models.Area);
        }
      }
    }
  );
  return ASO;
};
