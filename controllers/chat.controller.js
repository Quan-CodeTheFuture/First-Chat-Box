let ChatUsers = require('../models/chatUsers.model');
module.exports.getChatBox = async(req,res) => {
    res.render('chat/index.pug')
}

module.exports.getAPI = async(req,res) => {
    let data = await ChatUsers.findById("5ea6925c680a2329282dad80");
    res.json({
        messages:data.messages,
        color:"dark"
    })
}

module.exports.postChatBox = async(req,res) => {
    let arrAPI = req.body;
    
    await ChatUsers.replaceOne({_id:"5ea6925c680a2329282dad80"},{
        messages:req.body,
        color:'dark'
    },{upsert:true})
    console.log(arrAPI);
    res.json({
        content:arrAPI
    });
}