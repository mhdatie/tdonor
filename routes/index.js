//this part is in config.js
var config = require('../config.js');

//acquire twitter api
var util = config.tapi.util;
var twitter = config.tapi.twitter;
var twit = config.tapi.twit;

//add all routes here
var routes = {
	login: require('./login.js').login
}

module.exports = function(app){
	//second parameter is middleware to check if user is authenticated by twitter
	app.get('/', twit.gatekeeper('/login'), function(req,res){ 
		res.render('home');
	});

	app.get('/login', routes.login);
	app.get('/twauth', twit.login()); //call twitter auth
}
