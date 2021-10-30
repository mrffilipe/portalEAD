const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const classes = require('../controllers/class-controllers');

router.post('/:id/newclass', auth, classes.create);
router.get('/:id/listclass', auth, classes.list);
router.put('/:idList/updateclass/:idClass', auth, classes.update);
router.delete('/:idList/deleteclass/:idClass', auth, classes.delete);

module.exports = router;