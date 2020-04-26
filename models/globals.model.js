const mongoose = require('mongoose');

let globalsSchema = mongoose.Schema({
    Name:String,
    NewConfirmed: Number,
    NewDeaths: Number,
    NewRecovered:Number,
    TotalConfirmed: Number,
    TotalDeaths:Number,
    TotalRecovered: Number
})

let Globals = mongoose.model('globals', globalsSchema);
module.exports = Globals