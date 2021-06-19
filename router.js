const { Router } = require("express");
const router = Router();

const authControler = require("./routeControler/authControler");
const hacksControler = require("./routeControler/hacksControler");

router.use("/auth", authControler);
router.use("/hack", hacksControler)

module.exports = router;