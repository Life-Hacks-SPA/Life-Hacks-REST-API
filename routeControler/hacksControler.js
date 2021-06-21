const { Router } = require("express");
const router = Router();

const isAuth = require("../middlewares/isAuth");

const hackService = require("../services/hackService")

router.post("/create", isAuth, async (req, res) => {
    try {
        let data = await hackService.create(req.body, res.locals.user.id);
        res.status(201).json({ message: "Created", objectId: data._id });
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
        res.status(400).json({ message: "Generate hacks details- problem" })
    }
})

router.put("/update/:hackId", isAuth, async (req, res) => {
    try {
        await hackService.update(req.params.hackId, res.locals.user.id, req.body);
        res.status(201).json({});
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.delete("/delete/:hackId", isAuth, async (req, res) => {
    try {
        await hackService.deleteHack(req.params.hackId, res.locals.user.id);
        res.status(201).json({});
    } catch (err) {
        res.status(400).json({ message: "Delete hack - problem" })
    }
})

router.get("/profile/:profileId", isAuth, async (req, res) => {
    try {
        data = await hackService.getProfileData(req.params.profileId);
        res.status(201).json(data);
    } catch (err) {
        res.status(400).json({ message: "Get profile page - problem" })
    }
})

module.exports = router;