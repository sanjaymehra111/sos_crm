module.exports = app =>{
    const home = require('../controllers/home.controller')

    // User OTP Send
    app.post("/send_otp", home.send_otp);

    // User OTP Send
    app.post("/verify_otp", home.verify_otp);

    // Create a new Customer
    app.post("/create_user", home.create_user);

    // Create a new Customer
    app.post("/create_new_product", home.create_new_product);

   
    // User Validation
    app.post("/valid_user", home.valid_user);


    // Create a new Customer
    app.post("/login", home.login);

    // Retrieve a single Customer with customerId
    app.post("/shop_details/:sid", home.findOne);

}