const userRouter = require('express').Router();

const userController = require('../controllers/user-controller');

userRouter.route('/:entry?')
    .post(userController.login, userController.register);

module.exports = userRouter;