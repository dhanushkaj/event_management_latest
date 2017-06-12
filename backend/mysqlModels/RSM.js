/**
 * Created by udeshikaperera on 26/09/2015.
 */
module.exports = function(sequelize, DataTypes) {
  var RSM = sequelize.define("RSM", {
    id:{type: DataTypes.INTEGER(11), primaryKey: true, autoIncrement: true},
    rsmCode : DataTypes.STRING,
    rsmName : DataTypes.STRING,
    mobileNo : DataTypes.STRING,
    email:DataTypes.STRING
  },
    {
      classMethods: {
        associate: function(models) {
          RSM.belongsTo(models.Region);
        }
      }
    }
  );
  return RSM;
};
