require('dotenv').config();
const axios = require('axios');
const queryString = require('querystring');




const getFatSecretFood = (jwt, food_name) => {
    const queryTerm = queryString.escape(food_name);
    return axios.post(`https://platform.fatsecret.com/rest/server.api?method=foods.search&search_expression=${queryTerm}&format=json`,null, {
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

// getFatSecretFood(process.env.JWT).then(response =>{
//     getFatSecretFoodById(process.env.JWT, response.data.foods.food[0].food_id).then(response => {
//         console.log(JSON.stringify(response.data, null, 4))
//     })
// });

module.exports = {getFatSecretFood, getFatSecretFoodById};