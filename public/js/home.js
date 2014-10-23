$(document).ready(function(){
	tweets = []; //initial global array
	tweet_count = 0;
	last_tweet="";
	socket = io();

	socket.on('tweet', function(tweet){
		//push documents to global array
		tweets.push(tweet);
		//increment global count
		$('#refresh .badge').html(++tweet_count);
	});
	socket.on('stream-end', function(msg){
		alert(msg);
	});

	socket.on('403',function(err){
		$('#error').text('Duplicate tweets');
	});

	$(document).on('click','#refresh',function(e){
		e.preventDefault();
		if($('.media').html() == "No results"){
			$('.media').html('');
		}
		for(i in tweets){
			var tweet = tweets[i];
			//prepend to show most recent first
			var $new = $('<a class="pull-left"><img src="'+tweet.user.profile_image_url+'"/></a><div class="media-body"><h4 class="media-heading">'+tweet.user.name+'</h4><a href="http://twitter.com/'+tweet.user.screen_name+'">@'+tweet.user.screen_name+'</a><p>'+tweet.text+'</p></div>')
			$('.media').prepend($new);
			$new.show('slow');
		}
		tweet_count = 0;
		tweets = [];
		$('#refresh .badge').html('');		
	});

	//handle new tweets

	//initial length of tweet
	var tweetinput = $('.form-control'),
		tweetlength = $('#tweetlength');

	tweetlength.text(140 - tweetinput.val().length);

	tweetinput.bind('keydown', function() {
        setTimeout(function() {
           tweetlength.text(140 - tweetinput.val().length);
        },4);
    });

	$(document).on('click','.tweetbutton',function(e){
		var error="";
		var tweet = tweetinput.val();
		tweet = $.trim(tweet);
		if(tweet.length <= 140){
			if(tweet.toLowerCase().indexOf("#tweetforblood") < 0){
				error += "Tweet should include '#TweetForBlood'";
				$('#error').text(error);
			}else{
				socket.emit('new tweet', tweet);
				//re-initialize input space
				tweetinput.val('#TweetForBlood');
				$('#error').text("");
			}
		}
	});

})
