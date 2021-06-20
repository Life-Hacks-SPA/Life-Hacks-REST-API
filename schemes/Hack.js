const mongoose = require("mongoose");

const hackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        minLength: 6,
    },
    ownerId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User"
    },
    hacks: [{
        type: mongoose.Types.ObjectId,
        ref: "Comment"
    }]
})

module.exports = mongoose.model("Hack", hackSchema);