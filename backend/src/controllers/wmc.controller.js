const HttpStatus = require('http-status-codes');

// Importing config/env variables
const logger = require('../config/winston');

// Importing models
const models = require('../db/models');
const User = models.user;
const Log = models.log;
const Center = models.center;

exports.getWMCList = async (req, res) => {
    try{
        const wmcList = await Center.findAll({ where: { type: "WMC" } });

        let message = 'Successfully retrieved Waste Management Center lists.';
        logger.info(message);
        let status_code = 200;
        return res.status(status_code).json({
            status_code: status_code,
            message: message,
            data: wmcList
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

exports.getAccessLogs = async (req, res) => {
    try{
        const user_id = req.session.user.id;

        const user = await User.findOne({ where: {user_id: user_id} });
        const logs = await Log.findAll({ where: { center_id: user.center_id } });

        let message = 'Successfully retrieved access logs for Waste Management Center.';
        logger.info(message);
        let status_code = 200;
        return res.status(status_code).json({
            status_code: status_code,
            message: message,
            data: logs
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