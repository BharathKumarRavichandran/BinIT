const router = require('express').Router();

// Importing controllers
const wmcController = require('../controllers/wmc.controller');

// Prefix route: /wmc
router.get('/logs/get', wmcController.getAccessLogs);

module.exports = router;