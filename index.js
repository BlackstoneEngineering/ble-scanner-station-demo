// Load .env config (silently fail if no .env present)
require('dotenv').config({ silent: true });
var ioLib = require('socket.io');
var http = require('http');
var path = require('path');
var express = require('express');
var noble = require('noble');
var storage = require('node-persist');


// Config
var pageConfig = {
  preMessage: process.env.PRE_MESSAGE || "Hi ",
  postMessage: process.env.POST_MESSAGE || "welcome to the booth of awesome!",
  partnerLogo: process.env.LOGO_2,
  logo2: process.env.LOGO_2,
  logo1: process.env.LOGO_1,
  backgroundColor: process.env.BACKGROUND_COLOR || "#159ab5",
  fontColor: process.env.FONT_COLOR || "#ffffff",
  messageColor: process.env.MESSAGE_COLOR || "#e8922d"
};

var port = process.env.PORT || 8080;
var configRSSI = process.env.RSSI || -76;

// Create the express app
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req,res){
  res.render('index', pageConfig);
});

var sockets = [];
var server = http.Server(app);
var io = ioLib(server);
storage.initSync();
var devices = storage.getItem('devices')
console.log("devices = ", devices)
if(devices == undefined){
	devices = {}
	console.log("devices is uninitialized, resettign to ", devices)
}

// Setup sockets for updating web UI
io.on('connection', function (socket) {
  // Add new client to array of client upon connection
  sockets.push(socket);
});

console.log("Bluetooth State is : ",noble.state)

noble.on('stateChange',function(state){
	if(state == 'poweredOn'){
		console.log("Bluetooth stateChange, start scanning...");
		noble.startScanning([],true);
	}else{
		noble.stopScanning();
	}
});

noble.on('discover',function(dev){
	if(dev.advertisement.localName && dev.rssi>configRSSI){
		if(dev.advertisement.manufacturerData != undefined){
			if(dev.advertisement.manufacturerData.toString("utf8",0,3) === "dac"){
				//console.log("Found Device ",dev.advertisement.localName," with rssi ",dev.rssi);
				sockets.forEach(function(socket){
					socket.emit('found',{'name':dev.advertisement.localName,'rssi':dev.rssi});
				});
				// add device to list of seen devices
				if(devices.hasOwnProperty(dev.advertisement.localName)){
					// do nothing
				}else{
					console.log("Adding ",dev.advertisement.localName," to database")
					devices[dev.advertisement.localName] = 'seen';
					storage.setItem('devices',devices);
				}
			}
		}
	} else{
		//console.log("...",dev.advertisement.localName,":",dev.rssi,"dB")
	};
});

// Start the app
server.listen(port, function() {
  console.log('listening at http://localhost:%s', port);
});

