import axios from '../../config/axios';

// axios.defaults.baseURL = 'http://localhost:8080'

// axios.create({baseURL: 'http://localhost:8080', withCredentials: true})


export const logIn = (credentials) => {
    return axios.post('/api/authentication/login', credentials, {
        // credentials: 'include',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body :{
            credentials,
        },
    })
};

export const register = (credentials, measurements) => {

    const body ={...credentials, ...measurements};
    return axios.post('/api/authentication/register', body, {
        // credentials: 'include',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        
    })
};