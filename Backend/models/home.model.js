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







  
  User.get_user_details = (user_id, result) => {
    sql.query('select * from user_details where id = '+user_id+'', (err, res) =>{
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        //console.log("found customer: ", res[0]);
        result(null, res[0]);
        return;
      }

      result({ kind: "not_found" }, null);
    });
  };




  User.get_product_details = (user_id, result) => {
    sql.query('select * from product_details where user_id = '+user_id+' ORDER BY DATE DESC', (err, res) =>{
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (!res.length) {
        result(null, null);
        return;
      }

      if (res.length) {
        //console.log("found customer: ", res[0]);
        result(null, res);
        return;
      }

      result({ kind: "not_found" }, null);
    });
  };




  User.get_customer_details = (user_id, result) => {
    sql.query('select * from customer_details where user_id = '+user_id+' ORDER BY DATE DESC ', (err, res) =>{
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (!res.length) {
        result(null, null);
        return;
      }

      if (res.length) {
        //console.log("found customer: ", res[0]);
        result(null, res);
        return;
      }

      result({ kind: "not_found" }, null);
    });
  };

  User.get_bill_details = (user_id, result) => {
    sql.query('select * from bill_details where user_id = '+user_id+' ORDER BY DATE DESC LIMIT 0,1000 ', (err, res) =>{
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (!res.length) {
        result(null, null);
        return;
      }

      if (res.length) {
        //console.log("found customer: ", res[0]);
        result(null, res);
        return;
      }

      result({ kind: "not_found" }, null);
    });
  };


  User.get_bill_details_via_bill_id = (user_id, bid, result) => {
    sql.query('select * from bill_details where id = '+bid+' and user_id = '+user_id+' ', (err, res) =>{
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (!res.length) {
        result(null, null);
        return;
      }

      if (res.length) {
        result(null, res);
        return;
      }

      result({ kind: "not_found" }, null);
    });
  };

  User.get_emi_bill_details_via_bill_id = (user_id, bid, result) => {
    sql.query('select * from emi_details where user_id = '+user_id+' and bill_id = '+bid+'', (err, res) =>{
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (!res.length) {
        result(null, null);
        return;
      }

      if (res.length) {
        //console.log("found emi: ", res[0]);
        result(null, res);
        return;
      }

      result({ kind: "not_found" }, null);
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

  User.create_new_customer = (user_id, name, contact, email, address, aadhar, result) => {
    var date = CurDate();
    sql.query("INSERT INTO customer_details SET user_id = ?, name = ?, contact = ?, email = ?, address = ?, aadhar = ?, date = ?", [user_id, name, contact, email, address, aadhar, date], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, { res });
    });
  };


  User.create_new_bill = (user_id, req, result) => {
    var status = '1';
    if(req.body.balance > 0)
      status = '0';

    var date = CurDate();
    sql.query("INSERT INTO bill_details SET user_id = ?, product_id = ?, customer_id = ?, customer_name = ?, customer_contact = ?, name = ?, emi_number = ?, price = ?, cgst = ?, sgst = ?, igst = ?, total_price = ?, pay = ?, balance = ?, pay_type = ?,  date = ?, status = ?",
     [user_id, req.body.p_id, req.body.c_id, req.body.c_name, req.body.c_contact, req.body.name, req.body.emi, req.body.price, req.body.cgst, req.body.sgst, req.body.igst, req.body.total_price, req.body.pay, req.body.balance, req.body.type, date, status], (err, res) => {
      if (err) {
        //console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, { res });
    });
  };


  User.create_new_emi_bill = (user_id, req, bill_id, result) => {
    var status = '1';
    if(req.body.balance > 0)
      status = '0';

    var date = CurDate();
    sql.query("INSERT INTO emi_details SET user_id = ?, bill_id = ?, customer_id = ?, product_name = ?, price = ?, pay = ?, balance = ?, per_month = ?, emi_price = ?, total_pay = ?, month = ?, percent = ?,  date = ?, status = ?",
     [user_id, bill_id, req.body.c_id, req.body.name, req.body.total_price, req.body.pay, req.body.balance, req.body.emi_month_amount, req.body.emi_total, req.body.total_pay, req.body.emi_month, req.body.emi_percent, date, '1'], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, { res });
    });
  };



  User.create_new_payment = (user_id, bill_id, pay, total_pay, balance, result) => {
    var date = CurDate();
    sql.query("INSERT INTO payment_details SET user_id = ?, bill_id = ?, pay = ?, total_pay = ?, balance = ?, date = ?",
     [user_id, bill_id, pay, total_pay, balance, date], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, { res });
    });
  };


  
  User.update_bill_details = (user_id, bill_id, pay, balance, result) => {
    var status = '0';
    if(balance == "0")
      status = '1';

    var date = CurDate();
    sql.query("update bill_details SET pay = ?, balance = ?, status = ?, updated_date = ? where id = '"+bill_id+"' and user_id = '"+user_id+"' ",
     [pay, balance, status, date], (err, res) => {
      if (err) {
        //console.log("error: ", err);
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
          result(null, res[0].id);
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