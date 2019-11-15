// Importing config/env variables
const config = require('../config/config');

module.exports = {
	development: {
		username: config.mysql.DB_USERNAME,
		password: config.mysql.DB_PASSWORD,
		database: config.mysql.DB_NAME,
		host: config.mysql.DB_HOST,
		dialect: config.mysql.DB_DIALECT,
		define: {
			charset: 'utf8',
			collate: 'utf8_general_ci',
		}
	},
	test: {
		username: config.mysql.DB_USERNAME,
		password: config.mysql.DB_PASSWORD,
		database: config.mysql.DB_NAME,
		host: config.mysql.DB_HOST,
		dialect: config.mysql.DB_DIALECT,
		define: {
			charset: 'utf8',
			collate: 'utf8_general_ci',
		}
	},
	production: {
		username: config.mysql.DB_USERNAME,
		password: config.mysql.DB_PASSWORD,
		database: config.mysql.DB_NAME,
		host: config.mysql.DB_HOST,
		dialect: config.mysql.DB_DIALECT,
		define: {
			charset: 'utf8',
			collate: 'utf8_general_ci',
		}
	}
};