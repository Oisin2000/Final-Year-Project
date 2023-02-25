import {create} from 'apisauce';

const apiClient = create({
    baseURL:"http://192.168.10.70:5000/api"
})

export default apiClient;