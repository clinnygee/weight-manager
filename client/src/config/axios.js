import axios from 'axios';

axios.create({baseURL: 'https://localhost:8080', withCredentials: true});

export default axios;