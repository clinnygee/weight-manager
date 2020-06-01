import axios from '../../config/axios';

export const updateSettings = (settings) => {
    return axios.post('/api/user/settings', {
        data: settings,
    })
}