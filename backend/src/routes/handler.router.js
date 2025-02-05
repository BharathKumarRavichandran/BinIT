const router = require('express').Router();

// Importing controllers
const handlerController = require('../controllers/handler.controller');

// Prefix route: /handler
router.get('/driver/list/all', handlerController.getDrivers);
router.get('/list/all', handlerController.getList);

module.exports = router;