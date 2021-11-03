const playlistRouter = require('express').Router();
const playlistRouterAuth = require('express').Router();

const playlistController = require('../controllers/playlist-controller');
const { classRouter, classRouterAuth } = require('./class-route');

playlistRouterAuth.use('/:idplaylist?', classRouterAuth);
playlistRouterAuth.route('/')
    //.get(playlistController.index)
    .post(playlistController.store)
    .put(playlistController.update)
    .delete(playlistController.delete);


playlistRouter.use('/:idplaylist?', classRouter);
playlistRouter.route('/')
    .get(playlistController.index)

module.exports = { playlistRouter, playlistRouterAuth };