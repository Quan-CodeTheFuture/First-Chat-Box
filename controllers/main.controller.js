const fetch = require('node-fetch');
const Countries = require('../models/countries.model');
const Globals = require('../models/globals.model');
async function getAPIs(url) {
    let Url = fetch(url);
    Url = await Url;
    return await Url.json();
}


module.exports.getMainWeb = async (req, res) => {
    let listCountries = await Countries.find({});
    let global = await Globals.find();
    
    res.render('main/index', {
        countries: listCountries,
        global:global[0]
    });
}

module.exports.postMainWeb = async (req,res) => {
    let data = await getAPIs('https://api.covid19api.com/summary');
    let dataList = data.Global;
    await Globals.replaceOne({Name:"Globals"},{
        NewConfirmed: dataList.NewConfirmed,
        NewDeaths: dataList.NewDeaths,
        NewRecovered: dataList.NewRecovered,
        TotalConfirmed: dataList.TotalConfirmed,
        TotalDeaths: dataList.TotalDeaths,
        TotalRecovered: dataList.TotalRecovered,
        Name:'Globals'     
    },{upsert:true});
    
    dataList = data.Countries;
    for (let i = 0; i < dataList.length; i++){
        await Countries.replaceOne({CountryCode:dataList[i].CountryCode},{
            Country: dataList[i].Country,
            CountryCode: dataList[i].CountryCode,
            Date: dataList[i].Date,
            NewConfirmed: dataList[i].NewConfirmed,
            NewDeaths: dataList[i].NewDeaths,
            NewRecovered: dataList[i].NewRecovered,
            Slug: dataList[i].Slug,
            TotalConfirmed: dataList[i].TotalConfirmed,
            TotalDeaths: dataList[i].TotalDeaths,
            TotalRecovered: dataList[i].TotalRecovered,
            Name:dataList[i].Country
        },{upsert:true});
    }        
    res.redirect('/covid');
}

module.exports.searchCountry = async(req,res) =>{
    let listCountries = await Countries.find({});
    let global = await Globals.find();
    let q = req.query.q;
    let matchedCountry = listCountries.filter(value => value.Country.toLocaleLowerCase().indexOf(q.toLocaleLowerCase()) !== -1);
    
    res.render('main/index.pug',{
        countries:matchedCountry,
        global:global[0]
    })
}

module.exports.viewCountry = async(req,res) => {
    let findingCode = req.params.code;
    let listCountries = await Countries.find({});
    let foundCountry = listCountries.find(value => value.CountryCode === findingCode);
    res.render('main/view.pug',{
        country:foundCountry,
    });
}