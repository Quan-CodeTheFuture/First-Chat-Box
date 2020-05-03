let ChatUsers = require('../models/chatUsers.model');
const cloudinary = require("cloudinary").v2;

module.exports.getChatBox = async (req, res) => {
    res.render('chat/index.pug', {
    });
}

module.exports.getAPI = async (req, res) => {
    let dataUsersMaster = await ChatUsers.findOne({ _id: req.signedCookies.userId });
    res.json({
        status: "success",
        messages: dataUsersMaster.messages
    });
}

module.exports.postChatBox = async (req, res) => {
    try{
        let dataUsers = await ChatUsers.find();
        let dataMaster = await ChatUsers.findOne({ _id: req.signedCookies.userId });
        let indexMaster;
        let urlPath;
        // console.log(req.files.uploadFile);
        if (req.files) {
            urlPath = await cloudinary.uploader.upload(req.files.uploadFile.tempFilePath);
            urlPath = urlPath.url;
        }
        for (let i = 0; i < dataUsers.length; i++) {
            let messages = dataUsers[i].messages;
            let message = {};
            message.username = dataMaster.username;

            if (req.body.text) {
                message.content = req.body.text;
            } else {
                message.imagePath = urlPath;
            }

            if (dataUsers[i].id === req.signedCookies.userId) {
                indexMaster = i;
                message.pos = "-reverse";
            } else {
                message.pos = "";
            }

            messages.push(message);
            await ChatUsers.replaceOne({ _id: dataUsers[i].id }, {
                username: dataUsers[i].username,
                password: dataUsers[i].password,
                messages: messages
            }, { upsert: true })
        }
        if (req.files) {
            res.redirect('/chat/interface');
            return;
        }
        res.json({
            status: "success",
            messages: dataUsers[indexMaster].messages
        });
    } catch {
        console.log("Something went wrong");
    }
}
