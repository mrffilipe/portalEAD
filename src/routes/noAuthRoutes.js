const router = require('express').Router();

const userController = require('../controllers/user-controller');
const mixClass = require('../controllers/mixClass-controller');
const classes = require('../controllers/class-controllers');

router.route('/auth/:opt?')
    .post(userController.login, userController.register);

router.route('/mixclass')
    .get(mixClass.index);

router.route('/:id/class')
    .get(classes.index);

module.exports = router;