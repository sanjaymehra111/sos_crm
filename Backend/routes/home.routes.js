module.exports = app =>{

    const home = require('../controllers/home.controller')
    const jwt = require("jsonwebtoken");
    const jwtsc = '#@Sos#2233$Crm%$Admin#' 


    //*********************************  AUTH API ************************************//

    //Get JWT Token
    app.post("/getjwttoken", (req, res) => {
        jwt.sign({AUTH_ID:'SOSCRM', USER_ID:req.body.userID}, jwtsc, (err, token) =>{
            res.json({
                token
            })
        });
    });

    //Verify JWT Token Using Header
    app.post("/verifyjwttoken", VerifyToken, (req, res) => {
        jwt.verify(req.token, jwtsc, (err, auth) => {
            if(err) {
                res.json({ message: "unauthorized" });
            } else {
                //console.log("Auth data : ",auth)
                res.json({ message: 'authorized'});
            }
          });
    });
  

    // User OTP Send
    app.post("/send_otp_with_verification",VerifyToken, (req, res) =>{
        jwt.verify(req.token, jwtsc, (err) => {
            if(err) {
                res.json({ message: "unauthorized" });
            } else {
                //res.json({data:'send'})
                home.send_otp(req, res);
            }
          });
    });

    app.post("/send_otp", home.send_otp);

    // User OTP Send
    app.post("/verify_otp", home.verify_otp);

    // Create a new Customer
    app.post("/login", home.login);

    // Create a new Customer
    app.post("/create_user", home.create_user);




    //*********************************  Dashboard API ************************************//

    // Get Use Details
    app.post("/get_user_details",VerifyToken, (req, res) =>{
        jwt.verify(req.token, jwtsc, (err, auth) => {
            if(err) {
                res.json({ message: "unauthorized" });
            } else {
                home.get_user_details(req, res, auth);
            }
          });
    });


    // Get Product Details
    app.post("/get_product_details",VerifyToken, (req, res) =>{
        jwt.verify(req.token, jwtsc, (err, auth) => {
            if(err) {
                res.json({ message: "unauthorized" });
            } else {
                home.get_product_details(req, res, auth);
            }
          });
    });


    // Get Customer Details
    app.post("/get_customer_details",VerifyToken, (req, res) =>{
        jwt.verify(req.token, jwtsc, (err, auth) => {
            if(err) {
                res.json({ message: "unauthorized" });
            } else {
                home.get_customer_details(req, res, auth);
            }
          });
    });

    // Get bill Details
    app.post("/get_bill_details",VerifyToken, (req, res) =>{
        jwt.verify(req.token, jwtsc, (err, auth) => {
            if(err) {
                res.json({ message: "unauthorized" });
            } else {
                home.get_bill_details(req, res, auth);
            }
          });
    });


    // Get emi bill Details
    app.post("/get_emi_bill_details_via_bill_id",VerifyToken, (req, res) =>{
        jwt.verify(req.token, jwtsc, (err, auth) => {
            if(err) {
                res.json({ message: "unauthorized" });
            } else {
                home.get_emi_bill_details_via_bill_id(req, res, auth);
            }
          });
    });



    // Create a new profuct
    app.post("/create_new_product",VerifyToken, (req, res) =>{
        jwt.verify(req.token, jwtsc, (err, auth) => {
            if(err) {
                res.json({ message: "unauthorized" });
            } else {
                home.create_new_product(req, res, auth);
            }
          });
    });
   
    // create new customer
    app.post("/create_new_customer",VerifyToken, (req, res) =>{
        jwt.verify(req.token, jwtsc, (err, auth) => {
            if(err) {
                res.json({ message: "unauthorized" });
            } else {
                home.create_new_customer(req, res, auth);
            }
          });
    });

    // create new bill
    app.post("/create_new_bill",VerifyToken, (req, res) =>{
        jwt.verify(req.token, jwtsc, (err, auth) => {
            if(err) {
                res.json({ message: "unauthorized" });
            } else {
                home.create_new_bill(req, res, auth);
            }
          });
    });


    // create new emi bill
    app.post("/create_new_emi_bill",VerifyToken, (req, res) =>{
        jwt.verify(req.token, jwtsc, (err, auth) => {
            if(err) {
                res.json({ message: "unauthorized" });
            } else {
                home.create_new_emi_bill(req, res, auth);
            }
          });
    });


    // create new payment
    app.post("/create_new_payment",VerifyToken, (req, res) =>{
        jwt.verify(req.token, jwtsc, (err, auth) => {
            if(err) {
                res.json({ message: "unauthorized" });
            } else {
                home.create_new_payment(req, res, auth);
            }
          });
    });


    // create new emi payment
    app.post("/create_new_emi_payment",VerifyToken, (req, res) =>{
        jwt.verify(req.token, jwtsc, (err, auth) => {
            if(err) {
                res.json({ message: "unauthorized" });
            } else {
                home.create_new_emi_payment(req, res, auth);
            }
          });
    });


    // User Validation
    app.post("/valid_user", home.valid_user);

    // Retrieve a single Customer with customerId
    app.post("/shop_details/:sid", home.findOne);



    //*********************************  Token Verification ************************************//

    function VerifyToken(req, res, next){
        const token = req.headers['authorization'];
        if(typeof token !== 'undefined') {
            // Split at the space
            const bearerToken = token.split('=')[1];
            // Set the token
            req.token = bearerToken;
            // Next middleware
            next();
          } else {
            // Forbidden
            //res.sendStatus(403);
            res.json({ message: "unauthorized" });
          }

    }

}