import axios from 'axios';

const api = axios.create({
    //baseURL do backend
    baseURL: 'http://localhost:3333'
})

export default api;
