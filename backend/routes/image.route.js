const express = require("express");
const router = express.Router();
const ImagesController = require("../controllers/images.controller");

const { verifyToken } = require("../middlewares/jwt.middleware");

const upload = require("../utils/imageupload.util");

router
    .post('/uploadimage', verifyToken, upload.single('image'), ImagesController.uploadImage)
    .get('/getallimages', ImagesController.getAllImages)
    .get('/getimage/:id', ImagesController.getImageById)
    .get('/getimage/:userid', ImagesController.getImageByUserId)

module.exports = router;
