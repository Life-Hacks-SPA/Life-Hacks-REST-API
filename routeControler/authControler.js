const { Router } = require("express");
const router = Router();

const authService = require("../services/authService")

router.post("/register", async (req, res) => {
    try {
        let data = await authService.register(req.body);
        console.log(data);
        res.status(201).json(data)
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: err.message })
    }
})

module.exports = router;