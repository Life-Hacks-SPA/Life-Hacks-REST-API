const Hack = require("../schemes/Hack");
const Comment = require("../schemes/Comment");

function getAll() {
    return Hack.find({});
}

async function create(data, userId) {
    let { name, imageUrl, description } = data;

    if (name == "" || imageUrl == "" || description == "") {
        throw { message: "All fields are required!" }
    }

    if (description < 6) {
        throw { message: "Description must be at least 6 characters long!" }
    }

    if (!imageUrl.startsWith("http")) {
        throw { message: "Invalid URL" }
    }

    let post = await Hack.findOne({ name: name.trim() });
    console.log(userId)

    if (post) {
        throw { message: "This post already exist!" }
    }

    let hackObj = new Hack({
        name: name.trim(),
        imageUrl: imageUrl.trim(),
        description: description.trim(),
        ownerId: userId,
    })

    return hackObj.save()
}

async function getById(hackId, userId) {
    return Hack.findOne({ _id: hackId }).populate("comments").populate("ownerId");
}

async function update(hackId, userId, data) {
    let hack = await Hack.findOne({ _id: hackId });

    if (hack.ownerId != userId) {
        throw { message: "Unauthorized" }
    }

    let { name, imageUrl, description } = data;

    if (name == "" || imageUrl == "" || description == "") {
        throw { message: "All fields are required!" }
    }

    if (description < 6) {
        throw { message: "Description must be at least 6 characters long!" }
    }

    if (!imageUrl.startsWith("http")) {
        throw { message: "Invalid URL" }
    }

    return Hack.updateOne({ _id: hackId }, { name: name.trim(), imageUrl: imageUrl.trim(), description: description.trim() })
}

async function deleteHack(hackId, userId) {
    let hack = await Hack.findOne({ _id: hackId });

    if (hack.ownerId != userId) {
        throw { message: "Unauthorized" }
    }

    return Promise.all([
        Hack.deleteOne({ _id: hackId }),
        Comment.deleteMany({ hack: hack._id })
    ])
}

function getProfileData(userId){
    return Hack.find({ ownerId: userId });
}

module.exports = {
    getAll,
    create,
    getById,
    update,
    deleteHack,
    getProfileData
}