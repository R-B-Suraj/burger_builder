import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-dfa69-default-rtdb.firebaseio.com/'
});


export default instance;