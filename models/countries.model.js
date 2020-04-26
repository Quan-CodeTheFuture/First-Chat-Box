const mongoose = require('mongoose');

let countriesSchema = mongoose.Schema({
    Name:String,
    Country:String,
    CountryCode:String,
    Date:String,
    NewConfirmed:Number,
    NewDeaths: Number,
    NewRecovered:Number,
    Slug:String,
    TotalConfirmed:Number,
    TotalDeaths:Number,
    TotalRecovered:Number,
})

let Countries = mongoose.model('countries',countriesSchema);
module.exports = Countries;