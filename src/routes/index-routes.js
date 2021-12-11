const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');

const { playlistRouter } = require('./playlist-route');
const userRoute = require('./userRoute');

/*
 * Route doc
*/
const swagger = require('../config/swagger');
router.use('/doc', swaggerUi.serve, swaggerUi.setup(swagger));

let upload = require('../routes/upload');
router.use('/upload', upload)

router.use('/auth', userRoute);
router.use('/playlist', playlistRouter);

module.exports = router;