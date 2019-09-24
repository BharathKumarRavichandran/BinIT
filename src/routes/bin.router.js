const router = require('express').Router();

// Importing controllers
const binController = require('../controllers/bin.controller');

// Prefix route: /bin
router.get('/list/all', binController.getList);
router.get('/details/get', binController.getDetails);
router.post('/details/update', binController.updateDetails);
router.post('/weight/update', binController.updateWeight);

module.exports = router;