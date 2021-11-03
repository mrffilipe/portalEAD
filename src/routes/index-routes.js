const router = require('express').Router();

const { mixClassRouter } = require('./mixClass-route');
const userRoute = require('./userRoute');

router.use('/auth', userRoute);
router.use('/mixclass', mixClassRouter);

module.exports = router;