const HttpStatus = require('http-status-codes');

// Importing config/env variables
const logger = require('../../config/winston');


exports.checkUserSession = (req, res, next) => {
    try{
        if (req.session.user && req.session.user.email) {
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