var Cookies = require('cookies');

function twitterHandler (twit, util, io){

	this.displayHome = function(req, res, next){

		var cookies = new Cookies(req,res,twit.keygrip);
		var user = twit._readCookie(cookies);
		
		//fetch filtered tweets
		twit.stream('filter', {track:'#tweetforblood'}, function(stream) {
		    
		    stream.on('data', function(data){
		    	//inspect the data document with console.log(data)
		    	io.emit('tweet', data);
		    });
		    stream.on('error', function(err){
		    	next(err);
		    });
		    stream.on('end', function(){
		    	io.emit('stream-end', "Stream Disconnected.");
		    });

		    // Disconnect stream after 30 seconds
		    //setTimeout(stream.destroy, 30000);
		});

		//gets previous tweets, if any
		twit.search('#tweetforblood', function(data) {
		    var tweets = data.statuses;
		    res.render('home', {user:{name: user.screen_name}, tweets: tweets});
		});
		
	}

	this.logout = function(req, res){
		var cookies = new Cookies(req,res,twit.keygrip);
		cookies.set(twit.options.cookie, null);
		return res.redirect('login');
	}



}

module.exports = twitterHandler; 