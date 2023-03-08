const { RESPONSES, RESPONSE_STATUS, RESPONSE_MESSAGES } = require("../constants/constants");
const Image = require("../models/image.model");

exports.uploadImage = async (req, res) => {
    try {
        const { userid, title } = req.body;
        if (!userid) {
            return res.status(RESPONSE_STATUS.ERROR).json({
                response: RESPONSES.ERROR,
                message: RESPONSE_MESSAGES.MISSING_FIELDS
            });
        }
        const { file } = req;
        if (!file) {
            return res.status(RESPONSE_STATUS.ERROR).json({
                response: RESPONSES.ERROR,
                message: RESPONSE_MESSAGES.IMAGE_MISSING,
            });
        }
        const imgUrl = file.path;
        const imgData = {
            title: title,
            url: imgUrl
        };

        const userExistInImage = await Image.findOne({ uploader: userid });
        if (!userExistInImage) {
            await new Image({ uploader: userid })
                .save();
        }

        const saved = await Image.updateOne({ uploader: userid }, { $push: { image: imgData } });

        if (saved.modifiedCount !== 0) {
            return res.status(RESPONSE_STATUS.SUCCESS).json({
                response: RESPONSES.SUCCESS,
                message: RESPONSE_MESSAGES.SUCCESS,
            });
        } else {
            return res.status(RESPONSE_STATUS.ERROR).json({
                response: RESPONSES.ERROR,
                message: RESPONSE_MESSAGES.NO_IMAGE_UPLOADED,
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(RESPONSE_STATUS.ERROR).json({
            response: RESPONSES.ERROR,
            message: err.message,
        });
    }
}

exports.getAllImages = async (req, res) => {
    try {
        const images = await Image.find({});
        const imageArray = [];

        for (const img of images) {
            for (const i of img.image)
                imageArray.push(i);
        }

        if (imageArray.length) {
            return res.status(RESPONSE_STATUS.SUCCESS).json({
                response: RESPONSES.SUCCESS,
                message: RESPONSE_MESSAGES.SUCCESS,
                data: imageArray
            });
        } else {
            return res.status(RESPONSE_STATUS.ERROR).json({
                response: RESPONSES.ERROR,
                message: RESPONSES.NO_IMAGE_FOUND,
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(RESPONSE_STATUS.ERROR).json({
            response: RESPONSES.ERROR,
            message: err.message,
        });
    }
}

exports.getImageById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(RESPONSE_STATUS.ERROR).json({
                response: RESPONSES.ERROR,
                message: RESPONSE_MESSAGES.MISSING_FIELDS
            });
        }
        const foundImg = await Image.findOne({ "image._id": id });
        if (foundImg) {
            return res.status(RESPONSE_STATUS.SUCCESS).json({
                response: RESPONSES.SUCCESS,
                message: RESPONSE_MESSAGES.SUCCESS,
                data: foundImg
            });
        } else {
            return res.status(RESPONSE_STATUS.ERROR).json({
                response: RESPONSES.ERROR,
                message: RESPONSES.NO_IMAGE_FOUND,
            });
        }

    } catch (err) {
        console.log(err);
        return res.status(RESPONSE_STATUS.ERROR).json({
            response: RESPONSES.ERROR,
            message: err.message,
        });
    }

}

exports.getImageByUserId = async (req, res) => {
    try {
        const { userid } = req.params;
    } catch (err) {

    }
}

exports.deleteImage = async (req, res) => {

}

exports.likeImage = async (req, res) => {

}

exports.commentOnImage = async (req, res) => {

}