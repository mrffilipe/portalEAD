const router = require('express').Router();

const multer = require('multer');
const multerConfig = require('../config/multer-config');

const sendArchive = require("../controllers/sendArchives-controller");

router.post("/upload", multer(multerConfig).single('file'), sendArchive.uploadArchive);

module.exports = router;