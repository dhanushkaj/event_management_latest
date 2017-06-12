/**
 * Created by udeshikaperera on 17/09/2015.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var MemberEvent = sequelize.define("MemberEvent", {
    	id:{type: DataTypes.INTEGER(11), primaryKey: true, autoIncrement: true},
    	eventId: DataTypes.INTEGER,
     	memberIds: DataTypes.STRING
       
    });
  
    return MemberEvent;
};