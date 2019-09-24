const router = require('express').Router();

// Importing controllers
const hospiController = require('../controllers/hospi.controller');

// Prefix route: /hospi
router.get('/logs/get', hospiController.getAccessLogs);

module.exports = router;