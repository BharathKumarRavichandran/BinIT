const HttpStatus = require('http-status-codes');
const sanitize = require('mongo-sanitize');
const validator = require('validator');

// Importing config/env variables
const config = require('../../config/config');
const logger = require('../../config/winston');

// Importing models
const user = require('../../db/models/user.model');

// Importing utils


exports.registerUser = async (req, res) => {
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

exports.loginUser = async (req, res) => {
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

exports.checkSession = async (req, res) => {
    try{
        if(!req.query.email || !validator.isEmail(req.query.email)){
            logger.warn('Invalid parameters');
            let status_code = 400;
            return res.status(status_code).json({
                status_code: status_code,
                message: HttpStatus.getStatusText(status_code),
                data: {}
            });
        }
        
        let isLoggedIn = false;
        if (req.session.user && req.session.user.email) {
            if(req.session.user.email == req.query.email){
                logger.info(`${req.session.user.email} student logged in`);
                isLoggedIn = true;
            }
        }

        let status_code = 200;
        return res.status(status_code).json({
            status_code: status_code,
            message: HttpStatus.getStatusText(status_code),
            data: {
                isLoggedIn: isLoggedIn
            }
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

exports.logoutUser = async (req, res) => {
    try{
        let logout = req.session.destroy();

        logger.info(`User successfully logged out.`);
        let status_code = 200;
        return res.status(status_code).json({
            status_code: status_code,
            message: 'Successfully, logged out of your account.',
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