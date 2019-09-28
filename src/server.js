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
	origin: 'http://localhost:3000',
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

var Web3 = require('web3');

app.get('/test', async (req, res) => {
	try{ 
		let web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
		//web3.eth.DefaultAccount = web3.eth.accounts[0];
		//console.log("default account: " + web3.eth.DefaultAccount);

		//contract data regarding all variables / functions

		var fs = require('fs');
		var jsonFile = "/home/teslash21/CS/Github/BinIT-API/src/blockchain/build/contracts/storePolybagWeight.json";
		var parsed= JSON.parse(fs.readFileSync(jsonFile));
		var polybagContract = parsed.abi;
//		var polybagContract = new web3.eth.Contract([{"constant":false,"inputs":[{"name":"_s","type":"string"}],"name":"setter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getTest","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}], "0x30c1388c5263e598ecBA609599527630897e71EF");

		console.log(polybagContract);
		// Contract address to be able to communicate with it
		console.log(await polybagContract.methods.saveData(1,web3.utils.asciiToHex("20")).call());
		console.log(await polybagContract.methods.getData(1).call());
		
		/*
		// suppose you want to call a function named myFunction of myContract
		var setWeight = await polybagContract.setData.getData(function (1,20));
		// finally pass this data parameter to send Transaction
		await web3.eth.sendTransaction( {to: "0x30c1388c5263e598ecBA609599527630897e71EF", data: setWeight });

		var getWeight = await polybagContract.getData.getData(function (1));
		// finally pass this data parameter to send Transaction
		var test = await web3.eth.sendTransaction( {to: "0x30c1388c5263e598ecBA609599527630897e71EF", data: setWeight });
		console.log(test);
		*/
	} catch(error){
		console.log(error);
	}

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
