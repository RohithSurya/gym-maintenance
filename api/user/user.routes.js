const router = require("express").Router();

const controller = require("./user.controller");

router.get("/", controller.getUsers);
router.post("/", controller.createUser);

module.exports = router;
