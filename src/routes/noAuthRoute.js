const router = require('express').Router();

const userController = require('../controllers/user-controller');
const classList = require('../controllers/classList-controller');
const classes = require('../controllers/class-controllers');

router.route('/auth')
    .post([userController.register, userController.login]);

router.route('/classlist')
    .get(classList.list);

router.route('/:id/class')
    .get(classes.list);

module.exports = router;