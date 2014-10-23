var Cookies = require('cookies');
//acquire twitter api
var config = require('../config.js');

var util = config.tapi.util;
var twitter = config.tapi.twitter;
var twit = config.tapi.twit;

function userHandler (io){

	this.displayHome = function(req, res, next){

		var cookies = new Cookies(req,res,twit.keygrip);
		var user = twit._readCookie(cookies);
		
		//gets previous tweets, if any
		twit.search('#tweetforblood', function(data) {
		    var tweets = data.statuses;
		    res.render('home', {user:{name: user.screen_name}, tweets: tweets});
		});
		
	}

	this.issueTweet = function(req,res,next){};

	this.logout = function(req, res){
		var cookies = new Cookies(req,res,twit.keygrip);
		cookies.set(twit.options.cookie, null);
		return res.redirect('login');
	}



}

module.exports = userHandler; 