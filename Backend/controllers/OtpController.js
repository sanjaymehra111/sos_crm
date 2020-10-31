const axios = require('axios');

exports.SendOTP = (contact) =>{
    var otp = Math.floor(100000 + Math.random() * 900000);
    SendToContact(otp, contact);
    return(otp)
}


exports.GetCode = (contact) =>{
    var code = Math.floor(100000 + Math.random() * 900000);
    var num = Math.random().toString(36).substring(2).toUpperCase();
    var FinalString = code+num;
    return(FinalString);
}


function SendToContact(otp, contact){
    var url = 'https://control.msg91.com/api/sendotp.php?authkey=302176AeEcfLaw5dc0355a&mobile='+contact+'&message=OTP%20'+otp+'&sender=OWNWAY&country=91&otp='+otp+'&otp_length=6';
    axios.get(url)
    .then(response => {
        //console.log(response.data.type);
    })
    .catch(error => {
        //console.log(error);
    });
}