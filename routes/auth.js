var userHandler = require('../controllers/user.js');

var config = require('../config.js');

var util = config.tapi.util;
var twitter = config.tapi.twitter;
var twit = config.tapi.twit;

module.exports = function(app, io){

	var user = new userHandler(io);

	//second parameter is middleware to check if user is authenticated by twitter
	app.get('/', twit.gatekeeper('/login'), user.displayHome);
	app.get('/twauth', twit.login()); //call twitter auth
	app.get('/logout', user.logout); //delete cookie and redirect to login page

	app.get('/login', function(req,res){
		res.render('login'); //renders login page
	});	

	
}