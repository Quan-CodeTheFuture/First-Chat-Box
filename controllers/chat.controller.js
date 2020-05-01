let fetch = require('node-fetch');
let ChatUsers = require('../models/chatUsers.model');
let imagePath = ''; 
module.exports.getChatBox = async(req,res) => {
    console.log(req.signedCookies.userId);
    res.render('chat/index.pug');
}

module.exports.getAPI = async(req,res) => {
    // console.log(await ChatUsers.find());
    // if(imagePath){
    //     path = imagePath;
    // }
    let data= await ChatUsers.find();
    let messages = [];
    for(let i = 0; i < data.length; i++){
        messages = data[i].messages
        for(let j = 0; j < messages.length; j++){
            if(messages[j].id !== req.signedCookies.userId){
                messages[j].position = "";
            } else {
                messages[j].position = "-reverse";
            }
        }
        await ChatUsers.updateOne({_id:data[i].id},{
            messages:messages
        })
    }



    let userMaster = await ChatUsers.findOne({_id:req.signedCookies.userId});
    let dataJson = {
        id:userMaster.id,
        messages:userMaster.messages,
        username:userMaster.username,
        imagePath:imagePath
    } 
    
    res.json(dataJson);
}

module.exports.postChatBox = async(req,res) => {
    let messages = req.body;
    imagePath = '';
    // console.log(messages);
    await ChatUsers.updateOne({_id:req.signedCookies.userId},{
        messages:messages
    })
    
    await ChatUsers.updateMany({_id:{"$ne":req.signedCookies.userId}},{
        messages:messages
    })

    // res.render('chat/index.pug');

    res.json({
        status:"success"
    });
}

module.exports.postAPI = async(req,res) => {
    // console.log(req.file);
    let path = req.file.path;
    path = path.split('\\').splice(1);
    path = path.join('/');
    // console.log(path);
    imagePath = path;
    
    res.redirect('/chat/interface');
}