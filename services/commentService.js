const Comment = require("../schemes/Comment");
const Hack = require("../schemes/Hack");

async function create(data, userObj) {
    let { value, hack } = data;

    if (value.trim() == "") {
        throw { message: "Value is required!" };
    }

    console.log(userObj)

    let commentObj = new Comment({
        value: value.trim(),
        hack,
        owner: userObj.id,
        username: userObj.username
    })

    let { _id } = await commentObj.save();

    const curHack = await Hack.findOne({ _id: hack })
    curHack.comments.push(_id);
    return Hack.updateOne({ _id: hack }, curHack)
}

module.exports = {
    create,
}