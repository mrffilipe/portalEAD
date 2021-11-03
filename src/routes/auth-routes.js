const router = require('express').Router();

const authMiddleware = require('../middlewares/auth');
const { mixClassRouterAuth } = require('./mixClass-route');

router.use(authMiddleware);
router.use('/mixclass', mixClassRouterAuth);

module.exports = router;