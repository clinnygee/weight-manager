require('dotenv').config();
const axios = require('axios');
const queryString = require('querystring');

function getOAuthParameters(){
    const timestamp = Math.round(new Date().getTime() / 1000);
    return {
        oauth_consumer_key: process.env.CLIENT_ID,
    }
}



const getFatSecretFood = (jwt) => {
    return axios.post('https://platform.fatsecret.com/rest/server.api?method=foods.search&search_expression=flour&format=json',null, {
    headers:{
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json',
    }
})
};

const getFatSecretFoodById = (jwt, id) => {
    return axios.post(`https://platform.fatsecret.com/rest/server.api?method=food.get&food_id=${id}&format=json`,null,{
        headers: {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json'
        }
    })
}

getFatSecretFood(process.env.JWT).then(response =>{
    getFatSecretFoodById(process.env.JWT, response.data.foods.food[0].food_id).then(response => {
        console.log(JSON.stringify(response.data, null, 4))
    })
});