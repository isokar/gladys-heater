const Promise = require('bluebird');

module.exports = function(params){

	// if module serial is not present, we cannot contact the arduino
	if(!gladys.modules.serial || typeof gladys.modules.serial.sendCode !== 'function') {
		sails.log.error(`You need to install the serial module in Gladys.`);
		return Promise.reject(new Error('DEPENDENCY_MISSING'));
	}
	// if device is standard RF
	if(params.deviceType.protocol ==='radio'){
		var code = parseInt(params.deviceType.identifier) + parseInt(params.state.value);
		
		sails.log.info(`Sending datas to arduino:` + `{"function_name":"SendRadioCode","code":"${code}"}%`);
		gladys.modules.serial.sendCode(`{"function_name":"SendRadioCode","code":"${code}"}%`);
		
	// if device is RF with different code
	}else if(params.deviceType.protocol ==='diffRF'){
		var res = params.deviceType.identifier.split(".");
		var code = 0;
		switch (params.state.value) {
			case 0:
				code = parseInt(res[0]);
			break;
			case 1:
				code = parseInt(res[1]);
			break;

			default:
				console.log('DeviceType state is wrong. Should be 0 or 1.');
			break;
			}
		sails.log.info(`Sending datas to arduino:` + `{"function_name":"SendRadioCode","code":"${code}"}%`);
		gladys.modules.serial.sendCode(`{"function_name":"SendRadioCode","code":"${code}"}%`);
		
	// else if device is DIO-compatible
	}else if(params.deviceType.protocol ==='DIO'){
		var res = params.deviceType.identifier.split(".");
		var ident = parseInt(res[0]);
		var unit = parseInt(res[1]);
		var val = parseInt(params.state.value);
		var period = 268;
		var group = 0;
		sails.log.info(`Sending datas to arduino:` + `{"function_name":"SendNewCode","Addr":"${ident}","group":"${group}","unit":"${unit}","value":"${val}","period":"${period}"}%`);
		gladys.modules.serial.sendCode(`{"function_name":"SendNewCode","Addr":"${ident}","group":"${group}","unit":"${unit}","value":"${val}","period":"${period}"}%`);
	}
	//any other device type can be defined here, just specify protocol
	
	return Promise.resolve();
};
