const ChatUsers = require("../models/chatUsers.model")
module.exports.getLogin = (req,res) => {
    res.render("auth/login.pug")
}

module.exports.postLogin = async (req,res) => {
    let email = req.body.email;
    let password = req.body.password;
    // console.log(email);
    let user = await ChatUsers.findOne({email:email});
    if (!user){
        res.render("auth/login",{
            errors:['user does not exist']
        })
        return;
    }
    if(user.password !== password){
        res.render("auth/login",{
            errors:["Wrong password"]
        })
        return;
    }

    res.cookie('userId', user.id,{signed:true});
    res.redirect("/chat/interface");
}