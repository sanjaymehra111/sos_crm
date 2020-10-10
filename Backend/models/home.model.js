const sql = require('./db');
const moment = require('moment');

const CurDateTime = () =>{
  var fdt =  moment().format('YYYY-MM-DD HH:mm:ss');
  return (fdt);
}

const CurDate = () =>{
  var fdt =  moment().format('YYYY-MM-DD');
  return (fdt);
}

const ExpireDateTime = () =>{
  var fdt =  moment().add(2, 'm').format('YYYY-MM-DD HH:mm:ss');
  return (fdt);
}

// constructor
const User = function(user) {
  this.contact = user.contact;
    this.contact = user.contact;
    this.user_name = user.user_name;
    this.shop_name = user.shop_name;
    this.address = user.address;
    this.otp = user.otp;
  };


  User.create_user = (user_name, contact, shop_name, address, result) => {
    var date = CurDate();
    sql.query("INSERT INTO user_details SET user_name = ?, contact = ?, shop_name = ?, address = ?, user_type = ?, date = ?", [user_name, contact, shop_name, address, 'user', date], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, { res });
    });
  };

  User.create_new_product = (user_id, product_name, product_price, product_emi, result) => {
    var date = CurDate();
    sql.query("INSERT INTO product_details SET user_id = ?, product_name = ?, product_price = ?, product_emi = ?, date = ?", [user_id, product_name, product_price, product_emi, date], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, { res });
    });
  };


  User.send_otp = (contact, otp, result) => {

    var s_time = CurDateTime();
    var e_time = ExpireDateTime();

    sql.query("INSERT INTO user_otp SET contact = ?, otp = ?, valid_from = ?, valid_to = ?, date = ?", [contact, otp, s_time, e_time, s_time], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      //console.log("created customer ID : ", res.insertId);
      result(null, { res });
    });
  };


  User.verify_otp = (contact, otp, result) => {

    var s_time = CurDateTime();

    sql.query('SELECT * FROM user_otp WHERE contact = "'+contact+'" and otp = "'+otp+'" and valid_to > "'+s_time+'" ', (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      
      if (!res.length) {
        //console.log("Invalid OTP");
        result(null, 'invalid');
        return;
      }

      if (res.length) {
        //console.log("found customer: ", res[0]);
        //console.log("valid : ", valid);
        result(null, res[0]);
        return;
      }
  
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      
    });
  };



  User.findById = (customerId, result) => {
    sql.query(`SELECT * FROM user_details WHERE id = ${customerId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found customer: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Customer with the id
      result({ kind: "not_found" }, null);
    });
  };
  

  User.valid_user = (contact, result) => {

    sql.query('SELECT * FROM user_details WHERE contact = ?', [contact] , (err, res) => {
      if (err) {
        //console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (!res.length) {
        //console.log("Invalid Email/Password");
        result(null, 'invalid');
        return;
      }

      if (res.length) {
        if(res[0].contact == contact){
         //console.log("found customer: ", res[0]);
          result(null, "valid");
          return;
        }
        else{
          result(null, 'invalid');
          return;
        }
      }
  
      // not found Customer with the id
      result({ kind: "not_found" }, null);
    });
  };

  User.login = (contact, result) => {

    sql.query('SELECT * FROM user_details WHERE contact = ?', [contact] , (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (!res.length) {
        console.log("Invalid Email/Password");
        result(null, 'invalid');
        return;
      }

      if (res.length) {
        if(res[0].contact == contact){
          console.log("found customer: ", res[0]);
          result(null, "login");
          return;
        }
        else{
          result(null, 'invalid');
          return;
        }
      }
  
      // not found Customer with the id
      result({ kind: "not_found" }, null);
    });
  };

  module.exports = User;