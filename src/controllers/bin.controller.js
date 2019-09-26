const HttpStatus = require('http-status-codes');

// Importing config/env variables
const logger = require('../config/winston');

// Importing models
const models = require('../db/models');
const Bin = models.bin;
const User = models.user;


exports.getList = async (req, res) => {
    try{
        const user_id = req.session.user.id;
        const user = await User.findOne({ where: { user_id: user_id } });
        const bins = await Bin.findAll({ where: { center_id: user.center } });

        let message = 'Successfully retrieved bins list.';
        logger.info(message);
        let status_code = 200;
        return res.status(status_code).json({
            status_code: status_code,
            message: message,
            data: bins
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

exports.getDetails = async (req, res) => {
    try{
        if(!req.params.binId){
            logger.warn('Invalid parameters');
            let status_code = 400;
            return res.status(status_code).json({
                status_code: status_code,
                message: HttpStatus.getStatusText(status_code),
                data: {}
            });
        }

        const bin_id = req.params.binId;
        const bin = await Bin.findOne({ where: { bin_id: bin_id } });

        let message = 'Successfully retrieved bin details.';
        logger.info(message);
        let status_code = 200;
        return res.status(status_code).json({
            status_code: status_code,
            message: message,
            data: bin
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

exports.updateDetails = async (req, res) => {
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

exports.updateWeight = async (req, res) => {
    try{
        if(!req.body.binId || !req.body.weight){
            logger.warn('Invalid parameters');
            let status_code = 400;
            return res.status(status_code).json({
                status_code: status_code,
                message: HttpStatus.getStatusText(status_code),
                data: {}
            });
        }

        const bin_id = req.body.binId;
        const weight = req.body.weight;
        let bin = await Bin.findOne({ where: { bin_id: bin_id } });
        if(!bin){
            logger.warn(`Bin doesn't exists.`);
            let status_code = 400;
            return res.status(status_code).json({
                status_code: status_code,
                message: HttpStatus.getStatusText(status_code),
                data: {}
            });
        }
        bin.weight = weight;
        bin = await bin.save();

        let message = 'Successfully updated weight.';
        logger.info(message);
        let status_code = 200;
        return res.status(status_code).json({
            status_code: status_code,
            message: message,
            data: bin
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