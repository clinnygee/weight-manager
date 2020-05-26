const axios = require('axios');

let x_app_id = '64046d49';
let x_app_key = '7ad509e6b419c744290fb4f459f68248';

function getFoodByName(foodName){
    axios({
        method: 'post',
        url: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
        headers:{
            'x-app-id': x_app_id,
            'x-app-key': x_app_key,
            'x-remote-user-d': 0,
        },
        data:{
            'query': `Smith's Crinkle Cut`,
            'timezone': 'US/Eastern'
        },
    }).then(res => {
        console.log(res);
    });
};

getFoodByName();

