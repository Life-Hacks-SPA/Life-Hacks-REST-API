const Comment = require("../schemes/Comment");
const Hack = require("../schemes/Hack");

async function create(data, userObj) {
    let { value, hack } = data;

    if (value.trim() == "") {
        throw { message: "Value is required!" };
    }

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

async function deleteComment(commentId, userId) {
    let comment = await Comment.findOne({ _id: commentId });

    if (comment.owner != userId) {
        throw { message: "Unauthorized" }
    }

    let [hack, pr] = await Promise.all([
        Hack.findOne({ _id: comment.hack }),
        Comment.deleteOne({ _id: commentId })
    ])
    
    hack.comments = hack.comments.filter(x => x.toString() != comment._id);
    return Hack.updateOne({ _id: comment.hack }, hack);
}

module.exports = {
    create,
    deleteComment,
}