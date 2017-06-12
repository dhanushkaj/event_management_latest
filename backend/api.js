/**
 * Created by udeshikaperera on 29/06/2015.
 */

var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var mongoose = require('mongoose');
var morgan = require('morgan');
var acl = require('acl');
var app = express();
var config = require('./utils/config');
app.use(express.static('public'));
//var sequelize = require("./config/config");


app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.use(function(req, res, next) {
   res.header('Access-Control-Allow-Origin', 'http://localhost:9001');
   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
   res.header('Access-Control-Allow-Headers', 'content-type, Authorization, accept');
   res.header('Access-Control-Allow-Credentials', 'true');
   next();
});
//app.use(jwtauth);
app.use('/api/events',require('./routes/eventRoutes'));
app.use('/api/users',require('./routes/userRoutes'));
app.use('/api/members',require('./routes/memberRoutes'));
app.use('/api/asoOrsm',require('./routes/asoOrsmRoutes'));
app.use('/api/locations',require('./routes/locationsRoutes'));
app.use('/auth/login',require('./routes/authRoutes'));
//app.use('/api/districtLocations',require('./routes/districtLocationRoutes'));

//mongoose.connect(config.database);
//var db =  mongoose.connection;
//db.on('error', console.error.bind(console, 'connection error...'));
//db.once('open', function callback(){
//    console.log("Holcim DB opend!!");
//});

//sequelize.authenticate().then(function () {
//  console.log("CONNECTED! ");
//})
//  .catch(function (err) {
//    console.log("SOMETHING DONE GOOFED");
//  })
//  .done();
//var server = app.listen(3000, function(){
//   console.log("api listening to " + server.address().port);
//});

app.set('port', process.env.PORT || 3001);
module.exports = app;







