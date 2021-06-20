const { Router } = require("express");
const router = Router();

const isAuth = require("../middlewares/isAuth");

const hackService = require("../services/hackService")

router.post("/create", isAuth, async (req, res) => {
    try {
        await hackService.create(req.body, res.locals.user.id);
        res.status(201).json({ message: "Created" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

router.get("/", async (req, res) => {
    try {
        let data = await hackService.getAll();
        res.status(200).json(data)
    } catch {
        res.sataus(400).json({ message: "Generate hacks - problem" });
    }
})

router.get("/details/:hackId", async (req, res) => {
    try {
        let data = await hackService.getById(req.params.hackId, res.locals.user.id);
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json({message: "Generate hacks by - problem"})
    }
})

module.exports = router;