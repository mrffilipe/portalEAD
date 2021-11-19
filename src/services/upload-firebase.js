const { Storage } = require('@google-cloud/storage');
const crypto = require('crypto');

const uploadFirebase = (req, res, next) => {

    if (process.env.STORAGE_TYPE == 'local') return next();
    if (!req.file) return next();

    const { originalname, mimetype, buffer } = req.file;

    const storage = new Storage();

    const bucket = storage.bucket(process.env.GOOGLE_FIREBASE_STORAGE_BUCKET);

    const hashName = crypto.randomBytes(16);
    const fileName = `${hashName.toString('hex')}-${originalname.split(' ').join('-')}`;

    const file = bucket.file(fileName);

    const streamUpload = file.createWriteStream({
        contentType: mimetype
    });

    streamUpload.on('error', (error) => {
        console.log(error);
    });

    streamUpload.on('finish', async () => {
        await file.makePublic();

        req.file.keyName = `${fileName}`;
        req.file.Url = `https://storage.googleapis.com/${process.env.GOOGLE_FIREBASE_STORAGE_BUCKET}/${fileName}`;

        next();
    });

    streamUpload.end(buffer);
}

module.exports = uploadFirebase;