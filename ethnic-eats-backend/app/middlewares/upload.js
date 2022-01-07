const multer = require('multer');
const path = require('path');

const storge = multer.diskStorage({
    destination: function (req, file, cb) {
        if (
            path.extname(file.originalname.toLowerCase()) === ".png" ||
            ".jpg" ||
            ".jpeg" ||
            ".svg"

        ) {
            cb(null, path.join('uploads', "photos"));
        } else cb(null, path.join('uploads', "others"));
    },
    filename: function (req, file, cb) {
        let random = (Math.random() + 1).toString(36).substring(7);

        cb(null, random + "-" + file.originalname);
    },
});

exports.upload = multer({
    fileFilter: function (req, file, cb) {
        if (
            path.extname(file.originalname.toLowerCase()) === ".png" ||
            ".jpg" ||
            ".jpeg" ||
            ".svg"
        )
            cb(null, true);
        else cb(null, false);
    },
    storage: storge,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5mb max
});
