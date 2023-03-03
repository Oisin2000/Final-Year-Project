import {create} from 'apisauce';

const apiClient = create({
    baseURL:"http://172.20.10.2:5000/api"
})

export default apiClient;