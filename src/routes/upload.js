const router = require('express').Router();
const multer = require('multer');

const multerConfig = require('../config/multer-config');

router.post('/', multer(multerConfig).single('file'), (req, res) => {
    const { originalname: name, size, filename: key, location: url = "" } = req.file;

    return res.status(200).send(req.file);
});

module.exports = router;