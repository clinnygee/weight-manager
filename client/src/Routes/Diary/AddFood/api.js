import axios from '../../../config/axios'

const searchFoodById = (category,foodName) => {
    console.log(category, foodName)
    return axios.get(`/api/search/${category}/${foodName}`)
};

const getFoodMeasurements = (foodId, measures) => {
    return axios.post(`/api/search/measurement/${foodId}`,{
        data: measures,
    })
};

const addFood = (foodMeasurementsMealAndDate) => {
    return axios.post('/api/food/add',{
        data: foodMeasurementsMealAndDate
    });
}

const deleteFood = (foodId, date) => {
    return axios.delete('/api/food/delete', {
        data: {foodId, date}
    });
}

export {searchFoodById, getFoodMeasurements, addFood, deleteFood};