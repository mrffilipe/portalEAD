const router = require('express').Router();

const { playlistRouter } = require('./playlist-route');
const userRoute = require('./userRoute');

router.use('/auth', userRoute);
router.use('/playlist', playlistRouter);

module.exports = router;