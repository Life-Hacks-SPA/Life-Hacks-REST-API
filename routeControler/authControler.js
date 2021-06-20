const { Router } = require("express");
const router = Router();

const authService = require("../services/authService")

router.post("/register", async (req, res) => {
    try {
        let data = await authService.register(req.body);
        res.status(201).json(data)
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: err.message })
    }
})

router.post("/login", async (req, res) => {
    try {
        let data = await authService.login(req.body);
        console.log(res.locals.user)
        res.status(201).json(data)
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: err.message })
    }
})

router.get("/logout", (req, res) => {
    res.locals.user = ""
    res.status(200).json()
})



module.exports = router;