let ChatUsers = require('../models/chatUsers.model');
let imagePath = ''; 

module.exports.getChatBox = async(req,res) => {
    console.log(req.signedCookies.userId);
        res.render('chat/index.pug',{
    });
}

module.exports.getAPI = async(req,res) => {
    let dataUsersMaster = await ChatUsers.findOne({_id:req.signedCookies.userId});
    res.json({
        status:"success",
        messages:dataUsersMaster.messages
    });
}

module.exports.postChatBox = async(req,res) => {
    let dataUsers = await ChatUsers.find();
    let dataMaster = await ChatUsers.findOne({_id:req.signedCookies.userId});
    let indexMaster;
    if(req.file){
        imagePath = req.file.path;
        let temp = imagePath.split('\\');
        imagePath = temp.slice(1).join('/');
    }
    for(let i = 0; i < dataUsers.length; i++){
        let messages = dataUsers[i].messages;
        let message = {};
        message.username = dataMaster.username;

        if(req.body.text){
            message.content = req.body.text;
        } else {
            message.imagePath = imagePath;
        }
        
        if (dataUsers[i].id === req.signedCookies.userId){
            indexMaster = i;
            message.pos = "-reverse";
        } else {
            message.pos = "";
        }

        messages.push(message);
        await ChatUsers.replaceOne({_id:dataUsers[i].id},{
            username:dataUsers[i].username,
            password:dataUsers[i].password,
            messages:messages
        },{upsert:true})
    }
    if(req.file){
        res.redirect('/chat/interface');
        return;
    }
    res.json({
        status:"success",
        messages:dataUsers[indexMaster].messages
    });
}

module.exports.postAPI = async(req,res) => {
    // console.log(req.file);
}