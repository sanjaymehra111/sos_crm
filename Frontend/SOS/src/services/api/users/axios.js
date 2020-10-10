import axios from 'axios';

var AxiosInstance = axios.create({
    baseURL : 'http://192.168.43.139:3000/',
    timeout : '300000'
})

export default AxiosInstance;