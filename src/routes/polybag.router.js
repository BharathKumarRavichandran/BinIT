const router = require('express').Router();

// Importing controllers
const polybagController = require('../controllers/polybag.controller');

// Prefix route: /polybag
router.get('/list/all', polybagController.getList);
router.post('/add', polybagController.addPolybag);

router.get('/details/get', polybagController.getDetails);
router.post('/latlon/update', polybagController.updateLatLon);
router.post('/status/update', polybagController.updateStatus);

module.exports = router;