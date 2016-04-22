// Load .env config (silently fail if no .env present)
require('dotenv').config({ silent: true });
var ioLib = require('socket.io');
var http = require('http');
var path = require('path');
var express = require('express');
var noble = require('noble');

// Config
var message = process.env.message || "Hi _, welcome to the booth of awesome!"
var port = process.env.PORT || 8080;

// Create the express app
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req,res){
  res.render('index',{})
});

var sockets = [];
var server = http.Server(app);
var io = ioLib(server);

// Setup sockets for updating web UI
io.on('connection', function (socket) {
  // Add new client to array of client upon connection
  sockets.push(socket);

});

console.log("Bluetooth State is : ",noble.state)

noble.on('stateChange',function(state){
	if(state == 'poweredOn'){
		console.log("Bluetooth stateChange, start scanning...");
		noble.startScanning();
	}else{
		noble.stopScanning();
	}
});

noble.on('discover',function(dev){
	if(dev.advertisement.localName){
		console.log("Found Device ",dev.advertisement.localName," with rssi ",dev.rssi);
		sockets.forEach(function(socket){
			socket.emit('found',{'name':dev.advertisement.localName,'rssi':dev.rssi});

		});
	};
});

// Start the app
server.listen(port, function() {
  console.log('listening at http://localhost:%s', port);
});

