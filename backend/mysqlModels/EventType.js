module.exports = function(sequelize, DataTypes) {
	  var EventType = sequelize.define("EventType", {
		  code: DataTypes.STRING,
		  name: DataTypes.STRING,
      eventType : DataTypes.STRING
	  });
	  EventType.sync({force: true}).then(function () {
	    // Table created
	    return EventType.bulkCreate([
		{
		     code: 'HCS',
		     name:'Holcim Concrete Society',
		     eventType:'mason'
		
		},
		{
		     code: 'MC',
		     name:'Masons Chat',
		     eventType:'mason'
		
		},                              
        {
		      code: 'MMM',
		      name:'Mini Mason Meet',
		      eventType:'mason'

        },
        {
	          code: 'PMM',
	          name:'Pocket Mason Meet',
	          eventType:'mason'
        },
        {
	          code: 'ENG',
	          name:'ENG',
	          eventType:'engineer'
        }
	    ]);
	  });
	  return EventType
	};
