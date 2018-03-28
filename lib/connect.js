var serialport = require('serialport');
var SerialPort = serialport.SerialPort;
var shared = require('./shared.js');
var parseData = require('./parseData.js');
var Promise = require('bluebird');

module.exports = function() {
	
	gladys.param.getValue('Radio_tty')
		.then(function(value){
			
			// we connect to the device
			var port = new SerialPort(device.identifier, {
			  baudRate: 9600 , parser: serialport.parsers.readline('\n')
			});

			port.on('error', function(err) {
			  sails.log.warn('RadioEmitter serial error : ', err.message);
			});

			// if we receive data, we parse it
			port.on('data', parseData);

			// we add the port object to the shared list
			shared.addPort(port);

			return port;
			
		})
};