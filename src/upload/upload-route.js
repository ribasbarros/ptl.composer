const express = require('express');
const guid = require('guid')
const router = express.Router();
const controller = require('./upload-controller');
const authService = require('../authenticator/auth-service');

const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, guid.raw().substring(0, 6))
    }
})

const upload = multer({ storage: storage })

router.post('/', upload.single('file'), controller.post);

module.exports = router;