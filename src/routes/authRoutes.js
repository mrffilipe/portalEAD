const router = require('express').Router();
const multer = require('multer');

const classList = require('../controllers/classList-controller');
const classes = require('../controllers/class-controllers');
const sendArchive = require('../controllers/sendArchives-controller');
const multerConfig = require('../config/multer-config');

router.route('/auth')
    .get((req, res) => res.status(200).send('ok token'));

router.route('/classlist/:id')
    .post(classList.create)
    .put(classList.update)
    .delete(classList.delete);

router.route(['/class', '/:id/newclass', '/:idList/updateclass/:idClass', '/:idList/deleteclass/:idClass'])
    .post(classes.create)
    .put(classes.update)
    .delete(classes.delete);

router.all('/upload')
    .post(multer(multerConfig).single('file'), sendArchive.uploadArchive);

module.exports = router;