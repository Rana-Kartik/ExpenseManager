/**
 * TransactionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
 
    //view the transaction of particular user
    viewAddTransaction: async function (req, res) {
        const accountId = req.params.id;

        res.view('Transaction', { accountId: accountId })
    },

    //user can add the transaction in particular account
    addTransaction: async function (req, res) {
        let accountid = req.params.id
        console.log(accountid);
        let transactionName = req.body.transactionName
        let transactionType = req.body.transactionType
        let transactionAmount = req.body.transactionAmount
        let transactionDescription = req.body.transactionDescription

        await Transaction.create({
            accountid: accountid,
            transactionName: transactionName,
            transactionType: transactionType,
            transactionAmount: transactionAmount,
            transactionDescription: transactionDescription
        })
            .fetch()
            .then(data => {
                console.log(data);
                res.redirect(`/Account/getTransaction/${accountid}`)
            })
            .catch(err => {
                res.status(500).json({
                    statusCode: 500,
                    error: err
                })
            })
    },

    //this function get the all transaction details 
    AllTransaction: async function (req, res) {
        accountid = req.params.id
        console.log(accountid);
        await Transaction.find({ accountid: accountid }).sort([{ id: 'DESC' }])
            .then(data => {
                console.log(data);
                res.render('transactionlist', { 'data': data, id: accountid })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    statusCode: 500,
                    error: err
                })
            })
    },

    //edit the transaction
    EditTransaction: async (req, res) => {
        const id = req.params.id
        Transaction.findOne({ id: id })
            .then(data => {
                res.render('editTransaction', { 'data': data })
            })
    },

    //update the transaction
    updateTransaction: async function (req, res) {
        let accountid = req.params.id
        console.log(accountid);
        let id = req.params.id
        let transactionName = req.body.transactionName
        let transactionType = req.body.transactionType
        let transactionAmount = req.body.transactionAmount
        let transactionDescription = req.body.transactionDescription


        await Transaction.update({ id: id }, {
            transactionName: transactionName,
            transactionType: transactionType,
            transactionAmount: transactionAmount,
            transactionDescription: transactionDescription
        })
            .fetch()
            .then(data => {
                const result = data.pop()
                const accountId = result.accountid
                res.redirect(`/Account/getTransaction/${accountId}`)
            })
            .catch(err => {
                res.status(500).json({
                    statusCode: 500,
                    error: err
                })
            })
    },

    //delete the transaction
    deleteTransaction: async function (req, res) {
        let id = req.params.id
        await Transaction.destroy({ id: id })
            .fetch()
            .then(data => {
                console.log("origial data", data);
                data.forEach(result => {
                    const accountid = result.accountid
                    res.redirect(`/Account/getTransaction/${accountid}`)
                });
            })
            .catch(err => {
                res.status(500).json({
                    statusCode: 500,
                    error: err
                })
            })
    }

};

