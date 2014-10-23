var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var cons = require('consolidate');
var routes = require('./routes');
var socket = require('./controllers/socket.js');

//require('express-mongoose');

var app = express();

//mongoose.set('debug',true);
//mongoose.connect('mongodb://localhost/tdonor',function(err){
//	if(err) throw err;
//});

//register template
app.engine('jade', cons.jade);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

//add body parser
app.use(bodyParser.urlencoded({extended: true}));

//configure express to read in files installed with public and bower (i.e: bootstrap)
app.use('/public', express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));


var server = app.listen(3000, function(){
	console.log("now listening on http://localhost:3000");
});	
//set up socket ----------------------------------------------------
var io = require('socket.io').listen(server);
//register sockets
socket(io); //client to server communication
//------------------------------------------------------------------
//register routes
routes(app, io);