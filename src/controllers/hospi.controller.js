const HttpStatus = require('http-status-codes');

// Importing config/env variables
const logger = require('../config/winston');

// Importing models
const models = require('../db/models');
const User = models.user;
const Log = models.log;


exports.getAccessLogs = async (req, res) => {
    try{
        const user_id = req.session.user.id;

        const user = await User.findOne({ where: {user_id: user_id} });
        const logs = await Log.findAll({ where: { center_id: user.center_id } });

        let message = 'Successfully retrieved access logs for hospital.';
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