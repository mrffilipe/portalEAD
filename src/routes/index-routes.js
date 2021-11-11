const router = require('express').Router();

const { playlistRouter } = require('./playlist-route');
const userRoute = require('./userRoute');

let upload = require('../routes/upload');
router.use('/upload', upload)

router.use('/auth', userRoute);
router.use('/playlist', playlistRouter);

module.exports = router;