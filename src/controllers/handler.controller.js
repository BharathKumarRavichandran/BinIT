const HttpStatus = require('http-status-codes');

// Importing config/env variables
const logger = require('../config/winston');

// Importing models
const models = require('../db/models');
const Handler = models.handler;
const User = models.user;


exports.getList = async (req, res) => {
    try{
        const user_id = req.session.user.id;

        const user = await User.findOne({ where: {user_id: user_id} });
        const handlers = await Handler.findAll(
            {
                //attributes: exclude['finger_hash','createdAt','updatedAt'],
                where: { center_id: user.center_id }
            }
        );

        let message = 'Successfully retrieved handlers.';
        logger.info(message);
        let status_code = 200;
        return res.status(status_code).json({
            status_code: status_code,
            message: message,
            data: handlers
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