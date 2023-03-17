/**
 * TransactionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
   
     addTransaction : async function(req,res){
            let accountid = req.body.accountid
            let transactionName = req.body.transactionName
            let transactionType = req.body.transactionType
            let transactionAmount = req.body.transactionAmount
            let transactionDescription = req.body.transactionDescription

            await Transaction.create({accountid : accountid,
                                      transactionName : transactionName,
                                      transactionType : transactionType,
                                      transactionAmount : transactionAmount,
                                      transactionDescription : transactionDescription  
            })
            .fetch()
            .then(data => {
                res.status(200).json({
                    statusCode : 200,
                    data : data
                })
            })
            .catch(err => {
                res.status(500).json({
                    statusCode : 500,
                    error : err
                })
            })
     },

     AllTransaction : async function(req,res){
            accountid = req.params.id
            await Transaction.find({accountid : accountid}).sort([{id : 'DESC'}])
            .then(data => {
                res.status(200).json({
                    statusCode : 200,
                    data : data
                })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    statusCode : 500,
                    error : err
                })
            })
     },

     EditTransaction : async function(req,res){
        let id = req.params.id
        let transactionName = req.body.transactionName
        let transactionType = req.body.transactionType
        let transactionAmount = req.body.transactionAmount
        let transactionDescription = req.body.transactionDescription
        

        await Transaction.update({id : id},{
            transactionName : transactionName,
            transactionType : transactionType,
            transactionAmount : transactionAmount,
            transactionDescription : transactionDescription
        })
        .fetch()
        .then(data => {
            res.status(200).json({
                statusCode : 200,
                message : 'Data updated',
                data : data
            })
        })
        .catch(err => {
            res.status(500).json({
                statusCode : 500,
                error : err
            })
        })
     },

     deleteTransaction : async function(req,res){
            let id = req.params.id

            await Transaction.destroy({id : id})
            .then(data => {
                res.status(200).json({
                    statusCode : 200,
                    message : 'deleted'
                })
            })
            .catch(err => {
                res.status(500).json({
                    statusCode : 500,
                    error : err
                })
            })
     }

};

