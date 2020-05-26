import axios from '../../../config/axios'

const searchFoodById = (category,foodName) => {
    console.log(category, foodName)
    return axios.get(`/api/search/${category}/${foodName}`)
};

const getFoodMeasurements = (foodId, measures) => {

    // return axios({
    //     method: 'GET',
    //     url: `/api/search/measurement/${foodId}`,
    //     data: measures
    // }).then(res => { console.log( res)})
    // console.log(measures);
    return axios.post(`/api/search/measurement/${foodId}`,{
        data: measures,
    })
    // return fetch(`/api/search/measurement/${foodId}`,{
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json',
    //     },
    //     body: JSON.stringify(measures)
    // });
}

export {searchFoodById, getFoodMeasurements};