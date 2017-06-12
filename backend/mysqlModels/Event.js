/**
 * Created by udeshikaperera on 17/09/2015.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Event = sequelize.define("Event", {
        title: DataTypes.STRING,
        code: DataTypes.STRING,
        planed : DataTypes.BOOLEAN,
        location : DataTypes.INTEGER,
        region:DataTypes.STRING,
        areaId:DataTypes.INTEGER,
        asoId : DataTypes.INTEGER,
        asoCode : DataTypes.STRING,
        owner : DataTypes.STRING,
        locBasedOwner : DataTypes.STRING,
        budget: DataTypes.FLOAT,
        description:DataTypes.STRING,
        influencerCode:DataTypes.STRING,
        start: { type: DataTypes.DATE},
        n1:DataTypes.STRING,
        fh1:DataTypes.STRING,
        h1:DataTypes.STRING,
        g1:DataTypes.STRING,
        vg1:DataTypes.STRING,
        total1:DataTypes.STRING,
        comments1:DataTypes.STRING,
        n2:DataTypes.STRING,
        fh2:DataTypes.STRING,
        h2:DataTypes.STRING,
        g2:DataTypes.STRING,
        vg2:DataTypes.STRING,
        total2:DataTypes.STRING,
        comments2:DataTypes.STRING,
        n3:DataTypes.STRING,
        fh3:DataTypes.STRING,
        h3:DataTypes.STRING,
        g3:DataTypes.STRING,
        vg3:DataTypes.STRING,
        total3:DataTypes.STRING,
        comments3:DataTypes.STRING,
        n4:DataTypes.STRING,
        fh4:DataTypes.STRING,
        h4:DataTypes.STRING,
        g4:DataTypes.STRING,
        vg4:DataTypes.STRING,
        total4:DataTypes.STRING,
        comments4:DataTypes.STRING,
        n5:DataTypes.STRING,
        fh5:DataTypes.STRING,
        h5:DataTypes.STRING,
        g5:DataTypes.STRING,
        vg5:DataTypes.STRING,
        total5:DataTypes.STRING,
        comments5:DataTypes.STRING,
        n6:DataTypes.STRING,
        fh6:DataTypes.STRING,
        h6:DataTypes.STRING,
        g6:DataTypes.STRING,
        vg6:DataTypes.STRING,
        total6:DataTypes.STRING,
        comments6:DataTypes.STRING,
        noOfAnswered:DataTypes.STRING
    });
      //,
      //{
        //classMethods: {
        //    associate: function(models) {
        //        Event.belongsTo(models.User, {
        //            onDelete: "CASCADE",
        //            foreignKey: {
        //                allowNull: false
        //            }
        //        });
        //    }
        //}
    //}

/*  Event.sync({force: true}).then(function () {
    // Table created
    return Event.create({
      title: 'Mason',
      code:'Min1',
      location:"locations",
      start:'2015-09-25 04:57:15',
      budget:1000.00
    });
  });*/

    return Event;
};
