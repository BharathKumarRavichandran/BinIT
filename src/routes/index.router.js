const router = require('express').Router();

// Importing middlewares
const authMiddleware = require('../middlewares/auth/user.middleware');
const checkUserSession = authMiddleware.checkUserSession;

// Importing routers
const authRouter = require('./auth/index.router');
const binRouter = require('./bin.router');
const handlerRouter = require('./handler.router');
const hospiRouter = require('./hospi.router');
const polybagRouter = require('./polybag.router');
const wmcRouter = require('./wmc.router');

// Defining routes
router.use('/auth', authRouter);
router.use('/bin', checkUserSession, binRouter);
router.use('/handler', checkUserSession, handlerRouter);
router.use('/hospi', checkUserSession, hospiRouter);
router.use('/polybag', checkUserSession, polybagRouter);
router.use('/wmc', checkUserSession, wmcRouter);

module.exports = router;