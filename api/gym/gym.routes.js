const router = require("express").Router();
const controller = require("./gym.controller");

router.get("/", controller.getGym);
router.post("/", controller.createGym);

module.exports = router;
