const mixClassRouter = require('express').Router();

const mixClassController = require('../controllers/mixClass-controller');
const classRoute = require('./class-route');

mixClassRouter.use('/:idmixclass?', classRoute);
mixClassRouter.route('/')
    .get(mixClassController.index)
    .post(mixClassController.store)
    .put(mixClassController.update)
    .delete(mixClassController.delete);

module.exports = mixClassRouter;