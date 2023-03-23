/**
 * AccountController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

//install third party package using npm
const nodemailer = require('nodemailer')
module.exports = {
    //this fucation do the  get user details
    getuser: async function (req, res) {
        const accid = req.params.id
        console.log("get user id", accid);
        const users = User.find({})
            .then(data => {
                console.log(data);
                res.view('addUser', { acc: data, acid: accid })
            })
    },

    //this fucation is add user into the account
    adduser: async function (req, res) {
        const accid = req.params.id
        console.log("acc id", accid);
        const email = req.body.email
        await Adduser.create({ useraccountid: accid, email: email })
            .fetch()
            .then(data => {
                const userid = req.userid

                //here i can share the email to user for informing
                let mailTransporter = nodemailer.createTransport({
                    service: 'gmail',
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth: {
                        user: 'ranakartik461@gmail.com',
                        pass: 'aduz aypc piie kqkt'
                    }
                })

                let mailDetails = {
                    from: 'ranakartik461@gmail.com',
                    to: email,
                    subject: 'Welcome to Expense Manager',
                    text: "'Welcome to expense manager here you can manage your expense and income both in good manner'" + '<br>' +
                        "You have to add my account"
                };

                mailTransporter.sendMail(mailDetails, function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Email sent successfully')
                    }
                })
                res.redirect(`/userallaccount?userid=${userid}`)
            })
    },

    //this fuction view the user add into the account
    viewuser: async function (req, res) {
        console.log("___________");
        const accid = req.params.id
        console.log(accid);
        Adduser.find({ useraccountid: accid })
            .then(data => {
                res.view('viewUser', { data: data })
            })
    },
    //In this function create the default account of signup user 
    defaultAccount: async (req, res) => {
        const userid = req.query.userid
        await Account.create({ userid: userid, AccountName: 'default', AccountType: 'default' })
            .then(data => {
                res.redirect('/login')
            })
    },

    //In this function user can create the own account
    createAccount: async function (req, res) {
        const userid = req.userid

        // const userid = req.query.userid
        console.log("creare account", userid);
        await Account.create({ userid: userid, AccountName: req.body.AccountName })
            .fetch()
            .then(data => {
                res.redirect(`/userallaccount?userid=${userid}`)
            })
            .catch(err => {
                console.log(err);
            })
    },

    //In this function we can get all account of loggin users
    getallaccount: async function (req, res) {
        let userid = req.query.userid
        console.log("userid", userid);
        await Account.find({ userid: userid })
            .then(async data => {
                await User.find({})
                    .then(result => {
                        //console.log("user data",result);
                        console.log("data", data)
                        // result.forEach(resultdata => {
                        //     console.log("Account data", resultdata);
                        // });

                        res.render('dashboard', { acc: data, result: result })
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(err => {
                console.log(err);
            })
    },

    //delete the account of user 
    deleteAccount: async (req, res) => {
        const userid = req.userid
        console.log(userid);
        const id = req.params.id
        await Account.destroy({ id: id })
            .then(result => {
                res.redirect(`/userallaccount?userid=${userid}`)
            })
    },

    //get the account id and redirect the editaccount page
    editAccount: async (req, res) => {
        const id = req.params.id
        Account.findOne({ id: id })
            .then(data => {
                res.render('editAccount', { data: data })
            })
    },

    //update the account of user
    updateAccount: async (req, res) => {
        const userid = req.userid
        let id = req.params.id
        await Account.update({ id: id }, { AccountName: req.body.AccountName })
            .fetch()
            .then(data => {
                res.redirect(`/userallaccount?userid=${userid}`)
            })
    }
};

