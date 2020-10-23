import axios from 'axios';

var AxiosInstance = axios.create({
    baseURL : 'http://192.168.43.63:3000/', // For Localhost
    //baseURL : 'http://103.117.180.175:3000/', // For Live
    timeout : 300000
})

export default AxiosInstance;