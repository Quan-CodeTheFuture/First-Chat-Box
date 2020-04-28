let fetch = require('node-fetch');
let ChatUsers = require('../models/chatUsers.model');
module.exports.getChatBox = async(req,res) => {
    console.log(req.signedCookies.userId);
    res.render('chat/index.pug');
}

module.exports.getAPI = async(req,res) => {
    // console.log(await ChatUsers.find());
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
    res.json({
        id:userMaster.id,
        messages:userMaster.messages,
        email:userMaster.email
    });
}

module.exports.postChatBox = async(req,res) => {
    let messages = req.body;
    // console.log(messages);

    await ChatUsers.updateOne({_id:req.signedCookies.userId},{
        messages:messages
    })
    
    await ChatUsers.updateMany({_id:{"$ne":req.signedCookies.userId}},{
        messages:messages
    })

    // res.render('chat/index.pug');

    res.send();
}