/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

var digits = '0123456789'
let otp = ''
for (let i = 0; i < 6; i++) {
      otp += digits[Math.floor(Math.random() * 10)]
}
module.exports = {
      signup: async function (req, res) {
            console.log(req.body);
            await User.find({ email: req.body.email })
                  .then(userdata => {
                        if (userdata.length >= 1) {
                              res.status(500).json({
                                    message: "User already exist"
                              })
                        }
                        else {
                              bcrypt.hash(req.body.password, 10, async (err, hash) => {
                                    if (err) {
                                          res.status(500).json({
                                                message: 'Error for creating the user'
                                          })
                                    }
                                    else {
                                          let username = req.body.username
                                          let email = req.body.email
                                          let MobileNo = req.body.MobileNo
                                          let Address = req.body.Address
                                          let Country = req.body.Country
                                          let ConfirmPassword = req.body.ConfirmPassword
                                          let password = hash
                                          await User.create({ username: username, email: email, MobileNo: MobileNo, Address: Address, Country: Country, password: password, ConfirmPassword: ConfirmPassword })                           
                                                .fetch()
                                                .then(result => { 
                                                      
                                                      const token = jwt.sign({
                                                            email: result.email,
                                                            userid : result.id
                                                      }, process.env.JWT_KEY,
                                                            {
                                                                  expiresIn: "90h"
                                                            },
                                                      )

                                                      // let mailTransporter = nodemailer.createTransport({
                                                      //       service: 'gmail',
                                                      //       host: 'smtp.gmail.com',
                                                      //       port: 465,
                                                      //       secure: true,
                                                      //       auth: {
                                                      //             user: 'ranakartik461@gmail.com',
                                                      //             pass: 'aduz aypc piie kqkt'
                                                      //       }
                                                      // })

                                                      // let mailDetails = {
                                                      //       from: 'ranakartik461@gmail.com',
                                                      //       to: email,
                                                      //       subject: 'Welcome to Expense Manager',
                                                      //       text: "'Welcome to expense manager here you can manage your expense and income both in good manner'" + '<br>' +
                                                      //             "Your Username is" + result.username +
                                                      //             "Your Password is" + result.ConfirmPassword +
                                                      //             "otp for" + otp
                                                      // };

                                                      // mailTransporter.sendMail(mailDetails, function (err, data) {
                                                      //       if (err) {
                                                      //             console.log(err);
                                                      //       } else {
                                                      //             console.log('Email sent successfully')
                                                      //       }
                                                      // })

                                                      console.log("___________________");
                                                      console.log(result);
                                                      res.redirect(`/otp/?token=${token}&userid=${result.id}`)
                                                })
                                                .catch(err => {
                                                      res.status(500).json({
                                                            error: err
                                                      })
                                                })
                                    }
                              })
                        }
                  })
                  .catch(err => {
                        res.status(500).json({
                              error: err
                        })
                  })
      },
      loginuser: async function (req, res) {
            await User.findOne({ email: req.body.email })
                  .then(async userdata => {
                        console.log(userdata);
                        if (userdata.length < 1) {
                              res.status(500).json({
                                    message: 'no user found'
                              })
                        }
                        console.log("********************");
                        let email = req.body.email
                        let pass = req.body.password
                        console.log(pass, userdata.password);
                        await bcrypt.compare(pass, userdata.password, (err, data) => {
                              console.log("_______________");
                              if (err) {
                                    res.status(500).json({
                                          message: 'invalid credentials',
                                    });
                              }
                              console.log(data);
                              if (data) {
                                    const token = jwt.sign({
                                          email: userdata.email,
                                          userid: userdata._id
                                    }, process.env.JWT_KEY,
                                          {
                                                expiresIn: "90h"
                                          },
                                    )
                                    res.cookie('token', token, { httpOnly: true }).send()
                                    res.redirect('/account')
                              }
                              else {
                                    return res.status(500).json({
                                          message: 'fail'
                                    })
                              }
                        })
                  })
                  .catch(err => {
                        res.status(500).json({
                              error: err
                        })
                  })
      },

      logoutuser: async function (req, res) {
            try {
                  res.clearCookie('token').redirect('/login')
                  res.status(200).json({
                        statusCode: 200,
                        message: 'Logout'
                  })
            }
            catch (error) {
                  res.status(500).json({
                        error: error
                  })
            }
      },
     
      userverification: async function (req, res) {
            // let otpverify = req.body.otp
            // if (otpverify === otp) {
                  let token = req.query.token
                  let userid = req.query.userid
                  console.log(userid);
                  console.log(token);
                  Account.create({userid : userid, AccountName : 'default', accountType : 'default'})
                  .fetch()
                  .then(data => {
                        res.cookie("token",token,{httpOnly:true}).redirect('account')
                  })
                  .catch(err => {
                        res.status(500).json({
                              statusCode : 500,
                              error : err
                        })
                  })
           // }
            // else {
            //       console.log("invalid");
            // }
      }

};
