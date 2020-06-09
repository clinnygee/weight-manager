const axios = require('axios');



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

