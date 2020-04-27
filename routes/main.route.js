const express = require("express");
const router = express.Router();
const controller = require("../controllers/main.controller");
router.get("/",controller.getMainWeb);
router.post("/",controller.postMainWeb);
router.get("/search",controller.searchCountry);
router.get("/view/:code", controller.viewCountry);
module.exports = router;