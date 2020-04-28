const mongoose = require('mongoose');
const chatUsersSchema = mongoose.Schema({
    email:String,
    password:String,
    messages:Array,
})

let ChatUsers = mongoose.model('chatusers',chatUsersSchema);
module.exports = ChatUsers;