/**
 * Created by udeshikaperera on 05/07/2015.
 */

var jwt = require('jwt-simple');
var moment = require('moment');
var User = require('../../models/User');

module.exports = function(req, res, next) {
    console.log('Auth handling.CCC');
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        try {
            var decoded = jwt.decode(token, "shh..");
            if (decoded.exp <= moment().unix()) {
                return res.status(400).send({
                    success: false,
                    message: "Access token has expired!!"
                });
            }
            User.findOne({ _id: decoded.sub }, function(err, user) {
                req.user = user;
                next();
            });
        } catch (err) {
            return res.status(403).send({
                success: false,
                message: "Token does not match!!"
            });
        }
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
};

