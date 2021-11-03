const express = require('express');
const classRouter = express.Router({ mergeParams: true });

const classController = require('../controllers/class-controllers');

classRouter.route('/class/:idclass?')
    .get(classController.index)
    .post(classController.store)
    .put(classController.update)
    .delete(classController.delete);

module.exports = classRouter;