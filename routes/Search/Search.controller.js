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
        console.log('hit measurement route');
        console.log(req.data);
        console.log(req.body);
        Promise.all([
            EdamamApi.getFoodNutrients(req.params.foodId),
            EdamamApi.getFoodNutrients(req.params.foodId, req.body.data.uri),
        ]).then(([gram, search]) => {
            Promise.all([
                gram.json(),
                search.json()
            ]).then(([parsedGram, parsedSearch]) => {
                // console.log()
                responseJson = [];
                responseJson.push(parsedGram);
                responseJson.push(parsedSearch);
                res.json(responseJson);
            })
        })
    }
};

module.exports = SearchController;