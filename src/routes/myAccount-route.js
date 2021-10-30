const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const myAccount = require('../controllers/myAccount-controller');

router.get('/', auth, myAccount);

module.exports = router;

