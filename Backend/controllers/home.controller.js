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
      address: req.body.address,
      gst:req.body.gst,
    });

    // Save Customer in the database
    User.create_user(user.user_name, user.contact, user.shop_name, user.address, user.gst, (err, data) => {
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



  exports.get_user_details = (req, res, auth) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    // Save Customer in the database
    User.get_user_details(auth.USER_ID, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Customer."
        });
      else {
        //console.log("RES CONT : ", data)
        res.send(data);
      }
    });
  };


  exports.get_product_details = (req, res, auth) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    // Save Customer in the database
    User.get_product_details(auth.USER_ID, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Customer."
        });
      else {
        //console.log("RES CONT : ", data)
        res.send(data);
      }
    });
  };


  exports.get_customer_details = (req, res, auth) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    // Save Customer in the database
    User.get_customer_details(auth.USER_ID, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Customer."
        });
      else {
        //console.log("RES CONT : ", data)
        res.send(data);
      }
    });
  };


  exports.get_bill_details = (req, res, auth) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    // Save Customer in the database
    User.get_bill_details(auth.USER_ID, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Customer."
        });
      else {
        //console.log("RES CONT : ", data)
        res.send(data);
      }
    });
  };


  exports.get_emi_bill_details_via_bill_id = (req, res, auth) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    // Save Customer in the database
    User.get_emi_bill_details_via_bill_id(auth.USER_ID, req.body.bid, (err, emidata) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Customer."
        });
      else {
            User.get_bill_details_via_bill_id(auth.USER_ID, req.body.bid, (err, billdata) => {
              if (err)
                res.status(500).send({
                  message:
                    err.message || "Some error occurred while creating the Customer."
                });
              else {
                  User.get_emi_payment_details_via_bill_id(auth.USER_ID, req.body.bid, (err, emipayment) => {
                    if (err)
                      res.status(500).send({
                        message:
                          err.message || "Some error occurred while creating the Customer."
                      });
                      else {
                        User.get_specific_customer_details(billdata[0].customer_id, (err, Customer) => {
                          if (err)
                            res.status(500).send({
                              message:
                                err.message || "Some error occurred while creating the Customer."
                            });
                          else {
                            res.send([emidata,billdata,emipayment,Customer]);
                          }
                        });
                    }
                  });
              }
            });
      }
    });
  };


  exports.create_new_product = (req, res, auth) => {
    //console.log("cont : ",req.body);
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    // Save Customer in the database
    User.create_new_product(auth.USER_ID, req.body.product_name, req.body.product_price, req.body.product_emi, (err, data) => {
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


  exports.create_new_customer = (req, res, auth) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    // Save Customer in the database
    User.create_new_customer(auth.USER_ID, req.body.name, req.body.contact, req.body.address, req.body.aadhar, req.body.pan, req.body.u_image, req.body.adf_image, req.body.adb_image, req.body.pan_image, (err, data) => {
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



  exports.create_new_bill = (req, res, auth) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    // Save Customer in the database
    User.create_new_bill(auth.USER_ID, req, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Customer."
        });
      else {
            // Save Customer in the database
            User.create_new_payment(auth.USER_ID, data.res.insertId, req.body.pay, req.body.pay, req.body.balance, (err, data) => {
              if (err)
                res.status(500).send({
                  message:
                    err.message || "Some error occurred while creating the Customer."
                });
              else {
                      res.send(data);
              }
            });
      }
    });
  };


  exports.create_new_emi_bill = (req, res, auth) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    // Save Customer in the database
    User.create_new_bill(auth.USER_ID, req, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Customer."
        });
      else {
            // Save Customer in the database
            User.create_new_emi_bill(auth.USER_ID, req, data.res.insertId, (err, data) => {
              if (err)
                res.status(500).send({
                  message:
                    err.message || "Some error occurred while creating the Customer."
                });
              else {
                      res.send(data);
              }
            });
      }
    });
  };



  exports.create_new_payment = (req, res, auth) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    // Save Customer in the database
    User.create_new_payment(auth.USER_ID, req.body.bill_id, req.body.pay, req.body.total_pay, req.body.balance, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Customer."
        });
      else {
          User.update_bill_details(auth.USER_ID, req.body.bill_id, req.body.total_pay, req.body.balance, (err, data) => {
            if (err)
              res.status(500).send({
                message:
                  err.message || "Some error occurred while creating the Customer."
              });
            else {
              //console.log("RES CONT : ", data.res)
              res.send(data);
            }
          });
      }
    });
  };





  exports.create_new_emi_payment = (req, res, auth) => {
    // Validate request

    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    // Save Customer in the database
    User.create_new_emi_payment(auth.USER_ID, req.body.bill_id, req.body.customer_id, req.body.pay, req.body.balance, req.body.total_price, req.body.total_pay, req.body.emi_date, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Customer."
        });
      else {
          User.update_bill_details(auth.USER_ID, req.body.bill_id, req.body.total_pay, req.body.balance, (err, data) => {
            if (err)
              res.status(500).send({
                message:
                  err.message || "Some error occurred while creating the Customer."
              });
            else {
              //console.log("RES CONT : ", data.res)
              res.send(data);
            }
          });
      }
    });
  };





//************   upload image to server *********/

  
  exports.upload_image_to_server = (req, res, auth) => {

    console.log("Server Data : ",req.body);
 
  };





  exports.send_otp = (req, res) => {
    // Validate request
    //console.log("BODY : ",req.body)

    //console.log("ontroller Sent otp: ",req.body);

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

              //console.log("CONTROLLER OTP VERIFICATION : ", data);

              if(data == 'invalid')
                res.send({message:'new_user'})
              else
                res.send({message:data})
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
