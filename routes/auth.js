//this part is in config.js
var config = require('../config.js');
var twitterHandler = require('../controllers/twitter.js');

//acquire twitter api
var util = config.tapi.util;
var twitter = config.tapi.twitter;
var twit = config.tapi.twit;


module.exports = function(app, io){

	var twitHandler = new twitterHandler(twit, util, io);

	//second parameter is middleware to check if user is authenticated by twitter
	app.get('/', twit.gatekeeper('/login'), twitHandler.displayHome);
	app.get('/twauth', twit.login()); //call twitter auth
	app.get('/logout', twitHandler.logout); //delete cookie and redirect to login page

	app.get('/login', function(req,res){
		res.render('login'); //renders login page
	});	
}