import axios from '../../../config/axios'

const searchFoodById = (category,foodName) => {
    return axios.get(`/api/search/${category}/${foodName}`)
};

const getFoodMeasurements = (foodId) => {
    return axios.get(`/api/search/measurement/${foodId}`,{
        data:{

        }
    })
}

export {searchFoodById, getFoodMeasurements};