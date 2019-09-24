// Importing packages/modules
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const expressValidator = require('express-validator');
const logger = require('./config/winston');
const morgan = require('morgan');
const session = require('express-session');
const Sequelize = require('sequelize');
const sgMail = require('@sendgrid/mail');
const signale = require('signale');

//Importing routes
const routes = require('./routes/index.router');

// Importing configuration file
const config = require('./config/config');

// env/config variables
const APP_PORT = config.ports.APP_PORT || 8000;
const SESSION_SECRET = config.session.secretString;

// Adding options for CORS middleware
const corsOptions = {
	origin: config.url.CLIENT_BASE_URL,
	methods: ['GET', 'PUT', 'POST', 'DELETE'],
	credentials: true
};

// Initialising express
const app = express();
const router = express.Router();


// Configuring public path
app.use(express.static(config.directory.PUBLIC_DIR));

// Configure loggers
app.use(morgan('combined', { stream: logger.stream }));

// Configuring database connection
var sequelize = new Sequelize(config.mysql.DB_NAME, config.mysql.DB_USERNAME, config.mysql.DB_PASSWORD, {
	host: config.mysql.DB_HOST,
	port: config.mysql.DB_PORT,
	dialect: config.mysql.DB_DIALECT,
	logging: false,
	pool: {
	  max: 5,
	  min: 0,
	  idle: 10000
	},
});

// Authenticating with database
sequelize.authenticate().then(function(err) {
    signale.success('Database connection has been established successfully.');
}).catch(function (err) {
    signale.error('Unable to connect to the database:', err);
});

// Initialize body-parser middleware
app.use(bodyParser.json(), cors(corsOptions));
app.use(bodyParser.urlencoded({
	extended: true
}));

// Initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(cookieParser());

// Middlewares for expressValidator
app.use(expressValidator({
	errorFormatter: function (param, msg, value) {
		var namespace = param.split('.'),
			root = namespace.shift(),
			formParam = root;

		while (namespace.length) {
			formParam += '[' + namespace.shift() + ']';
		}
		return {
			param: formParam,
			msg: msg,
			value: value
		};
	}
}));

// Initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
	secret: SESSION_SECRET,
	resave: true,
	saveUninitialized: false,
	cookie: { 
		maxAge: (1000 * 60 * 60) // 1 Hour 
	}
}));


// Set Sendgrid API key
sgMail.setApiKey(config.key.SENDGRID_API_KEY);

app.use(routes);

app.get('/', (req, res) => {
	return res.send('What are you doing here? :p');
});

// Route error handler
app.use( (err, req, res, next) => {
	// Log errors
	logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
});

app.all('*', (req, res) => {
	signale.error('Returning a 404 from the catch-all route');
	return res.sendStatus(404);
});

exports.start = () => {
	app.listen(APP_PORT, () => {
		signale.success(`App server listening on port: ${APP_PORT}`);
	});
}

exports.stop = () => {
	app.close(APP_PORT, () => {
		signale.success(`App server shut down on port: ${APP_PORT}`);
	});
}
