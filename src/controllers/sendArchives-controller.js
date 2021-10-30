const multer = require('multer');
const multerConfig = require('../config/multer-config');

exports.uploadArchive = /*multer(multerConfig).single('file'),*/ async (req, res) => {
    try {
        const { originalname: name, size, key, location: url = "" } = req.file;

        //console.log({ name, size, key, url })

        return res.status(201).send({ message: 'Upload sucess!', name, size, key, url });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Upload failed!' });
    }
}