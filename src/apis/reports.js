import axios from 'axios';

export default axios.create({
    baseURL: 'https://goldpawnshopnodeservice.herokuapp.com/'
});