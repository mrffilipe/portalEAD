const router = require('express').Router();
const multer = require('multer');

const mixClass = require('../controllers/mixClass-controller');
const classes = require('../controllers/class-controllers');
const sendArchive = require('../controllers/sendArchives-controller');
const multerConfig = require('../config/multer-config');

router.route('/auth')
    .get((req, res) => res.status(200).send('ok token'));

router.route('/mixclass/:id')
    .post(mixClass.store)
    .put(mixClass.update)
    .delete(mixClass.delete);

router.route('/class')
    .post(classes.store)
    .put(classes.update)
    .delete(classes.delete);

router.all('/upload')
    .post(multer(multerConfig).single('file'), sendArchive.uploadArchive);

module.exports = router;