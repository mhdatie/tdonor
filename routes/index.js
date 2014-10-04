//add all routes here
var auth = require('./auth.js');
var errors = require('./errors.js');

module.exports = function(app, io){
	auth(app,io);
	errors(app);
}
