const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const classList = require('../controllers/classList-controller');

router.post('/newclasslist', auth, classList.create);
router.get('/listclasslist', classList.list);
router.put('/updateclasslist/:id', auth, classList.update);
router.delete('/deleteclasslist/:id', auth, classList.delete);

module.exports = router;