const Hack = require("../schemes/Hack");

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

module.exports = {
    getAll,
    create,
}