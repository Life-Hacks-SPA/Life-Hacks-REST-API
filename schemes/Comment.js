const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User"
    },
    hack: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Hack"
    }
})

module.exports = mongoose.model("Comment", commentSchema);




