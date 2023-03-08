const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    image: [{
        title: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        likedBy: {
            type: String,
            required: false
        },
        comment: [{
            commentBy: String,
            text: String,
        }]
    }],
    uploader: {
        type: String,
        ref: 'User'
    }
});

module.exports = mongoose.model("Image", imageSchema);