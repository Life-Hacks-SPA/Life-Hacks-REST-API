const { Router } = require("express");
const router = Router();

const authControler = require("./routeControler/authControler");
const hacksControler = require("./routeControler/hacksControler");
const commentControler = require("./routeControler/commentControler");

const isAuth = require("./middlewares/isAuth");

router.use("/auth", authControler);
router.use("/hack", hacksControler);
router.use("/comment", isAuth, commentControler);

module.exports = router;