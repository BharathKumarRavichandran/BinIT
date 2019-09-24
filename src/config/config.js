const dotenv = require('dotenv');
const path = require('path');


// Declaring globals
const BASE_DIR = __dirname + '/./../../';

dotenv.config(
	{
		path: __dirname + '/./../../.env'
	}
);

module.exports = {
	email: {
		SITE_NOREPLY_EMAIL: process.env.SITE_NOREPLY_EMAIL
	},
	debug: process.env.DEBUG.toLowerCase()=='true' ? true : false,
	maintenance: process.env.MAINTENANCE.toLowerCase()=='true' ? true : false,
	directory: {
		BASE_DIR: BASE_DIR,
		CLIENT_BASE_DIR: process.env.CLIENT_BASE_DIR,
		CONFIG_DIR: path.join(BASE_DIR, 'src', 'config'),
		LOGS_DIR: path.join(BASE_DIR, 'storage', 'logs'),
		PUBLIC_DIR: path.join(process.env.CLIENT_BASE_DIR, 'public'),
		SRC_DIR: path.join(BASE_DIR, 'src'),
		APP_STATIC_DIR: path.join(BASE_DIR, 'public'),
	},
	environment: process.env.environment,
	key: {
		SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
	},
	mysql: {
		DB_HOST: process.env.DB_HOST,
		DB_PORT: process.env.DB_PORT,
		DB_NAME: process.env.DB_NAME,
		DB_USERNAME: process.env.DB_USERNAME,
		DB_PASSWORD: process.env.DB_PASSWORD,
		DB_DIALECT: process.env.DB_DIALECT
	},
	ports: {
		APP_PORT: process.env.APP_PORT,
	},
	session: {
		secretString: process.env.SESSION_SECRET
	},
	url: {
		API_BASE_URL: process.env.API_BASE_URL,
		CLIENT_BASE_URL: process.env.CLIENT_BASE_URL
	}
};