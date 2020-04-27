const mongoose = require('mongoose');
const chatUsersSchema = mongoose.Schema({
    messages:Array,
    color:String
})

let ChatUsers = mongoose.model('chatusers',chatUsersSchema);
module.exports = ChatUsers;