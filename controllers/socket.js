//handles client to server updates

function socketHandler(io){

	io.on('connection', function(stream){
		console.log('connected');
	});

	this.getSocket = function(){
		return io;
	}
}

module.exports = socketHandler;
