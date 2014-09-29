var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var cons = require('consolidate');

var routes = require('./routes');

require('express-mongoose');


mongoose.set('debug',true);
mongoose.connect('mongodb://localhost/tdonor',function(err){
	if(err) throw err;
	var app = express();

	//register template
	app.engine('jade', cons.jade);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');

	//add body parser
	app.use(bodyParser.urlencoded({extended: true}));

	//configure express to read in files installed with public and bower (i.e: bootstrap)
	app.use('/public', express.static(__dirname + '/public'));
	app.use('/bower_components',  express.static(__dirname + '/bower_components'));


	routes(app);
	
	app.listen(3000, function(){
		console.log("now listening on http://localhost:3000");
	});	
});
