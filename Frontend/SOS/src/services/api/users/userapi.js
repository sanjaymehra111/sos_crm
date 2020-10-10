//import AxiosInstance  from './axios';
import axios from 'axios';

const AxiosInstance = axios.create({
    baseURL : "http://192.168.43.139:3000/",
    timeout : "300000"
})

export async function SendOTP (contact) { 
    try{
        var res = await axios.post('http://192.168.43.139:3000/send_otp/',{
            contact
        })
        return res.data;
    } // try close

    catch(e){
        return e.response;
    }
}

export async function VerifyOTP (contact, otp) { 
    try{
        var res = await axios.post('http://192.168.43.139:3000/verify_otp/',{
            contact,
            otp
        })
        return res.data;
    } // try close

    catch(e){
        return 'error';
    }
}

export async function CreateUSer (user_name, contact, shop_name, address) { 

    try{
        var res = await axios.post('http://192.168.43.139:3000/create_user/',{
            user_name, 
            contact, 
            shop_name, 
            address
            
        })
        return res.data;
    } // try close

    catch(e){
        return 'error';
    }
}


export async function CreateNewProduct (product_name, product_price, product_emi) { 
    try{
        var res = await axios.post('http://192.168.43.139:3000/create_new_product/',{
            product_name, 
            product_price, 
            product_emi, 
        })
        return res.data;
    } // try close

    catch(e){
        return 'error';
    }
}


