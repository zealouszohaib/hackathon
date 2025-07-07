const router = require("express").Router();
const authRouter = require("./auth");
const uploadRouter = require("./upload");
const home = require("../controller/home");


router.use("/auth", authRouter);
router.use("/upload", uploadRouter);

router.get("/ping", home);


module.exports = router;
