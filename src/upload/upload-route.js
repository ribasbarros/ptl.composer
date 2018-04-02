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
        cb(null, guid.raw().substring(0, 6) + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })

router.post('/', [authService.authorize, upload.single('file')], controller.post);
router.post('/approve', controller.authenticate, controller.approve);
router.post('/rejected', authService.authorize, controller.rejected);

module.exports = router;