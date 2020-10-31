import AxiosInstance  from './axios';
import AsyncStorage from '@react-native-community/async-storage';


// ******************************************** User AUTH API'S *****************************//

export async function SendOTP (contact) { 
    try{
        var res = await AxiosInstance.post('send_otp',{
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
        var res = await AxiosInstance.post('verify_otp',{
            contact,
            otp
        })
        //console.log("API OTP VERIFICATION :",res.data);

        if(res.data == 'invalid'){
            return 'invalid';
        }
        else if(res.data.message == 'new_user')
            return 'new_user';
        else {
            AsyncStorage.setItem("userID", JSON.stringify(res.data.message));
            return 'old_user';
        }

    } // try close

    catch(e){
        return 'error';
    }
}



export async function CreateUser (user_name, contact, shop_name, address, gst) { 

    try{
        var res = await AxiosInstance.post('create_user',{
            user_name, 
            contact, 
            shop_name, 
            address,
            gst
            
        })
        //console.log("ID USER API : ", res.data.res.insertId);
        AsyncStorage.setItem("userID", JSON.stringify(res.data.res.insertId));

        return 'success';

    } // try close

    catch(e){
        return 'error';
    }
}





// ******************************************** User Dashboard API'S *****************************//



export async function GetLoggedInUserDetails() { 
    try{
        var res = await AxiosInstance.post('get_user_details',{},{
            headers: { Authorization:'token='+await GetAsyncToken()} 
        })

        //console.log(res.data)
        AsyncStorage.setItem("userName", JSON.stringify(res.data.user_name));
        AsyncStorage.setItem("userContact", JSON.stringify(res.data.contact));
        AsyncStorage.setItem("userShop", JSON.stringify(res.data.shop_name));
        AsyncStorage.setItem("userAddress", JSON.stringify(res.data.address));
        
        return res.data;
    } // try close

    catch(e){
        return 'error';
    }
}


export async function GetLoggedInUserProductDetails() { 
    try{
        var res = await AxiosInstance.post('get_product_details',{},{
            headers: { Authorization:'token='+await GetAsyncToken()} 
        })
        //console.log("Products : ", res.data)
        return res.data;
    } // try close

    catch(e){
        return 'error';
    }
}


export async function GetLoggedInUserCustomerDetails() { 
    try{
        var res = await AxiosInstance.post('get_customer_details',{},{
            headers: { Authorization:'token='+await GetAsyncToken()} 
        })

        //console.log("Customers : ",res.data)
        return res.data;
    } // try close

    catch(e){
        return 'error';
    }
}

export async function GetLoggedInUserBillDetails() { 
    try{
        var res = await AxiosInstance.post('get_bill_details',{},{
            headers: { Authorization:'token='+await GetAsyncToken()} 
        })

        //console.log("Customers : ",res.data)
        return res.data;
    } // try close

    catch(e){
        return 'error';
    }
}


export async function GetLoggedInUserSpecEmiBillDetails(bid) { 
    try{
        var res = await AxiosInstance.post('get_emi_bill_details_via_bill_id',{bid},{
            headers: { Authorization:'token='+await GetAsyncToken()} 
        })

        //console.log("Customers : ",res.data)
        return res.data;
    } // try close

    catch(e){
        return 'error';
    }
}


export async function CreateNewProduct (product_name, product_price, product_emi) { 
    try{
        var res = await AxiosInstance.post('create_new_product',{
            product_name, 
            product_price, 
            product_emi, 
        },{headers: { Authorization:'token='+await GetAsyncToken()} })
        return res.data;
    } // try close

    catch(e){
        return 'error';
    }
}

export async function CreateNewCustomer (name, contact, address, aadhar, pan) { 
    try{
        var res = await AxiosInstance.post('create_new_customer',{
            name, 
            contact, 
            address, 
            aadhar,
            pan
        },{headers: { Authorization:'token='+await GetAsyncToken()} })
        //console.log("res :", res.data)
        return res.data;
    } // try close

    catch(e){
        return 'error';
    }
}


export async function CreateNewBill (c_name, c_contact, c_address, c_aadhar, c_pan, name, emi, price, cgst, sgst, igst, total_price, pay, balance, type) { 

    var CustRes = await CreateNewCustomer(c_name, c_contact, c_address, c_aadhar, c_pan)
    var ProdRes = await CreateNewProduct(name, price, emi)
    
    p_id=ProdRes.res.insertId; 
    c_id=CustRes.res.insertId;

    try{
        var res = await AxiosInstance.post('create_new_bill',{
            p_id, 
            c_id, 
            c_name, 
            c_contact, 
            name, 
            emi, 
            price, 
            cgst, 
            sgst, 
            igst, 
            total_price, 
            pay, 
            balance,
            type
        },{headers: { Authorization:'token='+await GetAsyncToken()} })
        //console.log("payment res :", res.data)
        return 'success';
    } // try close

    catch(e){
        return 'error';
    }
}



export async function CreateNewEmiBill (c_name, c_contact, c_address, c_aadhar, c_pan, name, emi, price, cgst, sgst, igst, total_price, pay, emi_month, emi_percent, balance, emi_month_amount, emi_total, total_pay, type) { 
    
    var CustRes = await CreateNewCustomer(c_name, c_contact, c_address, c_aadhar, c_pan)
    var ProdRes = await CreateNewProduct(name, price, emi)
    
    p_id=ProdRes.res.insertId; 
    c_id=CustRes.res.insertId;

    try{
        var res = await AxiosInstance.post('create_new_emi_bill',{
            p_id, 
            c_id, 
            c_name, 
            c_contact, 
            name, 
            emi, 
            price, 
            cgst, 
            sgst, 
            igst, 
            total_price, 
            pay, 
            emi_month, 
            emi_percent, 
            balance, 
            emi_month_amount, 
            emi_total, 
            total_pay,
            type
        },{headers: { Authorization:'token='+await GetAsyncToken()} })
        //console.log("payment res :", res.data)
        return 'success';
    } // try close

    catch(e){
        return 'error';
    }
}


export async function CreateNewPayment (bill_id, pay, total_pay, balance) { 
    try{
        var res = await AxiosInstance.post('create_new_payment',{
            bill_id, 
            pay, 
            total_pay,
            balance,
        },{headers: { Authorization:'token='+await GetAsyncToken()} })
        //console.log("payment res :", res.data)
        return 'success';
    } // try close

    catch(e){
        return 'error';
    }
}



export async function CreateNewEmiPayment (bill_id, customer_id, total_price, pay, balance, total_pay, emi_date) { 
    try{
        var res = await AxiosInstance.post('create_new_emi_payment',{
            bill_id, 
            customer_id, 
            total_price, 
            pay, 
            balance, 
            total_pay,
            emi_date
        },{headers: { Authorization:'token='+await GetAsyncToken()} })
        //console.log("payment res :", res.data)
        return 'success';
    } // try close

    catch(e){
        return 'error';
    }
}




// ******************************************** User UPLOAD IMAGES  *****************************//

export async function UploadImage (file, type) { 
    try{
        var res = await AxiosInstance.post('upload_image_to_server',{
            file, 
            type
        },{headers: { Authorization:'token='+await GetAsyncToken()} })
        return res.data;
    } // try close

    catch(e){
        return 'error';
    }
}






// ******************************************** User TOKEN VERIFICATION API'S *****************************//

export async function StoreToken() { 
    const userID = await AsyncStorage.getItem('userID');
    try{
        var res = await AxiosInstance.post('getjwttoken',{userID});
        AsyncStorage.setItem('userToken', res.data.token);
        token = await AsyncStorage.getItem('userToken')
        //console.log("Token : ",token)
        return 'stored';
    } catch(e){
        return 'error';
    }
}


export async function VerifyToken(token) { 
    try{
        var res = await AxiosInstance.post('verifyjwttoken',{},{
            headers: {Authorization:'token='+token}
        })
        //console.log("get token : ",res.data.message);
        return res.data.message;

    } catch(e){
        return 'error';
    }
}


async function GetAsyncToken(){
    const tkn = await AsyncStorage.getItem('userToken');
    return (tkn);
}