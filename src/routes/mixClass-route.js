const mixClassRouter = require('express').Router();
const mixClassRouterAuth = require('express').Router();

const mixClassController = require('../controllers/mixClass-controller');
const { classRouter, classRouterAuth } = require('./class-route');

mixClassRouterAuth.use('/:idmixclass?', classRouterAuth);
mixClassRouterAuth.route('/')
    //.get(mixClassController.index)
    .post(mixClassController.store)
    .put(mixClassController.update)
    .delete(mixClassController.delete);


mixClassRouter.use('/:idmixclass?', classRouter);
mixClassRouter.route('/')
    .get(mixClassController.index)

module.exports = { mixClassRouter, mixClassRouterAuth };