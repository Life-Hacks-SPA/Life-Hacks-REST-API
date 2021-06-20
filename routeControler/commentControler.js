const { Router } = require("express");
const router = Router();

const commentService = require("../services/commentService");

router.post("/create", async (req, res) => {
    try {
        await commentService.create(req.body, res.locals.user)
        res.status(201).json({});
    } catch (err) {
        console.log(err)
        res.status(400).json({message: err.message});
    }
})


module.exports = router;