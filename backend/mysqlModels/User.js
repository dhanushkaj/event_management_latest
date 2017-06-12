/**
 * Created by udeshikaperera on 05/09/2015.
 */
var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {

  var User = sequelize.define("User", {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    department:DataTypes.STRING,
    designation:DataTypes.STRING,
    userRole:DataTypes.STRING,
    expDate: DataTypes.DATE,
    userStatus : DataTypes.STRING,
    reference : DataTypes.STRING,
    userWindowLoginId: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isUnique: function (value, next) {
          var self = this;
          User.find({where: {userWindowLoginId: value}})
            .then(function (user) {
              // reject if a different user wants to use the same email
              if (user && self.id !== user.id) {
                return next('Windows Login Id already exist!');
              }
              return next();
            })
            .catch(function (err) {
              return next(err);
            });
        }
      }
    },
    employeeNumber : {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isUnique: function (value, next) {
          var self = this;
          User.find({where: {userWindowLoginId: value}})
            .then(function (user) {
              // reject if a different user wants to use the same email
              if (user && self.id !== user.id) {
                return next('Employee Number already exist!');
              }
              return next();
            })
            .catch(function (err) {
              return next(err);
            });
        }
      }
    },
    department:DataTypes.STRING,
    designation:DataTypes.STRING,
    userRole:DataTypes.STRING,
    expDate: DataTypes.DATE,
    userStatus : DataTypes.STRING,
    reference : DataTypes.STRING,
    password:       {
      type: DataTypes.STRING,
      set:  function(v) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(v, salt);

        this.setDataValue('password', hash);
      }
    }
  },{
    instanceMethods: {
      validPassword : function(password) {
        return bcrypt.compareSync(password, this.password);
      }
    }
  });
  User.sync({force: true}).then(function () {
    // Table created
    return User.bulkCreate([
      {
        name: 'admin',
        username:'admin',
        userRole:'ADMIN',
        email: 'admin@gmail.com', password: 'admin'
      },
      {
        name: 'eventAdmin',
        username:'eventAdmin',
        userRole:'EVENT_ADMIN',
        email: 'eventAdmin@gmail.com', password: 'admin'
      },
      {
        name: 'itAdmin',
        username:'itAdmin',
        userRole:'IT_ADMIN',
        email: 'itAdmin@gmail.com', password: 'admin'
      }
    ]);
  });
  return User;
};



