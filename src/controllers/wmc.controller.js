const HttpStatus = require('http-status-codes');

// Importing config/env variables
const logger = require('../config/winston');

// Importing models
const Center = require('../models/center.model');


exports.getAccessLogs = async (req, res) => {
    try{

        let message = '';
        logger.info(message);
        let status_code = 200;
        return res.status(status_code).json({
            status_code: status_code,
            message: message,
            data: {}
        });
    } catch(error){
        logger.error(error.toString());
        let status_code = 500;
        return res.status(status_code).json({
            status_code: status_code,
            message: HttpStatus.getStatusText(status_code),
            data: {}
        });
    }
}