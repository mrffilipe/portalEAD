const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const path = require('path');
const crypto = require('crypto');

const storage = new Storage()

async function uploadFile() {
    await storage.bucket('portal-ead-dev.appspot.com').upload(path.resolve(__dirname, "..", "..", "tmp", "uploads", "c86f91968c2c494f12e542b240e1c402-nature.jpg"), {
        destination: 'nome da minha img.jpg',
    });

    //console.log(`${filePath} uploaded to ${bucketName}`);
}

//uploadFile().catch(console.error);

const storageTypes = {
    local: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"));
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);
                file.key = `${hash.toString('hex')}-${file.originalname}`;
                cb(null, file.key);
            });
        }
    }),
    cloud: multer.diskStorage({
        google: storage,

    })
};

module.exports = {
    dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
    storage: storageTypes[process.env.STORAGE_TYPE],
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            "image/jpeg",
            "image/pjpeg",
            "image/png",
            "image/gif"
        ];

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type."));
        }
    }
}