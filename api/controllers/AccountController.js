/**
 * AccountController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */



module.exports =  {
    adduser :async function(req,res){
        let accountid = req.body.accountid
        let useremail = req.body.useremail

        

    },

    createAccount : async function(req,res){
        await Account.create({userid: req.body.userid, AccountName : req.body.AccountName})
        .fetch()
        .then(data => {
            res.status(200).json({
                statusCode : 200,
                data : data
            })
            //res.redirect('account')
        })
        .catch(err => {
            console.log(err);
        })
    },

    getallaccount : async function(req,res){
        await Account.find({userid: req.body.userid})
        .then(data => {
            // res.status(200).json({
            //     statusCode : 200,
            //     data : data
            // })
            //res.view('dashboard',{data : data})
        })
    },

    deleteAccount: async (req,res) => {
        let id = req.params.id
        await Account.destroy({id:id })
        .then(result => {
            res.status(200).json({
                statusCode : 200,
                message : "Data deleted"
            })
            //res.redirect('/userallaccount')
        })
    },

    updateAccount : async (req,res) => {
        let id = req.params.id
        await Account.update({id : id},{AccountName : req.body.AccountName})
        .fetch()
        .then(data => {
            res.status(200).json({
                statusCode : 200,
                message : 'Data updated',
                data : data
            })
        })
    }
};

