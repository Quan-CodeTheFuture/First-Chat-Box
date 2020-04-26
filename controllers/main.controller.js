const fetch = require('node-fetch');
const Countries = require('../models/countries.model');
const Globals = require('../models/globals.model');
async function getAPIs(url) {
    let Url = fetch(url);
    Url = await Url;
    return await Url.json();
}


module.exports.getMainWeb = async (req, res) => {
    let data = await getAPIs('https://api.covid19api.com/summary');
    res.render('main/index', {
        countries: data.Countries
    });
}

module.exports.postMainWeb = async (req,res) => {
    let data = await getAPIs('https://api.covid19api.com/summary');
    let dataList = data.Global;
    Globals.replaceOne({Name:"Globals"},{
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
    

    res.redirect('/');
}
