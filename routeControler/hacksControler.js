const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
    res.json({ message: "it works" })
})

module.exports = router;