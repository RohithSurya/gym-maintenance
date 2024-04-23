const router = require("express").Router();
const authentication = require("../middleware/authentication");

const controller = require("./user.controller");

router.get("/", authentication.verifyToken, controller.getUsers);
// router.post("/", controller.createUser);
router.post("/register", controller.registerUser);
router.post("/login", controller.loginUser);

module.exports = router;
