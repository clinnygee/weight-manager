var request = require("request");
require('dotenv').config();
const axios = require('axios');
const queryString = require('querystring');
const fetch = require('node-fetch')

console.log(process.env)
process.env.APPLICATION_ID = 89528380
process.env.APPLICATION_KEY = '3e8691e6b8b4b736b1914da7fa0e26cc'

keys = {
    app_id: process.env.APPLICATION_ID,
    app_key: process.env.APPLICATION_KEY,
    baseUrl: 'https://api.edamam.com/api/food-database/parser',    
    headers: { 'content-type': 'application/json'},
    
};

const searchByName = (category, foodName) => {
    const uriFoodName = queryString.escape(foodName);
    console.log(uriFoodName);
    
    
    const urlString = 
    `${keys.baseUrl}?ingr=${uriFoodName}&category=${category}&app_id=${keys.app_id}&app_key=${keys.app_key}`;

    console.log(urlString);

    return axios.get(urlString)

};

// FoodId is returned by SearchByName, it is the id of the food in the edamam database.
// The measurement array is full of Measurement URI's that are return from the food search,
// An example of a measurement Uri is 'cup'

const getFoodNutrients = (foodId, measureUri) => {
    const uri = `https://api.edamam.com/api/food-database/nutrients?app_id=${keys.app_id}&app_key=${keys.app_key}`
    const ingr = {
        ingredients: [
            {
                quantity: 1,
                measureURI: measureUri ? measureUri : 'http://www.edamam.com/ontologies/edamam.owl#Measure_gram',
                foodId: foodId,
            }
        ]
    }    
    
    return fetch(uri, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(ingr)
    })
};



module.exports = {searchByName, getFoodNutrients};