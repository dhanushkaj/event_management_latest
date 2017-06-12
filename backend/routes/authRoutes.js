/**
 * Created by udeshikaperera on 16/07/2015.
 */
var authRoutes = require('express').Router(),
    passport = require('passport'),
    LocalStrategy = require("../service/authentication/localStrategy"),
    createSendToken = require('../service/authentication/jwt'),
    LdapStrategy = require('passport-ldapauth');


passport.use('local-login', LocalStrategy.login);
//passport.use('ldapauth',LocalStrategy.lDapAuth);

authRoutes.post('/', passport.authenticate('local-login'),function(req, res) {
    createSendToken(req.user, res);
});


//LDAP Auth
//authRoutes.post('/', function(req, res, next) {
//  passport.authenticate('ldapauth', {session: false}, function(err, user, info) {
//    if (err) {
//      return next(err); // will generate a 500 error
//    }
//    // Generate a JSON response reflecting authentication status
//    if (!user) {
//      console.log("FUUFUFUFUFUFUFUF")
//      return res.send({ success : false, message : 'authentication failed' });
//    }
//    createSendToken(user, res);
//    //console.log("&*(&(&(*&(*&(*&")
//    //console.log("&*(&(&(*&(*&(*&")
//    //return res.send({ success : true, message : 'authentication succeeded' });
//  })(req, res, next);
//});

module.exports = authRoutes;
