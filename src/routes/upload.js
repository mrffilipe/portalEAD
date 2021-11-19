const router = require('express').Router();
const multer = require('multer');

const multerConfig = require('../config/multer-config');
const uploadFirebase = require('../services/upload-firebase');

router.post('/', multer(multerConfig).single('file'), uploadFirebase, (req, res) => {
    const { originalname, size, mimetype, keyName } = req.file;

    let { Url } = req.file;

    if (!Url && process.env.STORAGE_TYPE == 'local') {
        Url = `${process.env.APP_URL}:${process.env.LOCAL_PORT}/files/${keyName}`;
    }

    return res.status(200).send({
        originalname, size, mimetype, keyName, Url
    });
});

module.exports = router;