var jQuery=require('js-toolbox')._jQuery;

module.exports.chat = function(socket){
	socket.emit('message', {message: "Welcome to this chat"});
	socket.on('message', jQuery.proxy(function(oData){
		console.log("echo message");
		this.sockets.emit("message", oData);
	}, this));
};