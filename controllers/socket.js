var config = require('../config.js');

var util = config.tapi.util;
var twitter = config.tapi.twitter;
var twit = config.tapi.twit;

var all_clients = [];

function socketHandler(io){
	//fetch filtered tweets
	this.twitStream = function(){
			twit.stream('filter', {track:'#tweetforblood'}, function(stream) {
			    
			stream.on('data', function(data){
			    //inspect the data document with console.log(data)
			   console.log(data);
			   io.emit('tweet', data);
			});
			stream.on('error', function(err){
			   throw err;
			});
			stream.on('end', function(){
			  io.emit('stream-end', "Stream Disconnected.");
			});
			// Disconnect stream after 30 seconds
		 	//setTimeout(stream.destroy, 30000);
		});
	};
	
	this.onConnect = function(){
		io.on('connection', function(socket){
			console.log(socket.id + ' connected');
			all_clients.push(socket.id);

			issueTweet(socket);
		});//on connection
	};

	this.issueTweet = function(socket){
		socket.on('new tweet', function(tweet){
			twit.verifyCredentials(function(tweet) {
				 //console.log(util.inspect(tweet));
			}).updateStatus(tweet,function(tweet) {
				if(tweet.statusCode && tweet.statusCode === 403){
					io.to(socket.id).emit('403', tweet.data);
					//io.emit('403', tweet.data);
				}
			});
	});//on new tweet

		
	};
	this.getSocket = function(){
		return io;
	};

	//call stable connections
	onConnect();
	twitStream();
	
};

module.exports = socketHandler;
