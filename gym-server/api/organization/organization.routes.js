const router = require("express").Router();

const controller = require("./organization.controller");

router.get("/", controller.getOrganizations);
router.post("/", controller.createOrganization);

module.exports = router;
