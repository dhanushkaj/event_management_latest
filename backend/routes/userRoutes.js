/**
 * Created by udeshikaperera on 16/07/2015.
 */

var userRoutes = require('express').Router();
userRoutes.route('/users')
    .get(function(req, res) {
        //User.find({}, function(err, users) {
        //    res.json(users);
        //});
    });

module.exports = userRoutes;
