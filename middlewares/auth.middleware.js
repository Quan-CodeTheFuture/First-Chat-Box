const ChatUsers = require("../models/chatUsers.model");
module.exports.requireAuth = async(req,res,next) => {
    if(!req.signedCookies.userId){
        res.redirect('/auth/login');
        return;
    }
    var user = await ChatUsers.findById(req.signedCookies.userId);
    if(!user){
        res.redirect('/auth/login');
        return;
    }
    res.locals.user = user;
    next();
}