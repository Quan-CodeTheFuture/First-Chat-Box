const express = require("express");
var multer  = require('multer');
var upload = multer({ dest: './public/uploads/' })

const router = express.Router();
const controller = require("../controllers/chat.controller.js")
router.get("/interface",controller.getChatBox);
router.get("/api",controller.getAPI);
router.post("/api",upload.single('uploadFile'),controller.postAPI);
router.post("/interface", controller.postChatBox);
module.exports = router