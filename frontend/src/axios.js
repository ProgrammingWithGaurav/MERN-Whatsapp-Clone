import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://mern-whatsapp-api.herokuapp.com',
})

export default instance