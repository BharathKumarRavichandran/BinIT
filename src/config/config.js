const path = require('path');

// Declaring globals
const BASE_DIR = __dirname + '/./../../';


module.exports = {
	//debug: process.env.DEBUG.toLowerCase()=='true' ? true : false,
	//maintenance: process.env.MAINTENANCE.toLowerCase()=='true' ? true : false,
	directory: {
		BASE_DIR: BASE_DIR,
		CONFIG_DIR: path.join(BASE_DIR, 'src', 'config'),
		LOGS_DIR: path.join(BASE_DIR, 'storage', 'logs'),
		PUBLIC_DIR: path.join(BASE_DIR, 'public'),
		SRC_DIR: path.join(BASE_DIR, 'src'),
		APP_STATIC_DIR: path.join(BASE_DIR, 'public'),
	},
	//environment: process.env.environment,
	ports: {
	//	APP_PORT: process.env.APP_PORT || 3000,
	},
	url: {
	//	API_BASE_URL: process.env.API_BASE_URL || '0.0.0.0:8000'
	}
};