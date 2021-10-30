const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const userController = require('../controllers/user-controller');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/authenticatedTest', auth, (req, res) => res.status(200).send('ok token'));

module.exports = router;