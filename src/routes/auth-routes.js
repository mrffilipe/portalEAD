const router = require('express').Router();

const authMiddleware = require('../middlewares/auth');
const mixClassRoute = require('./mixClass-route');

router.use(authMiddleware);
router.use('/mixclass', mixClassRoute);

module.exports = router;