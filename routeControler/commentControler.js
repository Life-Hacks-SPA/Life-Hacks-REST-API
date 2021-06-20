const { Router } = require("express");
const router = Router();

const commentService = require("../services/commentService");

router.post("/create", async (req, res) => {
    try {
        await commentService.create(req.body, res.locals.user)
        res.status(201).json({});
    } catch (err) {
        res.status(400).json({message: err.message});
    }
})

router.delete("/delete/:commentId", async (req, res) => {
    try {
        await commentService.deleteComment(req.params.commentId, res.locals.user.id);
        res.status(201).json({});
    } catch (err) {
        res.status(400).json({message: err.message});
    }
})


module.exports = router;