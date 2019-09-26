const HttpStatus = require('http-status-codes');

    // Importing models
    const models = require('../db/models');
    const Center = models.center;
    const User = models.user;

// Importing config/env variables
const logger = require('../config/winston');


exports.checkHospiAccess = async (req, res, next) => {
    try{
        const user_id = req.session.user.id;
        const user = await User.findOne({ where: { user_id: user_id } });
        const center = await Center.findOne({ where: { center_id: user.center_id } });

        if(center.type=='Hospital'){
            return next();
        }

        logger.info('Unauthorised access');
        let status_code = 401;
        return res.status(status_code).json({
            status_code: status_code,
            message: 'Unauthorised access',
            data: {}
        });
    } catch(error) {
        logger.error(error.toString());
        let status_code = 500;
        return res.status(status_code).json({
            status_code: status_code,
            message: HttpStatus.getStatusText(status_code),
            data: {}
        });
    }
}

exports.checkWMCAccess = async (req, res, next) => {
    try{
        const user_id = req.session.user.id;
        const user = await User.findOne({ where: { user_id: user_id } });
        const center = await Center.findOne({ where: { center_id: user.center_id } });

        if(center.type=='WMC'){
            return next();
        }

        logger.info('Unauthorised access');
        let status_code = 401;
        return res.status(status_code).json({
            status_code: status_code,
            message: 'Unauthorised access',
            data: {}
        });
    } catch(error) {
        logger.error(error.toString());
        let status_code = 500;
        return res.status(status_code).json({
            status_code: status_code,
            message: HttpStatus.getStatusText(status_code),
            data: {}
        });
    }
}