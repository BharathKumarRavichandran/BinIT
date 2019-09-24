const router = require('express').Router();

// Importing controllers
const polybagController = require('../controllers/polybag.controller');

// Prefix route: /polybag
router.get('/list/all', polybagController.getList);
router.post('/add', polybagController.addPolybag);

router.get('/details/get', polybagController.getDetails);
router.post('/details/update', polybagController.updateDetails);

module.exports = router;