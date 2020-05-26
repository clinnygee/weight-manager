const {User, Weight, BodyMeasurement, Settings, Goals} = require('../../database').models;
const FatSecretApi = require('../../FatSecret/API/fatsecret');
const EdamamApi = require('../../FatSecret/API/index');

const SearchController ={
    async byId(req, res){
        console.log('Hit the by ID route');
        console.log(req.params.category);
        console.log(req.params.foodName);
        
        // FatSecretApi.getFatSecretFood(process.env.JWT, req.params.foodName).then(apiRes => {
        //     console.log(apiRes);

        //     res.json(apiRes.data);
        // })
        EdamamApi.searchByName(req.params.category, req.params.foodName).then(apiRes => {
            console.log(apiRes)
            res.json(apiRes.data)
        })
    },
    async Measurement(req, res){
        console.log(req.params.foodId);
    }
};

module.exports = SearchController;