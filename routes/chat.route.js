const express = require("express");
var multer  = require('multer');
var upload = multer({ dest: './public/uploads/' })

const router = express.Router();
const controller = require("../controllers/chat.controller.js")
router.get("/interface",controller.getChatBox);
router.get("/api",controller.getAPI);
router.post("/interface",upload.single('uploadFile'), controller.postChatBox);
module.exports = router