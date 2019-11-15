const router = require('express').Router();

// Importing controllers
const userController = require('../../controllers/auth/user.controller');

// Importing middlewares
const authMiddleware = require('../../middlewares/auth/user.middleware');
const checkUserSession = authMiddleware.checkUserSession;

// Session routes
router.get('/session/check', userController.checkSession);

// Auth routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/logout', checkUserSession, userController.logoutUser);

module.exports = router;