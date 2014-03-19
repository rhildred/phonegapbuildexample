var renderAsync = require('render-async'),
Io = require('socket.io'),
jQuery = require('js-toolbox')._jQuery,
Chat = require('./jssrc/chat.js');

//now we need a server for this so that we can test include
var app= renderAsync.express();

app.set('views', __dirname + '/www');

//server everything index.html welcome file
app.use(renderAsync.webServer);


//set ipaddress from openshift, to command line or to localhost:8080
var ipaddr = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || parseInt(process.argv.pop(), 10) || 8080;
app.set('port', port);
//start the server listening for requests
var io = Io.listen(app.listen(port));

// set up a handler for new connections
io.sockets.on("connection", jQuery.proxy(Chat.chat, io));


