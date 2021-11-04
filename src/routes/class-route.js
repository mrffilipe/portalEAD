const express = require('express');
const classRouter = express.Router({ mergeParams: true });
const classRouterAuth = express.Router({ mergeParams: true });

const classController = require('../controllers/class-controllers');

classRouterAuth.route('/class/:idclass?')
    //.get(classController.index)
    .post(classController.store)
    .put(classController.update)
    .delete(classController.delete);

classRouter.route('/class/:idclass?')
    .get(classController.index);

module.exports = { classRouter, classRouterAuth };