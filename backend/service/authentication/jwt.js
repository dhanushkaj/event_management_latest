/**
 * Created by udeshikaperera on 19/05/2015.
 */

var jwt = require('jwt-simple');
var moment = require('moment');

module.exports = function (user, res){
  console.log("Udeshika  "+ JSON.stringify(user));
    var payload = {
        sub: user.id,
        exp: moment().add(10,'days').unix(),
        userRole: 'EventAdmin',
    };
    var token = jwt.encode(payload,"shh..");
    console.log(JSON.stringify(token));
    res.status(200).json({user: user.toJSON(),token: token});
};
