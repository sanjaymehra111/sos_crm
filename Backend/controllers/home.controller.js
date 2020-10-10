const User = require('../models/home.model')
const {SendOTP} = require('./OtpController')

exports.create_user = (req, res) => {

    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    // Create a Customer
    const user = new User({
      user_name: req.body.user_name,
      contact: req.body.contact,
      shop_name: req.body.shop_name,
      address: req.body.address
    });

    // Save Customer in the database
    User.create_user(user.user_name, user.contact, user.shop_name, user.address, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Customer."
        });
      else {
        //console.log("RES CONT : ", data.res.insertId)
        res.send(data);
      }
    });
  };



  exports.create_new_product = (req, res) => {

    //console.log("cont : ",req.body);

    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    // Save Customer in the database
    User.create_new_product('1', req.body.product_name, req.body.product_price, req.body.product_emi, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Customer."
        });
      else {
        //console.log("RES CONT : ", data.res.insertId)
        res.send(data);
      }
    });
  };



  exports.send_otp = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    const otp = SendOTP(req.body.contact);

    // Create a Customer
    const user = new User({
      contact: req.body.contact,
    });

    // Save Customer in the database
    User.send_otp(user.contact, otp, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating Sending OTP."
        });
      else {
        //console.log("OTP SENT");
        res.send('otp sent');}
    });
  };




  exports.verify_otp = (req, res) => {

    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    // Create a Customer
    const user = new User({
      contact: req.body.contact,
      otp: req.body.otp,
    });

    // Save Customer in the database
    User.verify_otp(user.contact, user.otp, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while Verify OTP."
        });
      else {
        //console.log("Data : ",data);

        if(data != 'invalid'){
          User.valid_user(data.contact, (err, data) => {
            if (err)
              res.status(500).send({
                message:
                  err.message || "Some error occurred while Verify OTP."
              });
            else {
              //console.log("Controller Data : " + data);
              if(data == 'valid')
                res.send('old_user')
              else
                res.send('new_user')
            }
          });
        }

        else {
          res.send(data);
        }
      }
    });
  };


  exports.valid_user = (req, res) => {

    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    // Create a Customer
    const user = new User({
      contact: req.body.contact,
    });

    // Save Customer in the database
    User.valid_user(user.contact, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Customer."
        });
      else {
        console.log("Controller Data : ",data);
        res.send(data);}
    });
  };

  exports.login = (req, res) => {

    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    // Create a Customer
    const user = new User({
      contact: req.body.contact,
    });

    // Save Customer in the database
    User.login(user.contact, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Customer."
        });
      else {
        console.log("Controller Data : ",data);
        res.send(data);}
    });
  };



  exports.findOne = (req, res) => {
    User.findById(req.params.sid, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.sid}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Customer with id " + req.params.sid
          });
        }
      } else res.send(data);
    });
  };
