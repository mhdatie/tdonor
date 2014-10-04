var config = {} //global document

config.tapi = {}; //twitter api document

config.tapi.util = require('util');
config.tapi.twitter = require('twitter');
config.tapi.twit = new require('twitter')({
	consumer_key: '',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: ''
});

module.exports = config;