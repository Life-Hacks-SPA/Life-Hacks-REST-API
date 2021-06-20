const { Router } = require("express");
const router = Router();

const isAuth = require("../middlewares/isAuth");
const isGuest = require("../middlewares/isGuest");

router.get("/", (req, res) => {
    res.json({ message: "it works" })
})

module.exports = router;