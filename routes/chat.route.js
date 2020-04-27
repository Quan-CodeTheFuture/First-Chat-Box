const express = require("express");
const router = express.Router();
const controller = require("../controllers/chat.controller.js")
router.get("/interface",controller.getChatBox);
router.get("/api",controller.getAPI);
router.post("/interface", controller.postChatBox);
module.exports = router