const router = require('express').Router();

const authMiddleware = require('../middlewares/auth');
const { playlistRouterAuth } = require('./playlist-route');

router.use(authMiddleware);
router.use('/playlist', playlistRouterAuth);

module.exports = router;