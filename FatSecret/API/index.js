var request = require("request");
require('dotenv').config();
const axios = require('axios');
const queryString = require('querystring');

keys = {
    app_id: process.env.APPLICATION_ID,
    app_key: process.env.APPLICATION_KEY,
    baseUrl: 'https://api.edamam.com/api/food-database/parser',    
    headers: { 'content-type': 'application/json'},
    
};

const searchByName = (foodName) => {
    const uriFoodName = queryString.escape(foodName);
    console.log(uriFoodName);
    const urlString = `${keys.baseUrl}?nutrition-type=logging&ingr=${uriFoodName}&app_id=${keys.app_id}&app_key=${keys.app_key}`;

    console.log(urlString);

    axios.get(urlString).then(response => {
        // console.log(response);
        console.log('following is parsed-------------------------------')
        console.log(JSON.stringify(response.data.parsed, null, 4));
        // console.log(response.data.parsed[0].food.nutrients);
        // console.log(response.data.parsed.)
        console.log('following is hints ----------------');
        console.log(JSON.stringify(response.data.hints, null, 4));
    })

};

searchByName('flour');