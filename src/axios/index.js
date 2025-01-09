import axios from 'axios';

const links = [
    'http://127.0.0.1:7000/api/',
    'http://127.0.0.1:9090/api/',
    'http://one.bma.edu.ph/api/'
]
const production = links[2]
const development = links[0]
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? production : development;
// Create an instance of Axios with the default configurations
const axiosInstance = axios.create();

export default axiosInstance;