const HttpStatus = require('http-status-codes');
const path = require('path');
const sanitize = require('mongo-sanitize');
const spawn = require("child_process").spawn;

// Importing config/env variables
const config = require('../config/config');
const logger = require('../config/winston');

// Importing models
const models = require('../db/models');
const Center = models.center;
const Handler = models.handler;
const Polybag = models.polybag;
const User = models.user;


exports.getList = async (req, res) => {
	try {
		const user_id = req.session.user.id;
		const user = await User.findOne({ where: { user_id: user_id } });
		const center = await Center.findOne({ where: { center_id: user.center_id } });

		let polybags = {};
		if (center.type == 'Hospital') {
			polybags = await Polybag.findAll({ where: { from: user.center_id } });
		} else if (center.type == 'WMC') {
			polybags = await Polybag.findAll({ where: { to: user.center_id } });
		} else {
			logger.error('Invalid center type error');
			let status_code = 500;
			return res.status(status_code).json({
				status_code: status_code,
				message: HttpStatus.getStatusText(status_code),
				data: {}
			});
		}

		let message = 'Successfully retrieved polybags list.';
		logger.info(message);
		let status_code = 200;
		return res.status(status_code).json({
			status_code: status_code,
			message: message,
			data: polybags
		});
	} catch (error) {
		logger.error(error.toString());
		let status_code = 500;
		return res.status(status_code).json({
			status_code: status_code,
			message: HttpStatus.getStatusText(status_code),
			data: {}
		});
	}
}

exports.addPolybag = async (req, res) => {
	try {
		console.log(req.body);
		if (!req.body.to || !req.body.handler_id || !req.body.type || !req.body.weight) {
			logger.warn('Invalid parameters');
			let status_code = 400;
			return res.status(status_code).json({
				status_code: status_code,
				message: HttpStatus.getStatusText(status_code),
				data: {}
			});
		}

		const toCenter = await Center.findOne({ where: { center_id: req.body.to } });
		const bagHandler = await Handler.findOne({ where: { handler_id: req.body.handler_id } });
		if (!toCenter || !bagHandler) {
			logger.warn('Invalid parameters');
			let status_code = 400;
			return res.status(status_code).json({
				status_code: status_code,
				message: HttpStatus.getStatusText(status_code),
				data: {}
			});
		}

		const user_id = req.session.user.id;
		const user = await User.findOne({ where: { user_id: user_id } });
		const center = await Center.findOne({ where: { center_id: user.center_id } });

		// TODO: Add type to polybag, barcode_file_path
		let type = sanitize(req.body.type);
		let weight = sanitize(req.body.weight);

		const barcodeScriptPath = path.join(config.directory.BASE_DIR,'src','utils','scripts','barcode_generator.util.py');
		const barcodeGenProcess = spawn('python3', [barcodeScriptPath, center.center_id,type,weight]);
		barcodeGenProcess.stdout.on('data', (data) => {
			const barcodePath = data.toString();
			// TODO: Add weight to blockchain

			let polybag = new Polybag();
			polybag.barcode_image_path = barcodePath;
			polybag.from = user.center_id;
			polybag.to = toCenter.center_id
			polybag.handler_id = bagHandler.handler_id;
			polybag.status = 'Not delivered';
			polybag.lat = center.lat;
			polybag.lon = center.lon;
			//polybag = await polybag.save();

			let message = 'Successfully added new polybag';
			logger.info(message);
			let status_code = 200;
			return res.status(status_code).json({
				status_code: status_code,
				message: message,
				data: polybag
			});
		
		})		
	} catch (error) {
		logger.error(error.toString());
		let status_code = 500;
		return res.status(status_code).json({
			status_code: status_code,
			message: HttpStatus.getStatusText(status_code),
			data: {}
		});
	}
}

exports.getDetails = async (req, res) => {
	try {

		let message = '';
		logger.info(message);
		let status_code = 200;
		return res.status(status_code).json({
			status_code: status_code,
			message: message,
			data: {}
		});
	} catch (error) {
		logger.error(error.toString());
		let status_code = 500;
		return res.status(status_code).json({
			status_code: status_code,
			message: HttpStatus.getStatusText(status_code),
			data: {}
		});
	}
}

exports.updateLatLon = async (req, res) => {
	try {

		if (!req.body.polybagId || !req.body.lat || !req.body.lon) {
			logger.warn('Invalid parameters');
			let status_code = 400;
			return res.status(status_code).json({
				status_code: status_code,
				message: HttpStatus.getStatusText(status_code),
				data: {}
			});
		}

		let polybag = await Polybag.findOne({ where: { polybag_id: req.body.polybagId } });
		polybag.lat = sanitize(req.body.lat);
		polybag.lon = sanitize(req.body.lon);
		await polybag.save();

		let message = 'Successfully updated latitude and longitude of the polybag.';
		logger.info(message);
		let status_code = 200;
		return res.status(status_code).json({
			status_code: status_code,
			message: message,
			data: {}
		});
	} catch (error) {
		logger.error(error.toString());
		let status_code = 500;
		return res.status(status_code).json({
			status_code: status_code,
			message: HttpStatus.getStatusText(status_code),
			data: {}
		});
	}
}

exports.updateStatus = async (req, res) => {
	try {
		if (!req.body.barcode || !req.body.weight) {
			logger.warn('Invalid parameters');
			let status_code = 400;
			return res.status(status_code).json({
				status_code: status_code,
				message: HttpStatus.getStatusText(status_code),
				data: {}
			});
		}

		let polybag = await Polybag.findOne({ where: { barcode: req.body.barcode } });

		// TODO: Get polybag weight from blockchain
		let polybagWeight = 20;
		// Weight difference approximation 0.3 KG
		if (Math.abs(polybagWeight - req.body.weight) > 0.3) {
			// TODO: Alert officials and send mails
			logger.warn('Weight registered at hospital and WMC are not tallying.');
			let status_code = 400;
			return res.status(status_code).json({
				status_code: status_code,
				message: HttpStatus.getStatusText(status_code),
				data: {}
			});
		}

		// TODO: Calculate distance between polybag and WMC and validate

		polybag.status = 'Delivered';
		await polybag.save();

		let message = 'Successfully updated status of the polybag.';
		logger.info(message);
		let status_code = 200;
		return res.status(status_code).json({
			status_code: status_code,
			message: message,
			data: {}
		});
	} catch (error) {
		logger.error(error.toString());
		let status_code = 500;
		return res.status(status_code).json({
			status_code: status_code,
			message: HttpStatus.getStatusText(status_code),
			data: {}
		});
	}
}