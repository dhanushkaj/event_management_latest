/**
 * Created by udeshikaperera on 20/05/2015.
 */
var db= require('../../mysqlModels/index');
var User = db['User'];
var LocalStrategy = require('passport-local').Strategy;
var LdapStrategy = require('passport-ldapauth');

var strategyOptions = {
    usernameField: 'email'
};

exports.login = new LocalStrategy(strategyOptions, function(email, password, done) {
    User.findOne({where:{email: email }})
      .then(function(user,err){
        if (!user ) {
          done(null, false,{message: "Wrong email/password"});
        } else if (!user.validPassword(password)) {
          done(null, false,{ message: "Wrong email/password"});
        } else {
          done(null, user);
        }
      }).catch(function (e) {
        done(null, false, {message:"wrong"});
      });
    //User.find(searchUser, function(err, user) {
    //    if (err) return done(err);
    //    if (!user) {
    //        return done(null, false, {
    //            message: "Wrong email/password"
    //        });
    //    }
    //    user.comparePassword(password, function(err, isMatch) {
    //        if (err) return done(err);
    //
    //        if (!isMatch)
    //            return done(null, false, {
    //                message: "Wrong email/password"
    //            });
    //        return done(null, user);
    //    });
    //})
});

exports.register = new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
}, function(req, email, password, done) {
    var newUser = new User({
        email: email,
        password: password
    });
    var searchUser = {
        email: email
    };
    User.findOne(searchUser, function(err, user) {
        if (err) return done(err);

        if (user) {
            return done(null, false, {
                message: "email already exists"
            });
        }
        newUser.save(function(err) {
            done(null, newUser);
        })
    });
});
//
exports.lDapAuth = new LdapStrategy({
  usernameField: 'email',
  server: {
    url: 'ldap:ldap.forumsys.com :389',
    bindDn: ' cn=read-only-admin,dc=example,dc=com',
    bindCredentials: 'password',
    searchBase: 'dc=example,dc=com',
    searchFilter: '(uid={{username}})'
  }
})
